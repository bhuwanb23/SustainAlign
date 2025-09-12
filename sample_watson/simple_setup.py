#!/usr/bin/env python3
"""
Simplified IBM WatsonX Orchestrate Setup Script
Works with just an API key - no complex configuration needed
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

logger = logging.getLogger(__name__)

def check_api_key():
    """Check if API key is configured"""
    api_key = os.getenv('WATSON_API_KEY')
    if not api_key:
        print("❌ WATSON_API_KEY not found in environment variables")
        print("   Please set your API key:")
        print("   export WATSON_API_KEY=your-api-key")
        print("   # Or add it to your .env file")
        return False
    
    print(f"✅ API key found: {api_key[:10]}...")
    return True

def check_orchestrate_cli():
    """Check if orchestrate CLI is installed"""
    try:
        result = subprocess.run(['orchestrate', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Orchestrate CLI found: {result.stdout.strip()}")
            return True
        else:
            print("❌ Orchestrate CLI not working properly")
            return False
    except FileNotFoundError:
        print("❌ Orchestrate CLI not found")
        print("   Install it with: pip install --upgrade ibm-watsonx-orchestrate")
        return False

def create_simple_env():
    """Create a simple .env file for orchestrate CLI"""
    api_key = os.getenv('WATSON_API_KEY')
    if not api_key:
        print("❌ No API key found to create .env file")
        return False
    
    env_file = current_dir / ".env"
    with open(env_file, 'w') as f:
        f.write(f"WO_DEVELOPER_EDITION_SOURCE=mcsp\n")
        f.write(f"WO_API_KEY={api_key}\n")
    
    print(f"✅ Created .env file: {env_file}")
    return True

def test_tools_locally():
    """Test tools without deploying to orchestrate"""
    print("🧪 Testing tools locally...")
    
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
            print(f"   ✅ Text processor working - Word count: {result.get('result', {}).get('word_count')}")
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
            print(f"   ✅ Data processor working - Data type: {result.get('result', {}).get('type')}")
        else:
            print(f"   ❌ Data processor failed: {result.get('error')}")
    except Exception as e:
        print(f"   ❌ Data processor test error: {e}")

def start_orchestrate_server():
    """Start the orchestrate server"""
    print("🚀 Starting orchestrate server...")
    print("   This may take a few minutes on first run (downloading Docker images)")
    
    try:
        # Start server in background
        result = subprocess.run([
            'orchestrate', 'server', 'start', '-e', '.env'
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Orchestrate server started successfully")
            print("   Web UI: http://localhost:4321")
            print("   API: http://localhost:4321/api/v1")
            return True
        else:
            print(f"❌ Failed to start server: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        return False

def deploy_tools_and_agents():
    """Deploy tools and agents to orchestrate"""
    print("🛠️  Deploying tools and agents...")
    
    # Deploy tools
    tools_dir = current_dir / "tools"
    tool_files = list(tools_dir.glob("*_tool.yaml"))
    
    for tool_file in tool_files:
        print(f"   Deploying {tool_file.name}...")
        try:
            result = subprocess.run([
                'orchestrate', 'tools', 'import', '-f', str(tool_file)
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"   ✅ {tool_file.name} deployed")
            else:
                print(f"   ⚠️  {tool_file.name} failed: {result.stderr}")
        except Exception as e:
            print(f"   ❌ {tool_file.name} error: {e}")
    
    # Deploy agents
    agents_dir = current_dir / "agents"
    agent_files = list(agents_dir.glob("*.yaml"))
    
    for agent_file in agent_files:
        print(f"   Deploying {agent_file.name}...")
        try:
            result = subprocess.run([
                'orchestrate', 'agents', 'import', '-f', str(agent_file)
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"   ✅ {agent_file.name} deployed")
            else:
                print(f"   ⚠️  {agent_file.name} failed: {result.stderr}")
        except Exception as e:
            print(f"   ❌ {agent_file.name} error: {e}")

def main():
    """Main function"""
    print("🚀 IBM WatsonX Orchestrate - Simple Setup")
    print("=" * 50)
    print("This setup works with just your API key!")
    print()
    
    # Check prerequisites
    if not check_api_key():
        return
    
    if not check_orchestrate_cli():
        return
    
    # Create environment file
    if not create_simple_env():
        return
    
    # Test tools locally first
    test_tools_locally()
    print()
    
    # Ask user what they want to do
    print("What would you like to do?")
    print("1. Test tools only (no server needed)")
    print("2. Start orchestrate server and deploy agents")
    print("3. Just start server (deploy later)")
    
    choice = input("Enter your choice (1-3): ").strip()
    
    if choice == "1":
        print("✅ Tools tested successfully!")
        print("   You can use the tools directly in your Python code")
        print("   Example: from tools.calculator import calculator_tool")
        
    elif choice == "2":
        if start_orchestrate_server():
            print("⏳ Waiting for server to be ready...")
            import time
            time.sleep(10)  # Give server time to start
            
            deploy_tools_and_agents()
            print()
            print("🎉 Setup complete!")
            print("   Web UI: http://localhost:4321")
            print("   Try chatting with the agents in the web interface")
            
    elif choice == "3":
        if start_orchestrate_server():
            print("✅ Server started!")
            print("   Web UI: http://localhost:4321")
            print("   Deploy agents later with: python simple_setup.py --deploy")
            
    else:
        print("❌ Invalid choice")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Simple IBM WatsonX Orchestrate Setup')
    parser.add_argument('--deploy', action='store_true', help='Deploy tools and agents only')
    parser.add_argument('--test', action='store_true', help='Test tools only')
    
    args = parser.parse_args()
    
    if args.deploy:
        deploy_tools_and_agents()
    elif args.test:
        test_tools_locally()
    else:
        main()
