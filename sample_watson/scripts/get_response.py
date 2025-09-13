#!/usr/bin/env python3
"""
Get Response Script - Opens web interface and provides clear instructions
This is the most reliable way to get real responses from agents
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

def get_response(agent_name: str, question: str):
    """Get response by opening web interface with clear instructions"""
    
    print("🤖 GETTING REAL RESPONSE FROM AGENT")
    print("=" * 50)
    print(f"🎯 Agent: {agent_name}")
    print(f"💬 Question: {question}")
    print()
    
    # Open the web interface
    url = "http://localhost:3000/chat-lite"
    print(f"🌐 Opening web interface: {url}")
    webbrowser.open(url)
    
    print()
    print("📋 **STEP-BY-STEP INSTRUCTIONS:**")
    print("=" * 50)
    print("1. ✅ The web interface should now be open in your browser")
    print("2. 🔍 Look for the agent dropdown/selector")
    print(f"3. 📝 Select: {agent_name}")
    print(f"4. ⌨️  Type your question: {question}")
    print("5. ⏎  Press Enter to send")
    print("6. ⏳ Wait for the AI response")
    print()
    
    print("🎯 **EXPECTED RESPONSE:**")
    print("=" * 50)
    if "ai" in question.lower():
        print("The agent should provide:")
        print("• A comprehensive explanation of AI")
        print("• Examples of AI applications")
        print("• Current trends and developments")
        print("• How AI works and its benefits")
    elif "meaning" in question.lower() and "life" in question.lower():
        print("The agent should provide:")
        print("• Philosophical perspectives on life's meaning")
        print("• Different cultural and religious viewpoints")
        print("• Personal reflection and guidance")
        print("• Thoughtful, respectful discussion")
    else:
        print("The agent should provide:")
        print("• A helpful and informative response")
        print("• Relevant examples and context")
        print("• Clear and engaging explanation")
        print("• Additional related information")
    
    print()
    print("🚀 **READY TO CHAT!**")
    print("=" * 50)
    print(f"🌐 Web interface: {url}")
    print(f"🤖 Agent: {agent_name}")
    print(f"💬 Question: {question}")
    print()
    print("The agent will use advanced LLMs to provide a real, intelligent response!")
    print("You can continue the conversation by asking follow-up questions.")

def main():
    """Main function"""
    load_environment()
    
    if len(sys.argv) >= 4:
        agent_name = sys.argv[2]
        question = " ".join(sys.argv[3:])
        get_response(agent_name, question)
    else:
        print("🤖 Get Response Script")
        print("\nUsage:")
        print("  python get_response.py chat <agent> <question>")
        print("\nExamples:")
        print("  python get_response.py chat Basic_Chat_Agent 'What is AI?'")
        print("  python get_response.py chat Task_Assistant_Agent 'What is the meaning of life?'")
        print("  python get_response.py chat Basic_Chat_Agent 'How does machine learning work?'")
        print("\nAvailable agents:")
        print("  - Basic_Chat_Agent (for general questions)")
        print("  - Task_Assistant_Agent (for productivity questions)")
        print("  - simple_agent (for basic tasks)")
        print("  - greeter (for greetings)")

if __name__ == "__main__":
    main()
