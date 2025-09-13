#!/usr/bin/env python3
"""
Real Chat Script - Actually gets responses from agents
This script will get real responses for questions like "What is AI?" or "What is the meaning of life?"
"""

import os
import sys
import json
import requests
import time
import subprocess
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

class RealAgentChat:
    """Real agent chat that gets actual responses"""
    
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.api_base = "http://localhost:4321"
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
    
    def check_server_status(self) -> bool:
        """Check if the chat server is running"""
        try:
            response = requests.get(f"{self.base_url}/chat-lite", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def get_real_response(self, agent_name: str, message: str) -> str:
        """Get a real response from an agent"""
        agent_info = self.agents_cache.get(agent_name)
        if not agent_info:
            return f"❌ Agent '{agent_name}' not found"
        
        print(f"🤖 Chatting with: {agent_name}")
        print(f"💬 Your question: {message}")
        print(f"🧠 Using LLM: {agent_info['llm']}")
        print("⏳ Getting response...")
        
        # Try multiple approaches to get a real response
        
        # Approach 1: Try direct API call
        try:
            response = self._try_api_chat(agent_info['id'], message)
            if response:
                return f"✅ **REAL RESPONSE FROM {agent_name}:**\n\n{response}"
        except Exception as e:
            print(f"API approach failed: {e}")
        
        # Approach 2: Try orchestrate CLI with input
        try:
            response = self._try_cli_chat(agent_name, message)
            if response:
                return f"✅ **REAL RESPONSE FROM {agent_name}:**\n\n{response}"
        except Exception as e:
            print(f"CLI approach failed: {e}")
        
        # Approach 3: Use web automation
        try:
            response = self._try_web_automation(agent_name, message)
            if response:
                return f"✅ **REAL RESPONSE FROM {agent_name}:**\n\n{response}"
        except Exception as e:
            print(f"Web automation failed: {e}")
        
        # If all approaches fail, provide the best available solution
        return f"""
❌ **Could not get direct response from {agent_name}**

🔧 **The issue**: IBM WatsonX Orchestrate Developer Edition doesn't expose direct API endpoints for programmatic chat.

✅ **SOLUTION - Get your real response now:**

1. **Open this link**: {self.base_url}/chat-lite
2. **Select agent**: {agent_name}
3. **Type your question**: "{message}"
4. **Press Enter** and get your real AI response!

🎯 **This will give you the actual response from the {agent_info['llm']} model**

💡 **Alternative**: Use the orchestrate CLI:
```bash
orchestrate chat start
# Then select {agent_name} and ask: "{message}"
```

🚀 **The agent is ready to answer your question right now!**
"""
    
    def _try_api_chat(self, agent_id: str, message: str) -> Optional[str]:
        """Try to get response via API"""
        try:
            # Try different possible API endpoints
            endpoints = [
                f"{self.api_base}/api/v1/chat/completions",
                f"{self.api_base}/api/chat",
                f"{self.api_base}/chat",
                f"{self.api_base}/agents/{agent_id}/chat",
                f"{self.api_base}/agents/{agent_id}/completions"
            ]
            
            for endpoint in endpoints:
                try:
                    payload = {
                        "model": "watsonx/meta-llama/llama-3-2-90b-vision-instruct",
                        "messages": [
                            {"role": "user", "content": message}
                        ],
                        "agent_id": agent_id
                    }
                    
                    response = requests.post(endpoint, json=payload, timeout=30)
                    if response.status_code == 200:
                        data = response.json()
                        if 'choices' in data and len(data['choices']) > 0:
                            return data['choices'][0]['message']['content']
                except:
                    continue
        except:
            pass
        return None
    
    def _try_cli_chat(self, agent_name: str, message: str) -> Optional[str]:
        """Try to get response via CLI"""
        try:
            # Create a temporary input file
            input_file = current_dir / "temp_input.txt"
            with open(input_file, 'w') as f:
                f.write(f"select {agent_name}\n")
                f.write(f"{message}\n")
                f.write("exit\n")
            
            # Try to run orchestrate chat with input
            result = subprocess.run(
                ['orchestrate', 'chat', 'start'],
                input=f"select {agent_name}\n{message}\n",
                text=True,
                capture_output=True,
                timeout=60,
                cwd=current_dir
            )
            
            # Clean up
            if input_file.exists():
                input_file.unlink()
            
            if result.returncode == 0 and result.stdout:
                # Parse the output to extract the response
                lines = result.stdout.split('\n')
                for i, line in enumerate(lines):
                    if agent_name.lower() in line.lower() and 'response' in line.lower():
                        # Look for the actual response in subsequent lines
                        for j in range(i+1, min(i+10, len(lines))):
                            if lines[j].strip() and not lines[j].startswith('>'):
                                return lines[j].strip()
        except:
            pass
        return None
    
    def _try_web_automation(self, agent_name: str, message: str) -> Optional[str]:
        """Try to get response via web automation"""
        try:
            from selenium import webdriver
            from selenium.webdriver.common.by import By
            from selenium.webdriver.support.ui import WebDriverWait
            from selenium.webdriver.support import expected_conditions as EC
            from selenium.webdriver.chrome.options import Options
            
            # Set up Chrome options
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            
            driver = webdriver.Chrome(options=chrome_options)
            
            try:
                # Navigate to chat interface
                driver.get(f"{self.base_url}/chat-lite")
                
                # Wait for page to load
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.TAG_NAME, "body"))
                )
                
                # Select agent (this would need to be adapted based on actual UI)
                # This is a simplified example - the actual implementation would need
                # to be adapted to the specific UI elements
                
                # Type message
                message_input = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='text'], textarea"))
                )
                message_input.send_keys(message)
                
                # Submit
                submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit'], button")
                submit_button.click()
                
                # Wait for response
                WebDriverWait(driver, 30).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".response, .message, .output"))
                )
                
                # Get response
                response_element = driver.find_element(By.CSS_SELECTOR, ".response, .message, .output")
                response = response_element.text
                
                return response
                
            finally:
                driver.quit()
                
        except ImportError:
            print("Selenium not available for web automation")
        except Exception as e:
            print(f"Web automation error: {e}")
        return None
    
    def interactive_chat(self):
        """Interactive chat mode"""
        print("🤖 Real Agent Chat - Interactive Mode")
        print("=" * 50)
        
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
                
                response = self.get_real_response(agent_name, user_input)
                print(f"\n{response}")
                    
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break

def main():
    """Main function"""
    load_environment()
    
    chat = RealAgentChat()
    
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
            print("🤖 Real Agent Chat")
            print("\nUsage:")
            print("  python real_chat.py chat <agent> <msg>      # Get real response")
            print("  python real_chat.py interactive             # Interactive mode")
            print("  python real_chat.py test                    # Test with common questions")
            print("  python real_chat.py help                    # Show this help")
            print("\nExamples:")
            print("  python real_chat.py chat Basic_Chat_Agent 'What is AI?'")
            print("  python real_chat.py chat Task_Assistant_Agent 'What is the meaning of life?'")
            print("  python real_chat.py interactive")
            print("  python real_chat.py test")
        
        else:
            print("❌ Invalid command. Use 'help' for usage information.")
    else:
        # Default to interactive mode
        chat.interactive_chat()

if __name__ == "__main__":
    main()
