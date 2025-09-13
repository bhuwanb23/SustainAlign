#!/usr/bin/env python3
"""
Simple Agent Wrapper
A simple way to interact with WatsonX Orchestrate agents programmatically
"""

import os
import sys
import json
import requests
import time
from pathlib import Path
from typing import Dict, Optional

# Add current directory to Python path
current_dir = Path(__file__).parent.parent
sys.path.insert(0, str(current_dir))

def load_environment():
    """Load environment variables"""
    try:
        from dotenv import load_dotenv
        env_file = current_dir / ".env"
        if env_file.exists():
            load_dotenv(env_file)
    except ImportError:
        pass

class AgentWrapper:
    """Simple wrapper for WatsonX Orchestrate agents"""
    
    def __init__(self, base_url: str = "http://localhost:4321"):
        self.base_url = base_url.rstrip('/')
        self.api_key = os.getenv('WO_API_KEY')
        self.agents_cache = {}
        self._load_agents()
    
    def _load_agents(self):
        """Load available agents using CLI"""
        try:
            import subprocess
            result = subprocess.run(
                ['orchestrate', 'agents', 'list', '--verbose'],
                capture_output=True, text=True, cwd=current_dir
            )
            
            if result.returncode == 0:
                data = json.loads(result.stdout)
                if 'native' in data:
                    for agent in data['native']:
                        name = agent.get('name', 'Unknown')
                        self.agents_cache[name] = {
                            'id': agent.get('id'),
                            'description': agent.get('description', ''),
                            'llm': agent.get('llm', ''),
                            'tools': agent.get('tools', [])
                        }
        except Exception as e:
            print(f"Warning: Could not load agents: {e}")
    
    def list_agents(self):
        """List available agents"""
        print("🔍 Available Agents:")
        for name, info in self.agents_cache.items():
            print(f"📋 {name}")
            print(f"   Description: {info['description']}")
            print(f"   LLM: {info['llm']}")
            print(f"   Tools: {len(info['tools'])} tools")
            print()
    
    def get_agent_info(self, agent_name: str) -> Optional[Dict]:
        """Get agent information"""
        return self.agents_cache.get(agent_name)
    
    def chat_with_agent(self, agent_name: str, message: str) -> Optional[str]:
        """
        Chat with an agent using the web interface
        This is a simplified approach that opens the web interface
        """
        agent_info = self.get_agent_info(agent_name)
        if not agent_info:
            print(f"❌ Agent '{agent_name}' not found")
            return None
        
        print(f"🤖 Chatting with: {agent_name}")
        print(f"💬 Message: {message}")
        print(f"📋 Description: {agent_info['description']}")
        print(f"🧠 LLM: {agent_info['llm']}")
        print(f"🔧 Tools: {len(agent_info['tools'])} tools available")
        
        # For now, we'll provide instructions on how to use the web interface
        print("\n🌐 To chat with this agent:")
        print("1. Open your browser and go to: http://localhost:3000/chat-lite")
        print("2. Select the agent from the dropdown")
        print("3. Type your message and press Enter")
        print("\n💡 The agent will use its tools to help you with:")
        
        # Show what the agent can do based on its tools
        if agent_info['tools']:
            print("   - Mathematical calculations (calculator_tool)")
            print("   - Text processing and analysis (text_processor_tool)")
            print("   - Data manipulation and analysis (data_processor_tool)")
        else:
            print("   - General conversation and assistance")
        
        return f"Agent {agent_name} is ready to help! Please use the web interface at http://localhost:3000/chat-lite"

def example_usage():
    """Example usage of the agent wrapper"""
    print("🤖 Agent Wrapper Example")
    print("=" * 40)
    
    load_environment()
    
    # Initialize wrapper
    wrapper = AgentWrapper()
    
    # List available agents
    wrapper.list_agents()
    
    # Example 1: Chat with Basic Chat Agent
    print("\n📝 Example 1: Basic Chat Agent")
    print("-" * 30)
    response = wrapper.chat_with_agent("Basic_Chat_Agent", "Hello! Can you help me with a calculation?")
    if response:
        print(f"Response: {response}")
    
    # Example 2: Chat with Task Assistant Agent
    print("\n📝 Example 2: Task Assistant Agent")
    print("-" * 30)
    response = wrapper.chat_with_agent("Task_Assistant_Agent", "Help me plan my day")
    if response:
        print(f"Response: {response}")
    
    # Example 3: Get agent information
    print("\n📝 Example 3: Agent Information")
    print("-" * 30)
    agent_info = wrapper.get_agent_info("Basic_Chat_Agent")
    if agent_info:
        print(f"Agent ID: {agent_info['id']}")
        print(f"Description: {agent_info['description']}")
        print(f"LLM: {agent_info['llm']}")
        print(f"Tools: {agent_info['tools']}")

def interactive_mode():
    """Interactive mode for testing agents"""
    print("🤖 Interactive Agent Wrapper")
    print("=" * 40)
    
    load_environment()
    
    wrapper = AgentWrapper()
    
    print("Available agents:")
    for name in wrapper.agents_cache.keys():
        print(f"  - {name}")
    
    while True:
        try:
            agent_name = input("\n🎯 Enter agent name (or 'quit' to exit): ").strip()
            if agent_name.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
            
            if agent_name not in wrapper.agents_cache:
                print(f"❌ Agent '{agent_name}' not found")
                continue
            
            message = input("💬 Enter your message: ").strip()
            if not message:
                continue
            
            response = wrapper.chat_with_agent(agent_name, message)
            if response:
                print(f"\n📋 Instructions: {response}")
                
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    """Main function"""
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "list":
            load_environment()
            wrapper = AgentWrapper()
            wrapper.list_agents()
        
        elif command == "info" and len(sys.argv) >= 3:
            agent_name = sys.argv[2]
            load_environment()
            wrapper = AgentWrapper()
            agent_info = wrapper.get_agent_info(agent_name)
            if agent_info:
                print(f"📋 Agent: {agent_name}")
                print(f"   ID: {agent_info['id']}")
                print(f"   Description: {agent_info['description']}")
                print(f"   LLM: {agent_info['llm']}")
                print(f"   Tools: {len(agent_info['tools'])} tools")
            else:
                print(f"❌ Agent '{agent_name}' not found")
        
        elif command == "chat" and len(sys.argv) >= 4:
            agent_name = sys.argv[2]
            message = " ".join(sys.argv[3:])
            load_environment()
            wrapper = AgentWrapper()
            wrapper.chat_with_agent(agent_name, message)
        
        elif command == "interactive":
            interactive_mode()
        
        elif command == "example":
            example_usage()
        
        elif command == "help":
            print("🤖 Agent Wrapper")
            print("\nUsage:")
            print("  python agent_wrapper.py list                    # List available agents")
            print("  python agent_wrapper.py info <agent>            # Get agent information")
            print("  python agent_wrapper.py chat <agent> <msg>      # Chat with agent")
            print("  python agent_wrapper.py interactive             # Interactive mode")
            print("  python agent_wrapper.py example                 # Run examples")
            print("  python agent_wrapper.py help                    # Show this help")
            print("\nExamples:")
            print("  python agent_wrapper.py list")
            print("  python agent_wrapper.py info Basic_Chat_Agent")
            print("  python agent_wrapper.py chat Basic_Chat_Agent 'Hello!'")
            print("  python agent_wrapper.py interactive")
        
        else:
            print("❌ Invalid command. Use 'help' for usage information.")
    else:
        example_usage()

if __name__ == "__main__":
    main()
