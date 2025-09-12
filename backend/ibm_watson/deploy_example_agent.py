#!/usr/bin/env python3
"""
Example script to deploy a new IBM watsonx Orchestrate agent
Demonstrates the complete process from creation to deployment
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from ibm_watson.config import watson_config
from ibm_watson.agent_manager import agent_manager

logger = logging.getLogger(__name__)

def create_sustainability_advisor_agent():
    """Create and deploy the Sustainability Advisor Agent"""
    
    print("🌱 Creating Sustainability Advisor Agent...")
    
    # 1. Create the agent YAML
    agent_config = {
        "name": "Sustainability_Advisor_Agent",
        "description": "An AI agent that provides sustainability advice and recommendations for CSR projects",
        "llm": "watsonx/ibm/granite-3.0-20b-instruct",
        "style": "react"
    }
    
    try:
        yaml_file = agent_manager.create_agent_yaml("sustainability_advisor", agent_config)
        print(f"✅ Created agent YAML: {yaml_file}")
    except Exception as e:
        print(f"❌ Failed to create agent YAML: {e}")
        return False
    
    # 2. Create the tool YAML
    tool_config = {
        "name": "sustainability_analyzer_tool",
        "description": "Analyzes projects for sustainability best practices and recommendations"
    }
    
    try:
        tool_yaml_file = agent_manager.create_tool_yaml("sustainability_analyzer", tool_config)
        print(f"✅ Created tool YAML: {tool_yaml_file}")
    except Exception as e:
        print(f"❌ Failed to create tool YAML: {e}")
        return False
    
    # 3. Deploy the tool first
    print("🛠️  Deploying sustainability analyzer tool...")
    if agent_manager.deploy_tool("sustainability_analyzer"):
        print("✅ Tool deployed successfully")
    else:
        print("⚠️  Tool deployment failed (may already exist)")
    
    # 4. Deploy the agent
    print("🤖 Deploying Sustainability Advisor Agent...")
    if agent_manager.deploy_agent("sustainability_advisor"):
        print("✅ Agent deployed successfully")
        return True
    else:
        print("❌ Agent deployment failed")
        return False

def test_sustainability_agent():
    """Test the deployed Sustainability Advisor Agent"""
    
    print("🧪 Testing Sustainability Advisor Agent...")
    
    # Test data
    test_project = {
        'id': 'sustainability-test-001',
        'name': 'Green Energy Education Program',
        'description': 'A program to educate communities about renewable energy',
        'budget': 250000,
        'timeline_months': 18,
        'location': 'Rural India',
        'sdg_focus': [7, 4, 13],  # Clean Energy, Quality Education, Climate Action
        'expected_beneficiaries': 5000,
        'complexity_level': 'medium',
        'risk_level': 'low',
        'carbon_footprint': {
            'reduction_target': True,
            'monitoring_system': True,
            'offsetting_strategy': False
        },
        'community_engagement': {
            'engagement_level': 'high',
            'feedback_mechanism': True
        },
        'resource_usage': {
            'renewable_energy_percentage': 80,
            'efficiency_metrics': {'energy_efficiency': 0.85}
        },
        'waste_management': {
            'recycling_rate': 75,
            'waste_reduction_target': True
        },
        'stakeholder_involvement': {
            'stakeholders': ['local_government', 'ngos', 'community_leaders', 'schools'],
            'regular_consultation': True
        },
        'transparency': {
            'reporting_frequency': 'quarterly',
            'public_disclosure': True
        },
        'long_term_funding': {
            'funding_duration_years': 7,
            'diversified_sources': True
        }
    }
    
    # Test the sustainability analyzer tool directly
    print("   Testing sustainability analyzer tool...")
    try:
        from ibm_watson.tools.sustainability_analyzer import sustainability_analyzer_function
        
        result = sustainability_analyzer_function(test_project, "SDG")
        
        if result.get('success', False):
            print(f"   ✅ Tool working - Overall sustainability score: {result.get('overall_sustainability_score', 'N/A')}")
            print(f"   📊 Environmental: {result.get('environmental_sustainability', {}).get('score', 'N/A')}")
            print(f"   👥 Social: {result.get('social_sustainability', {}).get('score', 'N/A')}")
            print(f"   💰 Economic: {result.get('economic_sustainability', {}).get('score', 'N/A')}")
            print(f"   🏛️  Governance: {result.get('governance_sustainability', {}).get('score', 'N/A')}")
            
            recommendations = result.get('recommendations', [])
            if recommendations:
                print("   💡 Key recommendations:")
                for rec in recommendations[:3]:  # Show first 3 recommendations
                    print(f"      - {rec}")
        else:
            print(f"   ❌ Tool failed: {result.get('error', 'Unknown error')}")
            
    except Exception as e:
        print(f"   ❌ Tool test error: {e}")
    
    # Test agent through API (if available)
    print("   Testing agent through API...")
    try:
        import requests
        
        # This would work if the agent is deployed and accessible
        # response = requests.post('http://localhost:4321/api/v1/agents/sustainability_advisor/chat', 
        #                         json={
        #                             "message": "Analyze this project for sustainability",
        #                             "project_data": test_project
        #                         })
        # 
        # if response.status_code == 200:
        #     print("   ✅ Agent API working")
        # else:
        #     print(f"   ⚠️  Agent API returned status: {response.status_code}")
        
        print("   ℹ️  Agent API test skipped (requires running orchestrate server)")
        
    except Exception as e:
        print(f"   ⚠️  Agent API test error: {e}")

def list_deployed_agents():
    """List all deployed agents"""
    
    print("📋 Listing deployed agents...")
    
    agents = agent_manager.list_agents()
    
    if not agents:
        print("No agents found.")
        return
    
    print(f"Found {len(agents)} deployed agents:")
    for agent in agents:
        print(f"  - {agent['name']} ({agent['status']})")

def main():
    """Main function to demonstrate agent creation and deployment"""
    
    print("🚀 IBM watsonx Orchestrate Agent Creation Example")
    print("=" * 50)
    
    # Check if orchestrate CLI is available
    try:
        result = subprocess.run(['orchestrate', '--version'], 
                              capture_output=True, text=True)
        if result.returncode != 0:
            print("❌ IBM watsonx Orchestrate CLI not found.")
            print("   Please install it first: pip install --upgrade ibm-watsonx-orchestrate")
            return
        else:
            print(f"✅ Orchestrate CLI found: {result.stdout.strip()}")
    except FileNotFoundError:
        print("❌ IBM watsonx Orchestrate CLI not found.")
        print("   Please install it first: pip install --upgrade ibm-watsonx-orchestrate")
        return
    
    # Check configuration
    if not watson_config.is_configured():
        print("⚠️  Watson configuration is incomplete.")
        print("   Please set the following environment variables:")
        print("   - WATSON_SERVICE_URL")
        print("   - WATSON_API_KEY")
        print("   - WATSON_PROJECT_ID (for IBM Cloud)")
        print("\n   You can copy env_watson_example.txt to .env and fill in your values.")
        return
    
    print("✅ Watson configuration is complete")
    
    # Create and deploy the agent
    if create_sustainability_advisor_agent():
        print("\n🎉 Sustainability Advisor Agent created and deployed successfully!")
        
        # Test the agent
        print("\n" + "=" * 50)
        test_sustainability_agent()
        
        # List all agents
        print("\n" + "=" * 50)
        list_deployed_agents()
        
        print("\n📚 Next steps:")
        print("1. Start your orchestrate server: orchestrate server start -e .env")
        print("2. Test the agent through the web UI or API")
        print("3. Integrate with your SustainAlign application")
        print("4. Monitor agent performance and optimize as needed")
        
    else:
        print("❌ Failed to create and deploy the agent")
        print("   Check the error messages above and try again")

if __name__ == "__main__":
    main()
