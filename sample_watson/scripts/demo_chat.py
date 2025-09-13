#!/usr/bin/env python3
"""
Demo Chat Script
Opens the web interface and demonstrates how to ask questions like "What is AI?" or "What is the meaning of life?"
"""

import os
import sys
import webbrowser
import time
from pathlib import Path

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

def check_server_status():
    """Check if the chat server is running"""
    try:
        import requests
        response = requests.get("http://localhost:3000/chat-lite", timeout=5)
        return response.status_code == 200
    except:
        return False

def open_chat_interface():
    """Open the chat interface in the browser"""
    url = "http://localhost:3000/chat-lite"
    print(f"🌐 Opening chat interface: {url}")
    webbrowser.open(url)
    return url

def main():
    """Main function"""
    print("🤖 Agent Chat Demo")
    print("=" * 50)
    
    load_environment()
    
    # Check if server is running
    if not check_server_status():
        print("❌ Chat server is not running!")
        print("\nTo start the chat server:")
        print("1. Run: orchestrate server start")
        print("2. Wait for it to fully start")
        print("3. Then run this script again")
        return
    
    print("✅ Chat server is running!")
    
    # Open the chat interface
    url = open_chat_interface()
    
    print(f"\n🎯 **DEMO INSTRUCTIONS:**")
    print("=" * 50)
    print("The chat interface should now be open in your browser.")
    print("\n📝 **Try these questions:**")
    print("1. Select 'Basic_Chat_Agent' from the dropdown")
    print("2. Ask: 'What is AI?'")
    print("3. Wait for the AI response")
    print("\n📝 **More questions to try:**")
    print("- 'What is the meaning of life?'")
    print("- 'Explain quantum computing'")
    print("- 'How does machine learning work?'")
    print("- 'What are the benefits of meditation?'")
    print("\n📝 **Try different agents:**")
    print("- 'Task_Assistant_Agent' for productivity questions")
    print("- 'Basic_Chat_Agent' for general questions")
    print("- 'simple_agent' for basic tasks")
    
    print(f"\n🌐 **Chat Interface:** {url}")
    print("\n💡 **Tips:**")
    print("- The agents use advanced LLMs (Llama, Granite)")
    print("- They can access tools for calculations and text processing")
    print("- Responses are generated in real-time")
    print("- You can have multi-turn conversations")
    
    print(f"\n🚀 **Ready to chat! The interface is open at:** {url}")

if __name__ == "__main__":
    main()
