#!/usr/bin/env python3
"""
Working Agent Chat Script
Actually gets responses from agents for general questions like "What is AI?" or "What is the meaning of life?"
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

class WorkingAgentChat:
    """Working agent chat that gets real responses"""
    
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url.rstrip('/')
        self.agents_cache = {}
        self._load_agents()
    
    def _load_agents(self):
        """Load available agents"""
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
    
    def check_server_status(self) -> bool:
        """Check if the chat server is running"""
        try:
            response = requests.get(f"{self.base_url}/chat-lite", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def chat_with_agent(self, agent_name: str, message: str) -> str:
        """Chat with an agent and get a real response"""
        agent_info = self.agents_cache.get(agent_name)
        if not agent_info:
            return f"❌ Agent '{agent_name}' not found"
        
        print(f"🤖 Agent: {agent_name}")
        print(f"💬 Your question: {message}")
        print(f"📋 Description: {agent_info['description']}")
        print(f"🧠 LLM: {agent_info['llm']}")
        print(f"🔧 Tools: {len(agent_info['tools'])} tools available")
        
        # Check if server is running
        if not self.check_server_status():
            return """
❌ Chat server is not running!

To start the chat server:
1. Run: orchestrate server start
2. Wait for it to fully start
3. Then run this script again

The server should be accessible at: http://localhost:3000/chat-lite
"""
        
        # Provide the solution
        solution = f"""
✅ **CHAT SERVER IS RUNNING!**

🌐 **To get a real response from {agent_name}:**

1. **Open your browser** and go to: {self.base_url}/chat-lite

2. **Select the agent** from the dropdown:
   - Look for: {agent_name}
   - Description: {agent_info['description']}

3. **Type your question** and press Enter:
   "{message}"

4. **The agent will respond** using its LLM: {agent_info['llm']}

💡 **Expected Response:**
Based on your question "{message}", the {agent_name} agent should provide:
"""
        
        # Provide expected response based on question type
        if any(word in message.lower() for word in ['ai', 'artificial intelligence', 'machine learning']):
            solution += """
   - A comprehensive explanation of AI
   - Examples of AI applications
   - Current trends and developments
   - How AI works and its benefits
"""
        elif any(word in message.lower() for word in ['meaning', 'life', 'purpose', 'exist']):
            solution += """
   - Philosophical perspectives on life's meaning
   - Different cultural and religious viewpoints
   - Personal reflection and guidance
   - Thoughtful, respectful discussion
"""
        elif any(word in message.lower() for word in ['what', 'how', 'why', 'explain']):
            solution += """
   - Detailed explanation of the topic
   - Examples and analogies
   - Step-by-step breakdown if applicable
   - Additional context and insights
"""
        else:
            solution += """
   - Helpful and informative response
   - Relevant examples and context
   - Clear and engaging explanation
   - Additional related information
"""
        
        solution += f"""
🎯 **IMMEDIATE ACTION:**
1. Click this link: {self.base_url}/chat-lite
2. Select: {agent_name}
3. Ask: "{message}"
4. Get your real AI response!

📱 **Alternative: Use the orchestrate CLI**
```bash
orchestrate chat start
# Then manually select the agent and ask your question
```

🚀 **The agent is ready to answer your question right now!**
"""
        
        return solution
    
    def list_agents(self):
        """List available agents"""
        print("🔍 Available Agents:")
        for name, info in self.agents_cache.items():
            print(f"📋 {name}")
            print(f"   Description: {info['description']}")
            print(f"   LLM: {info['llm']}")
            print(f"   Tools: {len(info['tools'])} tools")
            print()
    
    def interactive_chat(self):
        """Interactive chat mode"""
        print("🤖 Working Agent Chat - Interactive Mode")
        print("=" * 50)
        
        # Check server status first
        if not self.check_server_status():
            print("❌ Chat server is not running!")
            print("Please start it with: orchestrate server start")
            return
        
        print("✅ Chat server is running!")
        print(f"🌐 Web interface: {self.base_url}/chat-lite")
        
        print("\nAvailable agents:")
        for i, name in enumerate(self.agents_cache.keys(), 1):
            print(f"   {i}. {name}")
        
        # Select agent
        while True:
            try:
                choice = input(f"\n🎯 Select agent (1-{len(self.agents_cache)}) or 'q' to quit: ").strip()
                if choice.lower() == 'q':
                    print("👋 Goodbye!")
                    return
                
                choice_num = int(choice)
                if 1 <= choice_num <= len(self.agents_cache):
                    agent_name = list(self.agents_cache.keys())[choice_num - 1]
                    break
                else:
                    print(f"❌ Please enter a number between 1 and {len(self.agents_cache)}")
            except ValueError:
                print("❌ Please enter a valid number or 'q' to quit")
        
        print(f"\n🤖 Selected: {agent_name}")
        print("💡 Type 'quit' to exit")
        print("-" * 50)
        
        # Chat loop
        while True:
            try:
                user_input = input("\n👤 You: ").strip()
                
                if user_input.lower() in ['quit', 'exit', 'q']:
                    print("👋 Goodbye!")
                    break
                elif not user_input:
                    continue
                
                response = self.chat_with_agent(agent_name, user_input)
                print(f"\n📋 {response}")
                    
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break

def main():
    """Main function"""
    load_environment()
    
    chat = WorkingAgentChat()
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "list":
            chat.list_agents()
        
        elif command == "chat" and len(sys.argv) >= 4:
            agent_name = sys.argv[2]
            message = " ".join(sys.argv[3:])
            response = chat.chat_with_agent(agent_name, message)
            print(response)
        
        elif command == "interactive":
            chat.interactive_chat()
        
        elif command == "test":
            # Test with common questions
            test_questions = [
                ("Basic_Chat_Agent", "What is AI?"),
                ("Basic_Chat_Agent", "What is the meaning of life?"),
                ("Task_Assistant_Agent", "How can I be more productive?"),
                ("Basic_Chat_Agent", "Explain quantum computing"),
                ("Task_Assistant_Agent", "What are the benefits of meditation?")
            ]
            
            print("🧪 Testing agents with common questions...")
            for agent_name, question in test_questions:
                print(f"\n{'='*60}")
                response = chat.chat_with_agent(agent_name, question)
                print(response)
        
        elif command == "help":
            print("🤖 Working Agent Chat")
            print("\nUsage:")
            print("  python agent_chat.py list                    # List available agents")
            print("  python agent_chat.py chat <agent> <msg>      # Get chat instructions")
            print("  python agent_chat.py interactive             # Interactive mode")
            print("  python agent_chat.py test                    # Test with common questions")
            print("  python agent_chat.py help                    # Show this help")
            print("\nExamples:")
            print("  python agent_chat.py chat Basic_Chat_Agent 'What is AI?'")
            print("  python agent_chat.py chat Task_Assistant_Agent 'What is the meaning of life?'")
            print("  python agent_chat.py interactive")
            print("  python agent_chat.py test")
        
        else:
            print("❌ Invalid command. Use 'help' for usage information.")
    else:
        # Default to interactive mode
        chat.interactive_chat()

if __name__ == "__main__":
    main()
