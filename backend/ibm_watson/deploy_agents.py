#!/usr/bin/env python3
"""
Deploy IBM WatsonX Orchestrate Agents and Tools
This script deploys all SustainAlign agents and tools to the WatsonX Orchestrate environment
"""

import os
import sys
import subprocess
import logging
from pathlib import Path
from typing import List, Dict, Any

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class WatsonDeployer:
    """Deployer for IBM WatsonX Orchestrate agents and tools"""
    
    def __init__(self):
        self.base_dir = current_dir
        self.agents_dir = self.base_dir / "agents"
        self.tools_dir = self.base_dir / "tools"
        self.deployment_log = []
    
    def check_environment(self) -> bool:
        """Check if WatsonX Orchestrate environment is properly configured"""
        try:
            # Check if orchestrate CLI is available
            result = subprocess.run(['orchestrate', '--version'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode != 0:
                logger.error("orchestrate CLI not found or not working")
                return False
            
            # Check if environment is active
            result = subprocess.run(['orchestrate', 'env', 'status'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode != 0:
                logger.error("No active WatsonX Orchestrate environment")
                return False
            
            logger.info("✅ WatsonX Orchestrate environment is ready")
            return True
            
        except Exception as e:
            logger.error(f"Error checking environment: {e}")
            return False
    
    def deploy_tools(self) -> bool:
        """Deploy all tools to WatsonX Orchestrate"""
        logger.info("🔧 Deploying tools...")
        
        tool_files = [
            "project_analyzer_tool.yaml",
            "impact_calculator_tool.yaml", 
            "risk_assessor_tool.yaml",
            "budget_optimizer_tool.yaml"
        ]
        
        success_count = 0
        
        for tool_file in tool_files:
            tool_path = self.tools_dir / tool_file
            if not tool_path.exists():
                logger.error(f"Tool file not found: {tool_path}")
                continue
            
            try:
                logger.info(f"Deploying tool: {tool_file}")
                result = subprocess.run([
                    'orchestrate', 'tools', 'import', '-f', str(tool_path)
                ], capture_output=True, text=True, timeout=60)
                
                if result.returncode == 0:
                    logger.info(f"✅ Successfully deployed tool: {tool_file}")
                    success_count += 1
                    self.deployment_log.append({
                        "type": "tool",
                        "name": tool_file,
                        "status": "success"
                    })
                else:
                    logger.error(f"❌ Failed to deploy tool {tool_file}: {result.stderr}")
                    self.deployment_log.append({
                        "type": "tool", 
                        "name": tool_file,
                        "status": "failed",
                        "error": result.stderr
                    })
                    
            except Exception as e:
                logger.error(f"Error deploying tool {tool_file}: {e}")
                self.deployment_log.append({
                    "type": "tool",
                    "name": tool_file, 
                    "status": "error",
                    "error": str(e)
                })
        
        logger.info(f"📊 Tools deployment: {success_count}/{len(tool_files)} successful")
        return success_count == len(tool_files)
    
    def deploy_agents(self) -> bool:
        """Deploy all agents to WatsonX Orchestrate"""
        logger.info("🤖 Deploying agents...")
        
        agent_files = [
            "csr_matching_agent.yaml",
            "project_evaluation_agent.yaml",
            "decision_support_agent.yaml", 
            "impact_assessment_agent.yaml"
        ]
        
        success_count = 0
        
        for agent_file in agent_files:
            agent_path = self.agents_dir / agent_file
            if not agent_path.exists():
                logger.error(f"Agent file not found: {agent_path}")
                continue
            
            try:
                logger.info(f"Deploying agent: {agent_file}")
                result = subprocess.run([
                    'orchestrate', 'agents', 'import', '-f', str(agent_path)
                ], capture_output=True, text=True, timeout=60)
                
                if result.returncode == 0:
                    logger.info(f"✅ Successfully deployed agent: {agent_file}")
                    success_count += 1
                    self.deployment_log.append({
                        "type": "agent",
                        "name": agent_file,
                        "status": "success"
                    })
                else:
                    logger.error(f"❌ Failed to deploy agent {agent_file}: {result.stderr}")
                    self.deployment_log.append({
                        "type": "agent",
                        "name": agent_file,
                        "status": "failed", 
                        "error": result.stderr
                    })
                    
            except Exception as e:
                logger.error(f"Error deploying agent {agent_file}: {e}")
                self.deployment_log.append({
                    "type": "agent",
                    "name": agent_file,
                    "status": "error",
                    "error": str(e)
                })
        
        logger.info(f"📊 Agents deployment: {success_count}/{len(agent_files)} successful")
        return success_count == len(agent_files)
    
    def verify_deployment(self) -> Dict[str, Any]:
        """Verify that all agents and tools are properly deployed"""
        logger.info("🔍 Verifying deployment...")
        
        verification_results = {
            "tools": [],
            "agents": [],
            "overall_success": True
        }
        
        try:
            # Check tools
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
                
                for tool_name in expected_tools:
                    if tool_name in tools_output:
                        verification_results["tools"].append({"name": tool_name, "status": "deployed"})
                        logger.info(f"✅ Tool verified: {tool_name}")
                    else:
                        verification_results["tools"].append({"name": tool_name, "status": "missing"})
                        logger.error(f"❌ Tool missing: {tool_name}")
                        verification_results["overall_success"] = False
            else:
                logger.error("Failed to list tools")
                verification_results["overall_success"] = False
            
            # Check agents
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
                
                for agent_name in expected_agents:
                    if agent_name in agents_output:
                        verification_results["agents"].append({"name": agent_name, "status": "deployed"})
                        logger.info(f"✅ Agent verified: {agent_name}")
                    else:
                        verification_results["agents"].append({"name": agent_name, "status": "missing"})
                        logger.error(f"❌ Agent missing: {agent_name}")
                        verification_results["overall_success"] = False
            else:
                logger.error("Failed to list agents")
                verification_results["overall_success"] = False
                
        except Exception as e:
            logger.error(f"Error during verification: {e}")
            verification_results["overall_success"] = False
        
        return verification_results
    
    def print_deployment_summary(self):
        """Print a summary of the deployment"""
        logger.info("\n" + "="*60)
        logger.info("📋 DEPLOYMENT SUMMARY")
        logger.info("="*60)
        
        # Count successes and failures
        tool_success = sum(1 for log in self.deployment_log if log["type"] == "tool" and log["status"] == "success")
        tool_failed = sum(1 for log in self.deployment_log if log["type"] == "tool" and log["status"] != "success")
        agent_success = sum(1 for log in self.deployment_log if log["type"] == "agent" and log["status"] == "success")
        agent_failed = sum(1 for log in self.deployment_log if log["type"] == "agent" and log["status"] != "success")
        
        logger.info(f"🔧 Tools: {tool_success} successful, {tool_failed} failed")
        logger.info(f"🤖 Agents: {agent_success} successful, {agent_failed} failed")
        
        if tool_failed > 0 or agent_failed > 0:
            logger.info("\n❌ Failed deployments:")
            for log in self.deployment_log:
                if log["status"] != "success":
                    logger.info(f"  - {log['type']}: {log['name']} - {log.get('error', 'Unknown error')}")
        
        logger.info("\n🎯 Next steps:")
        logger.info("1. Use 'orchestrate agents list' to see all deployed agents")
        logger.info("2. Use 'orchestrate tools list' to see all deployed tools")
        logger.info("3. Use 'orchestrate chat start' to interact with agents")
        logger.info("4. Access web interface at http://localhost:3000/chat-lite")
        
        logger.info("="*60)
    
    def deploy_all(self) -> bool:
        """Deploy all agents and tools"""
        logger.info("🚀 Starting SustainAlign WatsonX Orchestrate deployment...")
        
        # Check environment
        if not self.check_environment():
            logger.error("❌ Environment check failed. Please ensure WatsonX Orchestrate is properly configured.")
            return False
        
        # Deploy tools first
        tools_success = self.deploy_tools()
        
        # Deploy agents
        agents_success = self.deploy_agents()
        
        # Verify deployment
        verification = self.verify_deployment()
        
        # Print summary
        self.print_deployment_summary()
        
        return tools_success and agents_success and verification["overall_success"]

def main():
    """Main deployment function"""
    deployer = WatsonDeployer()
    
    success = deployer.deploy_all()
    
    if success:
        logger.info("🎉 Deployment completed successfully!")
        sys.exit(0)
    else:
        logger.error("💥 Deployment failed. Check the logs above for details.")
        sys.exit(1)

if __name__ == "__main__":
    main()
