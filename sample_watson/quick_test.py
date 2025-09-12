#!/usr/bin/env python3
"""
Quick test script for IBM watsonx Orchestrate tools
Tests all tools without needing the orchestrate server
"""

import sys
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def test_calculator():
    """Test calculator tool"""
    print("🧮 Testing Calculator Tool")
    print("-" * 30)
    
    from tools.calculator import calculator_tool
    
    tests = [
        ("add", [1, 2, 3, 4], "Addition"),
        ("multiply", [2, 3, 4], "Multiplication"),
        ("divide", [10, 2], "Division"),
        ("power", [2, 3], "Power"),
        ("sqrt", [16], "Square root"),
        ("average", [1, 2, 3, 4, 5], "Average"),
        ("factorial", [5], "Factorial"),
    ]
    
    for operation, numbers, description in tests:
        result = calculator_tool(operation, numbers)
        if result.get('success', False):
            print(f"✅ {description}: {operation}({numbers}) = {result['result']}")
        else:
            print(f"❌ {description} failed: {result.get('error')}")
    
    print()

def test_text_processor():
    """Test text processor tool"""
    print("📝 Testing Text Processor Tool")
    print("-" * 30)
    
    from tools.text_processor import text_processor_tool
    
    sample_text = "Hello world! This is a test. Email me at john@example.com or call (555) 123-4567. Visit https://example.com"
    
    tests = [
        ("count_words", "Word counting"),
        ("count_chars", "Character counting"),
        ("extract_emails", "Email extraction"),
        ("extract_phones", "Phone extraction"),
        ("extract_urls", "URL extraction"),
        ("to_uppercase", "Text transformation"),
        ("sentiment_analysis", "Sentiment analysis"),
    ]
    
    for operation, description in tests:
        result = text_processor_tool(sample_text, operation)
        if result.get('success', False):
            print(f"✅ {description}: {result['result']}")
        else:
            print(f"❌ {description} failed: {result.get('error')}")
    
    print()

def test_data_processor():
    """Test data processor tool"""
    print("📊 Testing Data Processor Tool")
    print("-" * 30)
    
    from tools.data_processor import data_processor_tool
    
    sample_data = [
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Jane", "age": 25, "city": "Los Angeles"},
        {"name": "Bob", "age": 35, "city": "New York"},
    ]
    
    tests = [
        ("analyze", "Data analysis"),
        ("filter", "Data filtering", {"filter_key": "city", "filter_value": "New York"}),
        ("sort", "Data sorting", {"sort_key": "age"}),
        ("aggregate", "Data aggregation", {"group_key": "city", "agg_function": "count"}),
    ]
    
    for test in tests:
        operation = test[0]
        description = test[1]
        kwargs = test[2] if len(test) > 2 else {}
        
        result = data_processor_tool(sample_data, operation, **kwargs)
        if result.get('success', False):
            print(f"✅ {description}: {type(result['result']).__name__}")
            # Show preview for complex results
            if isinstance(result['result'], (dict, list)) and len(str(result['result'])) > 50:
                print(f"   Preview: {str(result['result'])[:50]}...")
        else:
            print(f"❌ {description} failed: {result.get('error')}")
    
    print()

def test_configuration():
    """Test configuration"""
    print("⚙️  Testing Configuration")
    print("-" * 30)
    
    from config import config
    
    print(f"Environment Name: {config.environment_name}")
    print(f"Default LLM: {config.default_llm}")
    print(f"Granite Model: {config.granite_model}")
    print(f"Agent Style: {config.agent_style}")
    print(f"Is Configured: {config.is_configured()}")
    
    if config.is_configured():
        env_vars = config.get_environment_vars()
        print(f"Environment Variables: {list(env_vars.keys())}")
    else:
        print("⚠️  No API key configured - set WATSON_API_KEY environment variable")
    
    print()

def show_usage_examples():
    """Show usage examples"""
    print("💡 Usage Examples")
    print("-" * 30)
    
    print("1. Calculator Tool:")
    print("   from tools.calculator import calculator_tool")
    print("   result = calculator_tool('add', [1, 2, 3])")
    print("   print(result['result'])  # Output: 6")
    print()
    
    print("2. Text Processor Tool:")
    print("   from tools.text_processor import text_processor_tool")
    print("   result = text_processor_tool('Hello world!', 'count_words')")
    print("   print(result['result']['word_count'])  # Output: 2")
    print()
    
    print("3. Data Processor Tool:")
    print("   from tools.data_processor import data_processor_tool")
    print("   data = [{'name': 'John', 'age': 30}]")
    print("   result = data_processor_tool(data, 'analyze')")
    print("   print(result['result']['type'])  # Output: list")
    print()

def main():
    """Run all tests"""
    print("🚀 IBM watsonx Orchestrate - Quick Test")
    print("=" * 50)
    print("Testing tools without orchestrate server...")
    print()
    
    try:
        test_configuration()
        test_calculator()
        test_text_processor()
        test_data_processor()
        show_usage_examples()
        
        print("✅ All tests completed!")
        print()
        print("Next steps:")
        print("1. Set your API key: export WATSON_API_KEY=your-api-key")
        print("2. Run: python simple_setup.py")
        print("3. Choose option 2 for full setup with web UI")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
