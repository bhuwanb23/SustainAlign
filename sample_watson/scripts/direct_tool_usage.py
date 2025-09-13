#!/usr/bin/env python3
"""
Direct Tool Usage Example
Shows how to use agent tools directly in your code for programmatic access
"""

import os
import sys
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

def demo_calculator_tool():
    """Demonstrate calculator tool usage"""
    print("🧮 Calculator Tool Demo")
    print("-" * 30)
    
    try:
        from tools.calculator import calculator_tool
        
        # Test various calculations
        tests = [
            ("add", [25, 37], "Addition"),
            ("multiply", [6, 7], "Multiplication"),
            ("divide", [100, 4], "Division"),
            ("power", [2, 8], "Power"),
            ("sqrt", [144], "Square root"),
            ("average", [10, 20, 30, 40, 50], "Average"),
            ("percentage", [25, 100], "Percentage")
        ]
        
        for operation, numbers, description in tests:
            print(f"\n📊 {description}: {operation}({numbers})")
            result = calculator_tool(operation, numbers)
            
            if result.get('success'):
                print(f"✅ Result: {result['result']}")
            else:
                print(f"❌ Error: {result.get('error', 'Unknown error')}")
                
    except ImportError as e:
        print(f"❌ Could not import calculator tool: {e}")

def demo_text_processor_tool():
    """Demonstrate text processor tool usage"""
    print("\n📝 Text Processor Tool Demo")
    print("-" * 30)
    
    try:
        from tools.text_processor import text_processor_tool
        
        text = "The quick brown fox jumps over the lazy dog. This is a sample text for analysis."
        
        # Test various text operations
        tests = [
            ("count_words", text, "Word count"),
            ("count_chars", text, "Character count"),
            ("to_uppercase", text, "Uppercase conversion"),
            ("word_frequency", text, "Word frequency"),
            ("sentiment_analysis", text, "Sentiment analysis")
        ]
        
        for operation, input_text, description in tests:
            print(f"\n📊 {description}: {operation}")
            result = text_processor_tool(input_text, operation)
            
            if result.get('success'):
                print(f"✅ Result: {result['result']}")
            else:
                print(f"❌ Error: {result.get('error', 'Unknown error')}")
                
    except ImportError as e:
        print(f"❌ Could not import text processor tool: {e}")

def demo_data_processor_tool():
    """Demonstrate data processor tool usage"""
    print("\n📊 Data Processor Tool Demo")
    print("-" * 30)
    
    try:
        from tools.data_processor import data_processor_tool
        
        # Test data
        test_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        
        # Test various data operations
        tests = [
            ("statistics", test_data, "Statistics"),
            ("analyze", test_data, "Analysis"),
            ("sort", test_data, "Sort"),
            ("aggregate", test_data, "Aggregate")
        ]
        
        for operation, data, description in tests:
            print(f"\n📊 {description}: {operation}({data})")
            try:
                result = data_processor_tool(data, operation)
                
                if result.get('success'):
                    print(f"✅ Result: {result['result']}")
                else:
                    print(f"❌ Error: {result.get('error', 'Unknown error')}")
            except Exception as e:
                print(f"❌ Exception: {e}")
                
    except ImportError as e:
        print(f"❌ Could not import data processor tool: {e}")
    except Exception as e:
        print(f"❌ Unexpected error in data processor demo: {e}")
        import traceback
        traceback.print_exc()

def demo_agent_simulation():
    """Simulate agent behavior using tools directly"""
    print("\n🤖 Agent Simulation Demo")
    print("-" * 30)
    
    try:
        from tools.calculator import calculator_tool
        from tools.text_processor import text_processor_tool
        from tools.data_processor import data_processor_tool
        
        # Simulate agent responses to different queries
        queries = [
            "What is 25 + 37?",
            "Count the words in: Hello world this is a test",
            "What is the sum of [1, 2, 3, 4, 5]?",
            "What is 15% of 200?",
            "Find the longest word in: The quick brown fox jumps over the lazy dog"
        ]
        
        for query in queries:
            print(f"\n👤 User: {query}")
            
            # Simulate agent logic
            if any(word in query.lower() for word in ['+', '-', '*', '/', 'percent', '%', 'calculate']):
                # Use calculator tool
                if '+' in query:
                    numbers = [25, 37]  # Extract from query
                    result = calculator_tool("add", numbers)
                    if result.get('success'):
                        print(f"🤖 Agent: The result is {result['result']}")
                elif '%' in query:
                    result = calculator_tool("percentage", [15, 200])
                    if result.get('success'):
                        print(f"🤖 Agent: 15% of 200 is {result['result']}")
                        
            elif 'count' in query.lower() and 'word' in query.lower():
                # Use text processor tool
                text = "Hello world this is a test"
                result = text_processor_tool(text, "count_words")
                if result.get('success'):
                    print(f"🤖 Agent: The text contains {result['result']['word_count']} words")
                    
            elif 'sum' in query.lower():
                # Use calculator tool for sum
                data = [1, 2, 3, 4, 5]
                result = calculator_tool("add", data)
                if result.get('success'):
                    print(f"🤖 Agent: The sum is {result['result']}")
                    
            elif 'longest word' in query.lower():
                # Use text processor tool
                text = "The quick brown fox jumps over the lazy dog"
                result = text_processor_tool(text, "word_frequency")
                if result.get('success'):
                    # Find the longest word from frequency data
                    words = result['result'].keys()
                    longest_word = max(words, key=len)
                    print(f"🤖 Agent: The longest word is '{longest_word}'")
                    
    except ImportError as e:
        print(f"❌ Could not import tools: {e}")

def main():
    """Main function"""
    print("🛠️ Direct Tool Usage Demo")
    print("=" * 50)
    print("This demonstrates how to use agent tools directly in your code")
    print("for programmatic access without needing the full agent interface.\n")
    
    load_environment()
    
    try:
        demo_calculator_tool()
        demo_text_processor_tool()
        demo_data_processor_tool()
        demo_agent_simulation()
        
        print("\n🎉 Demo completed!")
        print("\n💡 Key Takeaways:")
        print("   - You can use agent tools directly in your code")
        print("   - This provides programmatic access to agent capabilities")
        print("   - Tools return structured results that you can process")
        print("   - This is the most reliable way to integrate agent functionality")
        print("\n🚀 Next Steps:")
        print("   - Import the tools you need in your applications")
        print("   - Handle errors gracefully")
        print("   - Combine multiple tools for complex operations")
        print("   - Use the web interface for full agent conversations")
        
    except Exception as e:
        print(f"❌ Error during demo: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
