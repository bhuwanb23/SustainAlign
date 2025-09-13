#!/usr/bin/env python3
"""
Import all tools and agents for the sample_watson project
"""

import subprocess
import sys
import time
import os
from pathlib import Path

def run_command(cmd, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}")
    print(f"Running: {cmd}")
    
    try:
        # Run from the parent directory (sample_watson)
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=Path(__file__).parent.parent)
        
        if result.returncode == 0:
            print(f"✅ {description} - Success")
            if result.stdout:
                print(f"Output: {result.stdout}")
        else:
            print(f"❌ {description} - Failed")
            print(f"Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ {description} - Exception: {e}")
        return False
    
    return True

def setup_environment():
    """Set up environment variables from existing environment"""
    print("🔧 Checking environment variables...")
    
    # Check if required environment variables are set
    api_key = os.getenv('WATSON_API_KEY') or os.getenv('WO_API_KEY')
    instance = os.getenv('WO_INSTANCE') or os.getenv('WATSON_SERVICE_URL')
    
    if not api_key:
        print("❌ No API key found in environment variables")
        print("   Please set WATSON_API_KEY or WO_API_KEY")
        print("   Example: export WATSON_API_KEY=your-api-key")
        return False
    
    if not instance:
        print("❌ No instance URL found in environment variables")
        print("   Please set WO_INSTANCE or WATSON_SERVICE_URL")
        print("   Example: export WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com")
        return False
    
    # Set environment variables for orchestrate CLI
    os.environ['WO_DEVELOPER_EDITION_SOURCE'] = 'orchestrate'
    os.environ['WO_INSTANCE'] = instance
    os.environ['WO_API_KEY'] = api_key
    
    print("✅ Environment variables configured")
    return True

def main():
    """Main import function"""
    print("🚀 Importing All Tools and Agents")
    print("=" * 50)
    
    # Set up environment
    if not setup_environment():
        print("❌ Environment setup failed. Please set required environment variables.")
        return
    
    # Wait for server to be ready
    print("\n⏳ Waiting for server to be ready...")
    time.sleep(3)
    
    # Import tools using Python files directly
    tools = [
        ("tools/calculator.py", "calculator_tool", "Importing calculator tool"),
        ("tools/text_processor.py", "text_processor_tool", "Importing text processor tool"),
        ("tools/data_processor.py", "data_processor_tool", "Importing data processor tool")
    ]
    
    for tool_file, tool_name, description in tools:
        # Try importing with package-root
        cmd = f"orchestrate tools import -k python -f {tool_file} --package-root ."
        if not run_command(cmd, description):
            # Try alternative method
            print(f"⚠️  Trying alternative import for {tool_name}...")
            run_command(f"orchestrate tools import -k python -f {tool_file}", f"Alternative import for {tool_name}")
    
    # Import agents
    agents = [
        ("agents/basic_chat_agent.yaml", "Importing basic chat agent"),
        ("agents/task_assistant_agent.yaml", "Importing task assistant agent")
    ]
    
    for agent_file, description in agents:
        run_command(f"orchestrate agents import -f {agent_file}", description)
    
    # List all tools and agents
    print("\n📋 Final Status:")
    run_command("orchestrate tools list", "Listing all tools")
    run_command("orchestrate agents list", "Listing all agents")
    
    print("\n🎉 Import process complete!")
    print("You can now use the chat interface at: http://localhost:3000/chat-lite")

if __name__ == "__main__":
    main()
