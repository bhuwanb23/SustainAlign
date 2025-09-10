"""
IBM WatsonX Orchestrate Setup Script
Automated setup and deployment of Watson agents for SustainAlign
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

def setup_watson_environment():
    """Set up IBM WatsonX Orchestrate environment"""
    print("🚀 Setting up IBM WatsonX Orchestrate for SustainAlign...")
    
    # Check if orchestrate CLI is installed
    if not _check_orchestrate_cli():
        print("❌ IBM WatsonX Orchestrate CLI not found. Please install it first:")
        print("   pip install --upgrade ibm-watsonx-orchestrate")
        return False
    
    # Check configuration
    if not watson_config.is_configured():
        print("⚠️  Watson configuration is incomplete. Please set the following environment variables:")
        print("   - WATSON_SERVICE_URL")
        print("   - WATSON_API_KEY") 
        print("   - WATSON_PROJECT_ID")
        print("\nYou can copy env_watson_example.txt to .env and fill in your values.")
        return False
    
    print("✅ Watson configuration is complete")
    
    # Set up environment
    print("🔧 Setting up Watson environment...")
    if not agent_manager.setup_environment():
        print("❌ Failed to setup Watson environment")
        return False
    
    print("✅ Watson environment setup complete")
    
    # Deploy tools
    print("🛠️  Deploying Watson tools...")
    tool_types = ['project_analyzer', 'impact_calculator', 'risk_assessor', 'budget_optimizer']
    
    for tool_type in tool_types:
        print(f"   Deploying {tool_type} tool...")
        if agent_manager.deploy_tool(tool_type):
            print(f"   ✅ {tool_type} tool deployed successfully")
        else:
            print(f"   ⚠️  {tool_type} tool deployment failed (may already exist)")
    
    # Deploy agents
    print("🤖 Deploying Watson agents...")
    agent_types = ['csr_matching_agent', 'project_evaluation_agent', 
                   'decision_support_agent', 'impact_assessment_agent']
    
    for agent_type in agent_types:
        print(f"   Deploying {agent_type}...")
        if agent_manager.deploy_agent(agent_type):
            print(f"   ✅ {agent_type} deployed successfully")
        else:
            print(f"   ⚠️  {agent_type} deployment failed (may already exist)")
    
    print("🎉 IBM WatsonX Orchestrate setup complete!")
    print("\nNext steps:")
    print("1. Start your SustainAlign backend server")
    print("2. Test the Watson agents using the API endpoints")
    print("3. Check agent status at: GET /api/watson/agents/status")
    
    return True

def _check_orchestrate_cli():
    """Check if orchestrate CLI is available"""
    try:
        result = subprocess.run(['orchestrate', '--version'], 
                              capture_output=True, text=True)
        return result.returncode == 0
    except FileNotFoundError:
        return False

def list_deployed_agents():
    """List all deployed agents"""
    print("📋 Listing deployed Watson agents...")
    
    agents = agent_manager.list_agents()
    
    if not agents:
        print("No agents found. Run setup_watson_environment() first.")
        return
    
    print(f"Found {len(agents)} deployed agents:")
    for agent in agents:
        print(f"  - {agent['name']} ({agent['status']})")

def test_agents():
    """Test deployed agents"""
    print("🧪 Testing Watson agents...")
    
    # Test data
    test_project = {
        'id': 'test-001',
        'name': 'Test CSR Project',
        'description': 'A test project for Watson agent validation',
        'budget': 100000,
        'timeline_months': 12,
        'location': 'India',
        'sdg_focus': [1, 3, 4],
        'expected_beneficiaries': 1000,
        'complexity_level': 'medium',
        'risk_level': 'low'
    }
    
    test_company = {
        'id': 'company-001',
        'company_name': 'Test Company',
        'sdg_priorities': [1, 3, 4, 8],
        'geographic_focus': ['India', 'Asia'],
        'available_budget': 500000,
        'csr_focus_areas': ['Education', 'Healthcare', 'Poverty Alleviation']
    }
    
    # Test project analyzer tool
    print("   Testing project analyzer tool...")
    try:
        from ibm_watson.tools.project_analyzer import project_analyzer_function
        result = project_analyzer_function(test_project, test_company, "alignment")
        if result.get('success', False):
            print("   ✅ Project analyzer tool working")
        else:
            print("   ❌ Project analyzer tool failed")
    except Exception as e:
        print(f"   ❌ Project analyzer tool error: {e}")
    
    # Test impact calculator tool
    print("   Testing impact calculator tool...")
    try:
        from ibm_watson.tools.impact_calculator import impact_calculator_function
        impact_metrics = {
            'beneficiaries': 1000,
            'carbon_reduction_tons': 50,
            'water_conservation_liters': 100000,
            'jobs_created': 10
        }
        result = impact_calculator_function(impact_metrics)
        if result.get('success', False):
            print("   ✅ Impact calculator tool working")
        else:
            print("   ❌ Impact calculator tool failed")
    except Exception as e:
        print(f"   ❌ Impact calculator tool error: {e}")
    
    print("✅ Agent testing complete")

def main():
    """Main setup function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='IBM WatsonX Orchestrate Setup for SustainAlign')
    parser.add_argument('--setup', action='store_true', help='Set up Watson environment')
    parser.add_argument('--list', action='store_true', help='List deployed agents')
    parser.add_argument('--test', action='store_true', help='Test deployed agents')
    
    args = parser.parse_args()
    
    if args.setup:
        setup_watson_environment()
    elif args.list:
        list_deployed_agents()
    elif args.test:
        test_agents()
    else:
        print("IBM WatsonX Orchestrate Setup for SustainAlign")
        print("Usage:")
        print("  python setup.py --setup    # Set up Watson environment")
        print("  python setup.py --list     # List deployed agents")
        print("  python setup.py --test     # Test deployed agents")

if __name__ == "__main__":
    main()
