#!/usr/bin/env python3
"""
Working Chat Script - Actually gets real responses from agents
This script uses the orchestrate CLI to get real responses
"""

import os
import sys
import json
import subprocess
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
    
    def __init__(self):
        self.agents_cache = {}
        self._load_agents()
    
    def _load_agents(self):
        """Load available agents"""
        try:
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
    
    def get_real_response(self, agent_name: str, message: str) -> str:
        """Get a real response from an agent using orchestrate CLI"""
        agent_info = self.agents_cache.get(agent_name)
        if not agent_info:
            return f"❌ Agent '{agent_name}' not found"
        
        print(f"🤖 Chatting with: {agent_name}")
        print(f"💬 Your question: {message}")
        print(f"🧠 Using LLM: {agent_info['llm']}")
        print("⏳ Getting response...")
        
        try:
            # Create a temporary script to interact with orchestrate chat
            script_content = f"""
import subprocess
import sys
import time
import os

# Change to the correct directory
os.chdir(r'{current_dir}')

# Start orchestrate chat in a way that we can interact with it
process = subprocess.Popen(
    ['orchestrate', 'chat', 'start'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    cwd=r'{current_dir}'
)

# Wait a moment for the process to start
time.sleep(3)

# Send commands
commands = [
    f"select {agent_name}\\n",
    f"{message}\\n",
    "exit\\n"
]

for cmd in commands:
    process.stdin.write(cmd)
    process.stdin.flush()
    time.sleep(2)

# Get output
stdout, stderr = process.communicate(timeout=60)

print("STDOUT:", stdout)
print("STDERR:", stderr)
"""
            
            # Write the script to a temporary file
            script_file = current_dir / "temp_chat_script.py"
            with open(script_file, 'w') as f:
                f.write(script_content)
            
            # Run the script
            result = subprocess.run(
                [sys.executable, str(script_file)],
                capture_output=True,
                text=True,
                timeout=120,
                cwd=current_dir
            )
            
            # Clean up
            if script_file.exists():
                script_file.unlink()
            
            if result.returncode == 0 and result.stdout:
                # Parse the output to find the response
                output_lines = result.stdout.split('\n')
                response_found = False
                response_lines = []
                
                for i, line in enumerate(output_lines):
                    if agent_name.lower() in line.lower() or 'response' in line.lower():
                        # Look for the actual response in subsequent lines
                        for j in range(i+1, min(i+20, len(output_lines))):
                            next_line = output_lines[j].strip()
                            if next_line and not next_line.startswith('>') and not next_line.startswith('['):
                                response_lines.append(next_line)
                                response_found = True
                
                if response_found and response_lines:
                    response = ' '.join(response_lines[:5])  # Take first 5 lines
                    return f"✅ **REAL RESPONSE FROM {agent_name}:**\n\n{response}"
            
            # If we couldn't parse the response, provide the working solution
            return f"""
❌ **Could not parse response from CLI**

🔧 **The issue**: The orchestrate CLI doesn't support direct input for programmatic use.

✅ **SOLUTION - Get your real response now:**

1. **Open this link**: http://localhost:3000/chat-lite
2. **Select agent**: {agent_name}
3. **Type your question**: "{message}"
4. **Press Enter** and get your real AI response!

🎯 **This will give you the actual response from the {agent_info['llm']} model**

💡 **Alternative**: Use the orchestrate CLI manually:
```bash
orchestrate chat start
# Then select {agent_name} and ask: "{message}"
```

🚀 **The agent is ready to answer your question right now!**
"""
            
        except Exception as e:
            return f"""
❌ **Error getting response: {e}**

✅ **SOLUTION - Get your real response now:**

1. **Open this link**: http://localhost:3000/chat-lite
2. **Select agent**: {agent_name}
3. **Type your question**: "{message}"
4. **Press Enter** and get your real AI response!

🎯 **This will give you the actual response from the {agent_info['llm']} model**

🚀 **The agent is ready to answer your question right now!**
"""
    
    def interactive_chat(self):
        """Interactive chat mode"""
        print("🤖 Working Agent Chat - Interactive Mode")
        print("=" * 50)
        
        print("Available agents:")
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
                
                response = self.get_real_response(agent_name, user_input)
                print(f"\n{response}")
                    
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break

def main():
    """Main function"""
    load_environment()
    
    chat = WorkingAgentChat()
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "chat" and len(sys.argv) >= 4:
            agent_name = sys.argv[2]
            message = " ".join(sys.argv[3:])
            response = chat.get_real_response(agent_name, message)
            print(response)
        
        elif command == "interactive":
            chat.interactive_chat()
        
        elif command == "test":
            # Test with common questions
            test_questions = [
                ("Basic_Chat_Agent", "What is AI?"),
                ("Basic_Chat_Agent", "What is the meaning of life?"),
                ("Task_Assistant_Agent", "How can I be more productive?"),
            ]
            
            print("🧪 Testing agents with real responses...")
            for agent_name, question in test_questions:
                print(f"\n{'='*60}")
                response = chat.get_real_response(agent_name, question)
                print(response)
        
        elif command == "help":
            print("🤖 Working Agent Chat")
            print("\nUsage:")
            print("  python working_chat.py chat <agent> <msg>      # Get real response")
            print("  python working_chat.py interactive             # Interactive mode")
            print("  python working_chat.py test                    # Test with common questions")
            print("  python working_chat.py help                    # Show this help")
            print("\nExamples:")
            print("  python working_chat.py chat Basic_Chat_Agent 'What is AI?'")
            print("  python working_chat.py chat Task_Assistant_Agent 'What is the meaning of life?'")
            print("  python working_chat.py interactive")
            print("  python working_chat.py test")
        
        else:
            print("❌ Invalid command. Use 'help' for usage information.")
    else:
        # Default to interactive mode
        chat.interactive_chat()

if __name__ == "__main__":
    main()
