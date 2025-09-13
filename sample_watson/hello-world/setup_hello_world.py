#!/usr/bin/env python3
"""
Setup script for Hello World agent and tool
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
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=Path(__file__).parent)
        
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
    """Main setup function"""
    print("🚀 Setting up Hello World Agent and Tool")
    print("=" * 50)
    
    # Set up environment
    if not setup_environment():
        print("❌ Environment setup failed. Please set required environment variables.")
        return
    
    # Wait for server to be ready
    print("\n⏳ Waiting for server to be ready...")
    time.sleep(5)
    
    # Import the tool
    if not run_command("orchestrate tools import -k python -f tools/simple_greeting.py", "Importing simple greeting tool"):
        print("⚠️  Tool import failed, trying alternative method...")
        run_command("orchestrate tools import -f tools/simple_greeting_tool.yaml", "Importing tool via YAML")
    
    # Import the agent
    if not run_command("orchestrate agents import -f simple_greeter.yaml", "Importing simple greeter agent"):
        print("⚠️  Agent import failed, trying alternative method...")
        run_command("orchestrate agents import -f greeter.yaml", "Importing original greeter agent")
    
    # List tools and agents
    print("\n📋 Checking imported items...")
    run_command("orchestrate tools list", "Listing tools")
    run_command("orchestrate agents list", "Listing agents")
    
    print("\n🎉 Setup complete!")
    print("You can now start the chat interface with: orchestrate chat start")
    print("Then visit: http://localhost:3000/chat-lite")

if __name__ == "__main__":
    main()
