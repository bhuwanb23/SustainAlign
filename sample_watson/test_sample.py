#!/usr/bin/env python3
"""
Test script for the IBM WatsonX Orchestrate Sample Project
Tests all tools and demonstrates their capabilities
"""

import sys
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def test_calculator_tool():
    """Test the calculator tool with various operations"""
    print("🧮 Testing Calculator Tool")
    print("=" * 40)
    
    from tools.calculator import calculator_tool
    
    test_cases = [
        {"operation": "add", "numbers": [1, 2, 3, 4]},
        {"operation": "multiply", "numbers": [2, 3, 4]},
        {"operation": "divide", "numbers": [10, 2]},
        {"operation": "power", "numbers": [2, 3]},
        {"operation": "sqrt", "numbers": [16]},
        {"operation": "average", "numbers": [1, 2, 3, 4, 5]},
        {"operation": "median", "numbers": [1, 2, 3, 4, 5, 6]},
        {"operation": "factorial", "numbers": [5]},
        {"operation": "percentage", "numbers": [25, 100]},
    ]
    
    for test in test_cases:
        result = calculator_tool(**test)
        if result.get('success', False):
            print(f"✅ {test['operation']}({test['numbers']}) = {result['result']}")
        else:
            print(f"❌ {test['operation']} failed: {result.get('error')}")
    
    print()

def test_text_processor_tool():
    """Test the text processor tool with various operations"""
    print("📝 Testing Text Processor Tool")
    print("=" * 40)
    
    from tools.text_processor import text_processor_tool
    
    sample_text = """
    Hello! This is a sample text for testing the text processor tool.
    It contains multiple sentences and some punctuation.
    You can reach me at john.doe@example.com or call me at (555) 123-4567.
    Visit our website at https://www.example.com for more information.
    This is a great tool that I really love using!
    """
    
    test_cases = [
        {"text": sample_text, "operation": "count_words"},
        {"text": sample_text, "operation": "count_chars"},
        {"text": sample_text, "operation": "extract_emails"},
        {"text": sample_text, "operation": "extract_phones"},
        {"text": sample_text, "operation": "extract_urls"},
        {"text": sample_text, "operation": "sentiment_analysis"},
        {"text": sample_text, "operation": "summarize"},
        {"text": sample_text, "operation": "find_keywords"},
        {"text": "HELLO WORLD", "operation": "to_lowercase"},
        {"text": "hello world", "operation": "title_case"},
    ]
    
    for test in test_cases:
        result = text_processor_tool(**test)
        if result.get('success', False):
            print(f"✅ {test['operation']}: {result['result']}")
        else:
            print(f"❌ {test['operation']} failed: {result.get('error')}")
    
    print()

def test_data_processor_tool():
    """Test the data processor tool with various operations"""
    print("📊 Testing Data Processor Tool")
    print("=" * 40)
    
    from tools.data_processor import data_processor_tool
    
    sample_data = [
        {"name": "John", "age": 30, "city": "New York", "salary": 50000},
        {"name": "Jane", "age": 25, "city": "Los Angeles", "salary": 45000},
        {"name": "Bob", "age": 35, "city": "New York", "salary": 60000},
        {"name": "Alice", "age": 28, "city": "Chicago", "salary": 55000},
        {"name": "Charlie", "age": 30, "city": "New York", "salary": 52000},
    ]
    
    numeric_data = [1, 2, 3, 4, 5, 2, 3, 1, 6, 4, 2]
    
    test_cases = [
        {"data": sample_data, "operation": "analyze"},
        {"data": sample_data, "operation": "filter", "filter_key": "city", "filter_value": "New York"},
        {"data": sample_data, "operation": "sort", "sort_key": "age"},
        {"data": sample_data, "operation": "aggregate", "group_key": "city", "agg_function": "count"},
        {"data": sample_data, "operation": "aggregate", "group_key": "city", "agg_function": "avg"},
        {"data": numeric_data, "operation": "statistics"},
        {"data": numeric_data, "operation": "find_duplicates"},
        {"data": sample_data, "operation": "transform", "transform_function": "add_id"},
    ]
    
    for test in test_cases:
        result = data_processor_tool(**test)
        if result.get('success', False):
            print(f"✅ {test['operation']}: {type(result['result']).__name__}")
            # Show a preview of the result for complex data
            if isinstance(result['result'], (dict, list)) and len(str(result['result'])) > 100:
                print(f"   Preview: {str(result['result'])[:100]}...")
            else:
                print(f"   Result: {result['result']}")
        else:
            print(f"❌ {test['operation']} failed: {result.get('error')}")
    
    print()

def test_configuration():
    """Test the configuration system"""
    print("⚙️  Testing Configuration")
    print("=" * 40)
    
    from config import config
    
    print(f"Environment Name: {config.environment_name}")
    print(f"Environment Type: {config.env_type}")
    print(f"Default LLM: {config.default_llm}")
    print(f"Granite Model: {config.granite_model}")
    print(f"Agent Style: {config.agent_style}")
    print(f"Is Configured: {config.is_configured()}")
    
    if config.is_configured():
        env_vars = config.get_environment_vars()
        print(f"Environment Variables: {list(env_vars.keys())}")
    else:
        print("⚠️  Configuration is incomplete - check your .env file")
    
    print()

def demonstrate_agent_capabilities():
    """Demonstrate what the agents can do"""
    print("🤖 Agent Capabilities")
    print("=" * 40)
    
    from config import config
    
    print("Available Agents:")
    for agent_type, agent_config in config.agent_configs.items():
        print(f"  - {agent_config['name']}: {agent_config['description']}")
        print(f"    Model: {agent_config['llm']}")
        print(f"    Style: {agent_config['style']}")
    
    print("\nAvailable Tools:")
    for tool_type, tool_config in config.tool_configs.items():
        print(f"  - {tool_config['name']}: {tool_config['description']}")
    
    print()

def main():
    """Run all tests"""
    print("🚀 IBM WatsonX Orchestrate Sample Project - Test Suite")
    print("=" * 60)
    print()
    
    try:
        test_configuration()
        test_calculator_tool()
        test_text_processor_tool()
        test_data_processor_tool()
        demonstrate_agent_capabilities()
        
        print("✅ All tests completed successfully!")
        print("\nNext steps:")
        print("1. Copy env_example.txt to .env and add your credentials")
        print("2. Run: python setup.py --all")
        print("3. Start the orchestrate server: orchestrate server start -e .env")
        print("4. Access the web UI at: http://localhost:4321")
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
