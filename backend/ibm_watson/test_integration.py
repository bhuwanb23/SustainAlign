#!/usr/bin/env python3
"""
Test IBM WatsonX Orchestrate Integration
This script tests the deployed agents and tools with sample data
"""

import os
import sys
import json
import logging
from pathlib import Path
from typing import Dict, Any

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class WatsonIntegrationTester:
    """Tester for IBM WatsonX Orchestrate integration"""
    
    def __init__(self):
        self.base_dir = current_dir
        self.test_results = []
    
    def create_sample_data(self) -> Dict[str, Any]:
        """Create sample data for testing"""
        return {
            "project_data": {
                "name": "Rural Education Initiative",
                "description": "Improve access to quality education in rural areas",
                "budget": 50000,
                "timeline_months": 18,
                "location": "Rural India",
                "sdg_focus": [4, 10],  # Quality Education, Reduced Inequalities
                "expected_beneficiaries": 5000,
                "complexity_level": "medium",
                "impact_metrics": {
                    "students_reached": 5000,
                    "schools_improved": 25,
                    "teachers_trained": 100,
                    "carbon_reduction_tons": 50,
                    "water_conservation_liters": 100000,
                    "jobs_created": 15
                },
                "sustainability_score": 0.8
            },
            "company_profile": {
                "name": "TechCorp Global",
                "sdg_priorities": [4, 10, 17],  # Education, Inequality, Partnerships
                "geographic_focus": ["India", "Southeast Asia"],
                "available_budget": 200000,
                "capabilities": ["education", "technology", "community_development"]
            },
            "project_list": [
                {
                    "name": "Rural Education Initiative",
                    "budget": 50000,
                    "expected_return": 75000,
                    "timeline_months": 18,
                    "expected_beneficiaries": 5000,
                    "sdg_alignment_score": 0.9,
                    "sustainability_score": 0.8,
                    "risk_level": "medium",
                    "complexity_level": "medium",
                    "location": "Rural India",
                    "sdg_focus": [4, 10]
                },
                {
                    "name": "Clean Water Project",
                    "budget": 30000,
                    "expected_return": 45000,
                    "timeline_months": 12,
                    "expected_beneficiaries": 3000,
                    "sdg_alignment_score": 0.7,
                    "sustainability_score": 0.9,
                    "risk_level": "low",
                    "complexity_level": "low",
                    "location": "Rural India",
                    "sdg_focus": [6, 3]
                },
                {
                    "name": "Women Empowerment Program",
                    "budget": 40000,
                    "expected_return": 60000,
                    "timeline_months": 24,
                    "expected_beneficiaries": 2000,
                    "sdg_alignment_score": 0.8,
                    "sustainability_score": 0.7,
                    "risk_level": "medium",
                    "complexity_level": "high",
                    "location": "Urban India",
                    "sdg_focus": [5, 8]
                }
            ]
        }
    
    def test_tool_directly(self, tool_name: str, test_data: Dict[str, Any]) -> Dict[str, Any]:
        """Test a tool directly by importing and calling it"""
        try:
            if tool_name == "project_analyzer_tool":
                from tools.project_analyzer import project_analyzer_function
                result = project_analyzer_function(
                    project_data=test_data["project_data"],
                    company_profile=test_data["company_profile"],
                    analysis_type="alignment"
                )
            elif tool_name == "impact_calculator_tool":
                from tools.impact_calculator import impact_calculator_function
                result = impact_calculator_function(
                    project_metrics=test_data["project_data"]["impact_metrics"],
                    baseline_data={},
                    timeframe="12_months"
                )
            elif tool_name == "risk_assessor_tool":
                from tools.risk_assessor import risk_assessor_function
                result = risk_assessor_function(
                    project_data=test_data["project_data"]
                )
            elif tool_name == "budget_optimizer_tool":
                from tools.budget_optimizer import budget_optimizer_function
                result = budget_optimizer_function(
                    available_budget=test_data["company_profile"]["available_budget"],
                    project_list=test_data["project_list"],
                    constraints={}
                )
            else:
                return {"error": f"Unknown tool: {tool_name}", "success": False}
            
            return result
            
        except Exception as e:
            logger.error(f"Error testing tool {tool_name}: {e}")
            return {"error": str(e), "success": False}
    
    def test_all_tools(self, test_data: Dict[str, Any]) -> Dict[str, Any]:
        """Test all tools with sample data"""
        logger.info("🔧 Testing all tools...")
        
        tools = [
            "project_analyzer_tool",
            "impact_calculator_tool", 
            "risk_assessor_tool",
            "budget_optimizer_tool"
        ]
        
        results = {}
        
        for tool_name in tools:
            logger.info(f"Testing {tool_name}...")
            result = self.test_tool_directly(tool_name, test_data)
            results[tool_name] = result
            
            if result.get("success", False):
                logger.info(f"✅ {tool_name} test passed")
            else:
                logger.error(f"❌ {tool_name} test failed: {result.get('error', 'Unknown error')}")
        
        return results
    
    def test_agent_availability(self) -> Dict[str, Any]:
        """Test if agents are available in WatsonX Orchestrate"""
        logger.info("🤖 Testing agent availability...")
        
        try:
            import subprocess
            
            # Check if agents are listed
            result = subprocess.run(['orchestrate', 'agents', 'list'], 
                                  capture_output=True, text=True, timeout=30)
            
            if result.returncode == 0:
                agents_output = result.stdout
                expected_agents = [
                    "CSR_Matching_Agent",
                    "Project_Evaluation_Agent", 
                    "Decision_Support_Agent",
                    "Impact_Assessment_Agent"
                ]
                
                available_agents = []
                for agent_name in expected_agents:
                    if agent_name in agents_output:
                        available_agents.append(agent_name)
                        logger.info(f"✅ Agent available: {agent_name}")
                    else:
                        logger.error(f"❌ Agent missing: {agent_name}")
                
                return {
                    "success": len(available_agents) == len(expected_agents),
                    "available_agents": available_agents,
                    "expected_agents": expected_agents
                }
            else:
                logger.error("Failed to list agents")
                return {"success": False, "error": "Failed to list agents"}
                
        except Exception as e:
            logger.error(f"Error testing agent availability: {e}")
            return {"success": False, "error": str(e)}
    
    def test_tool_availability(self) -> Dict[str, Any]:
        """Test if tools are available in WatsonX Orchestrate"""
        logger.info("🔧 Testing tool availability...")
        
        try:
            import subprocess
            
            # Check if tools are listed
            result = subprocess.run(['orchestrate', 'tools', 'list'], 
                                  capture_output=True, text=True, timeout=30)
            
            if result.returncode == 0:
                tools_output = result.stdout
                expected_tools = [
                    "project_analyzer_tool",
                    "impact_calculator_tool",
                    "risk_assessor_tool", 
                    "budget_optimizer_tool"
                ]
                
                available_tools = []
                for tool_name in expected_tools:
                    if tool_name in tools_output:
                        available_tools.append(tool_name)
                        logger.info(f"✅ Tool available: {tool_name}")
                    else:
                        logger.error(f"❌ Tool missing: {tool_name}")
                
                return {
                    "success": len(available_tools) == len(expected_tools),
                    "available_tools": available_tools,
                    "expected_tools": expected_tools
                }
            else:
                logger.error("Failed to list tools")
                return {"success": False, "error": "Failed to list tools"}
                
        except Exception as e:
            logger.error(f"Error testing tool availability: {e}")
            return {"success": False, "error": str(e)}
    
    def print_test_summary(self, tool_results: Dict[str, Any], 
                          agent_availability: Dict[str, Any], 
                          tool_availability: Dict[str, Any]):
        """Print a summary of all test results"""
        logger.info("\n" + "="*60)
        logger.info("📋 INTEGRATION TEST SUMMARY")
        logger.info("="*60)
        
        # Tool functionality tests
        tool_success_count = sum(1 for result in tool_results.values() if result.get("success", False))
        tool_total_count = len(tool_results)
        
        logger.info(f"🔧 Tool Functionality: {tool_success_count}/{tool_total_count} passed")
        
        # Agent availability
        agent_success = agent_availability.get("success", False)
        available_agents = agent_availability.get("available_agents", [])
        logger.info(f"🤖 Agent Availability: {'✅ PASS' if agent_success else '❌ FAIL'} ({len(available_agents)} agents)")
        
        # Tool availability
        tool_success = tool_availability.get("success", False)
        available_tools = tool_availability.get("available_tools", [])
        logger.info(f"🔧 Tool Availability: {'✅ PASS' if tool_success else '❌ FAIL'} ({len(available_tools)} tools)")
        
        # Overall status
        overall_success = (tool_success_count == tool_total_count and agent_success and tool_success)
        
        if overall_success:
            logger.info("\n🎉 ALL TESTS PASSED! Integration is working correctly.")
        else:
            logger.info("\n❌ SOME TESTS FAILED. Check the logs above for details.")
        
        logger.info("\n🎯 Next steps:")
        logger.info("1. Use 'orchestrate chat start' to interact with agents")
        logger.info("2. Access web interface at http://localhost:3000/chat-lite")
        logger.info("3. Test agents with real CSR project data")
        
        logger.info("="*60)
        
        return overall_success
    
    def run_all_tests(self) -> bool:
        """Run all integration tests"""
        logger.info("🧪 Starting SustainAlign WatsonX Orchestrate integration tests...")
        
        # Create sample data
        test_data = self.create_sample_data()
        
        # Test tool functionality
        tool_results = self.test_all_tools(test_data)
        
        # Test agent availability
        agent_availability = self.test_agent_availability()
        
        # Test tool availability
        tool_availability = self.test_tool_availability()
        
        # Print summary
        overall_success = self.print_test_summary(tool_results, agent_availability, tool_availability)
        
        return overall_success

def main():
    """Main test function"""
    tester = WatsonIntegrationTester()
    
    success = tester.run_all_tests()
    
    if success:
        logger.info("🎉 All tests passed!")
        sys.exit(0)
    else:
        logger.error("💥 Some tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
