#!/usr/bin/env python3
"""
IBM WatsonX Orchestrate Sample Setup Script
Sets up and deploys sample agents and tools for learning and testing
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

from config import config

logger = logging.getLogger(__name__)

def check_prerequisites():
    """Check if all prerequisites are met"""
    print("🔍 Checking prerequisites...")
    
    # Check if orchestrate CLI is installed
    try:
        result = subprocess.run(['orchestrate', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Orchestrate CLI found: {result.stdout.strip()}")
        else:
            print("❌ Orchestrate CLI not found or not working")
            return False
    except FileNotFoundError:
        print("❌ Orchestrate CLI not found. Please install it first:")
        print("   pip install --upgrade ibm-watsonx-orchestrate")
        return False
    
    # Check configuration
    if not config.is_configured():
        print("⚠️  Watson configuration is incomplete.")
        print("   Please copy env_example.txt to .env and add your API key:")
        print("   cp env_example.txt .env")
        print("   # Then edit .env and set: WATSON_API_KEY=your-api-key")
        return False
    
    print("✅ Configuration is complete")
    return True

def setup_environment():
    """Set up the Watson environment"""
    print("🔧 Setting up Watson environment...")
    
    try:
        # Get environment variables for orchestrate CLI
        env_vars = config.get_environment_vars()
        
        # Create .env file for orchestrate CLI
        env_file = current_dir / ".env"
        with open(env_file, 'w') as f:
            for key, value in env_vars.items():
                f.write(f"{key}={value}\n")
        
        print(f"✅ Created environment file: {env_file}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to setup environment: {e}")
        return False

def deploy_tools():
    """Deploy all tools"""
    print("🛠️  Deploying tools...")
    
    tools_dir = current_dir / "tools"
    tool_files = list(tools_dir.glob("*_tool.yaml"))
    
    if not tool_files:
        print("❌ No tool YAML files found in tools/ directory")
        return False
    
    success_count = 0
    for tool_file in tool_files:
        print(f"   Deploying {tool_file.name}...")
        try:
            result = subprocess.run([
                'orchestrate', 'tools', 'import', '-f', str(tool_file)
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"   ✅ {tool_file.name} deployed successfully")
                success_count += 1
            else:
                print(f"   ⚠️  {tool_file.name} deployment failed: {result.stderr}")
                
        except Exception as e:
            print(f"   ❌ {tool_file.name} deployment error: {e}")
    
    print(f"✅ Deployed {success_count}/{len(tool_files)} tools")
    return success_count > 0

def deploy_agents():
    """Deploy all agents"""
    print("🤖 Deploying agents...")
    
    agents_dir = current_dir / "agents"
    agent_files = list(agents_dir.glob("*.yaml"))
    
    if not agent_files:
        print("❌ No agent YAML files found in agents/ directory")
        return False
    
    success_count = 0
    for agent_file in agent_files:
        print(f"   Deploying {agent_file.name}...")
        try:
            result = subprocess.run([
                'orchestrate', 'agents', 'import', '-f', str(agent_file)
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"   ✅ {agent_file.name} deployed successfully")
                success_count += 1
            else:
                print(f"   ⚠️  {agent_file.name} deployment failed: {result.stderr}")
                
        except Exception as e:
            print(f"   ❌ {agent_file.name} deployment error: {e}")
    
    print(f"✅ Deployed {success_count}/{len(agent_files)} agents")
    return success_count > 0

def list_deployed_items():
    """List all deployed agents and tools"""
    print("📋 Listing deployed items...")
    
    # List agents
    try:
        result = subprocess.run(['orchestrate', 'agents', 'list'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("🤖 Deployed Agents:")
            print(result.stdout)
        else:
            print("❌ Failed to list agents")
    except Exception as e:
        print(f"❌ Error listing agents: {e}")
    
    # List tools
    try:
        result = subprocess.run(['orchestrate', 'tools', 'list'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("🛠️  Deployed Tools:")
            print(result.stdout)
        else:
            print("❌ Failed to list tools")
    except Exception as e:
        print(f"❌ Error listing tools: {e}")

def test_tools():
    """Test the deployed tools"""
    print("🧪 Testing tools...")
    
    # Test calculator tool
    print("   Testing calculator tool...")
    try:
        from tools.calculator import calculator_tool
        result = calculator_tool("add", [1, 2, 3, 4])
        if result.get('success', False):
            print(f"   ✅ Calculator working - Result: {result.get('result')}")
        else:
            print(f"   ❌ Calculator failed: {result.get('error')}")
    except Exception as e:
        print(f"   ❌ Calculator test error: {e}")
    
    # Test text processor tool
    print("   Testing text processor tool...")
    try:
        from tools.text_processor import text_processor_tool
        result = text_processor_tool("Hello world! This is a test.", "count_words")
        if result.get('success', False):
            print(f"   ✅ Text processor working - Result: {result.get('result')}")
        else:
            print(f"   ❌ Text processor failed: {result.get('error')}")
    except Exception as e:
        print(f"   ❌ Text processor test error: {e}")
    
    # Test data processor tool
    print("   Testing data processor tool...")
    try:
        from tools.data_processor import data_processor_tool
        test_data = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
        result = data_processor_tool(test_data, "analyze")
        if result.get('success', False):
            print(f"   ✅ Data processor working - Result type: {type(result.get('result'))}")
        else:
            print(f"   ❌ Data processor failed: {result.get('error')}")
    except Exception as e:
        print(f"   ❌ Data processor test error: {e}")

def main():
    """Main setup function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='IBM WatsonX Orchestrate Sample Setup')
    parser.add_argument('--setup', action='store_true', help='Set up the complete environment')
    parser.add_argument('--deploy', action='store_true', help='Deploy agents and tools')
    parser.add_argument('--test', action='store_true', help='Test deployed tools')
    parser.add_argument('--list', action='store_true', help='List deployed items')
    parser.add_argument('--all', action='store_true', help='Run complete setup (setup + deploy + test)')
    
    args = parser.parse_args()
    
    print("🚀 IBM WatsonX Orchestrate Sample Setup")
    print("=" * 50)
    
    if args.all or args.setup:
        if not check_prerequisites():
            return
        
        if not setup_environment():
            return
        
        print("✅ Environment setup complete")
    
    if args.all or args.deploy:
        if not deploy_tools():
            print("⚠️  Some tools failed to deploy, but continuing...")
        
        if not deploy_agents():
            print("⚠️  Some agents failed to deploy, but continuing...")
    
    if args.all or args.test:
        test_tools()
    
    if args.all or args.list:
        list_deployed_items()
    
    if not any([args.setup, args.deploy, args.test, args.list, args.all]):
        print("IBM WatsonX Orchestrate Sample Setup")
        print("Usage:")
        print("  python setup.py --setup    # Set up environment")
        print("  python setup.py --deploy   # Deploy agents and tools")
        print("  python setup.py --test     # Test deployed tools")
        print("  python setup.py --list     # List deployed items")
        print("  python setup.py --all      # Run complete setup")
        print("\nFirst time setup:")
        print("  1. Copy env_example.txt to .env")
        print("  2. Edit .env and set: WATSON_API_KEY=your-api-key")
        print("  3. Run: python setup.py --all")

if __name__ == "__main__":
    main()
