# Simple IBM watsonx Orchestrate Setup (API Key Only)

This is a simplified setup that works with just your watsonx Orchestrate API key - no complex configuration needed!

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
# Install IBM watsonx Orchestrate ADK
pip install --upgrade ibm-watsonx-orchestrate

# Install sample project dependencies
pip install -r requirements.txt
```

### Step 2: Set Your API Key
```bash
# Option A: Set environment variable
export WATSON_API_KEY=your-watsonx-orchestrate-api-key

# Option B: Create .env file
echo "WATSON_API_KEY=your-watsonx-orchestrate-api-key" > .env
```

### Step 3: Run Simple Setup
```bash
# Run the simple setup script
python simple_setup.py
```

That's it! The script will guide you through the rest.

## What You Need

### Required
- **API Key**: Your watsonx Orchestrate API key
- **Python**: 3.11 or later
- **Docker**: For running the orchestrate server

### Optional
- **Service URL**: If you have a specific instance
- **Project ID**: If using IBM Cloud

## Setup Options

The simple setup script gives you 3 options:

### Option 1: Test Tools Only
- Tests all tools locally
- No server needed
- Perfect for learning how tools work
- Use tools directly in your Python code

### Option 2: Full Setup
- Starts orchestrate server
- Deploys all tools and agents
- Gives you web UI access
- Ready for agent interactions

### Option 3: Server Only
- Starts orchestrate server
- Deploy agents later
- Good for step-by-step setup

## Usage Examples

### Test Tools Directly
```python
# Test calculator
from tools.calculator import calculator_tool
result = calculator_tool("add", [1, 2, 3, 4])
print(f"Sum: {result['result']}")  # Output: Sum: 10

# Test text processor
from tools.text_processor import text_processor_tool
result = text_processor_tool("Hello world!", "count_words")
print(f"Words: {result['result']['word_count']}")  # Output: Words: 2

# Test data processor
from tools.data_processor import data_processor_tool
data = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
result = data_processor_tool(data, "analyze")
print(f"Type: {result['result']['type']}")  # Output: Type: list
```

### Use Web Interface
1. Start server: `python simple_setup.py` (choose option 2)
2. Open browser: http://localhost:4321
3. Navigate to "Agents"
4. Select an agent (e.g., "Basic_Chat_Agent")
5. Start chatting!

### Use API
```python
import requests

# Chat with an agent
response = requests.post('http://localhost:4321/api/v1/agents/basic_chat_agent/chat', 
                        json={
                            "message": "Calculate 5 + 3",
                            "context": {}
                        })

print(response.json())
```

## Available Agents

### Basic Chat Agent
- **Purpose**: Simple conversations and assistance
- **Tools**: Calculator, Text Processor
- **Try**: "Calculate 2 + 2" or "Count words in this text"

### Task Assistant Agent
- **Purpose**: Task management and planning
- **Tools**: Calculator, Text Processor, Data Processor
- **Try**: "Help me plan a project" or "Analyze this data"

## Available Tools

### Calculator Tool
```python
# Basic operations
calculator_tool("add", [1, 2, 3])        # Addition
calculator_tool("multiply", [2, 3, 4])   # Multiplication
calculator_tool("divide", [10, 2])       # Division
calculator_tool("power", [2, 3])         # Exponentiation

# Advanced operations
calculator_tool("sqrt", [16])            # Square root
calculator_tool("average", [1, 2, 3, 4]) # Average
calculator_tool("factorial", [5])        # Factorial
```

### Text Processor Tool
```python
# Counting
text_processor_tool("Hello world!", "count_words")     # Word count
text_processor_tool("Hello world!", "count_chars")     # Character count

# Extraction
text_processor_tool("Email me at john@example.com", "extract_emails")  # Extract emails
text_processor_tool("Call (555) 123-4567", "extract_phones")          # Extract phones

# Analysis
text_processor_tool("I love this!", "sentiment_analysis")  # Sentiment
text_processor_tool("Long text here...", "summarize")      # Summarize
```

### Data Processor Tool
```python
# Analysis
data = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
data_processor_tool(data, "analyze")                    # Analyze structure

# Filtering
data_processor_tool(data, "filter", filter_key="age", filter_value=30)  # Filter data

# Sorting
data_processor_tool(data, "sort", sort_key="age")       # Sort by age

# Aggregation
data_processor_tool(data, "aggregate", group_key="age", agg_function="count")  # Group and count
```

## Troubleshooting

### "API key not found"
```bash
# Make sure your API key is set
echo $WATSON_API_KEY

# Or check your .env file
cat .env
```

### "Orchestrate CLI not found"
```bash
# Reinstall the ADK
pip install --upgrade ibm-watsonx-orchestrate

# Verify installation
orchestrate --version
```

### "Server won't start"
```bash
# Check if Docker is running
docker --version
docker ps

# Try starting server manually
orchestrate server start -e .env
```

### "Tools not working"
```bash
# Test tools directly
python -c "from tools.calculator import calculator_tool; print(calculator_tool('add', [1,2]))"

# Check for import errors
python -c "import tools.calculator"
```

## Commands Reference

```bash
# Simple setup
python simple_setup.py

# Test tools only
python simple_setup.py --test

# Deploy agents only
python simple_setup.py --deploy

# Start server manually
orchestrate server start -e .env

# Stop server
orchestrate server stop

# List agents
orchestrate agents list

# List tools
orchestrate tools list

# Chat with agent
orchestrate agents chat basic_chat_agent
```

## Next Steps

1. **Learn**: Try all the tools with different inputs
2. **Experiment**: Create your own agent YAML files
3. **Build**: Add your own custom tools
4. **Integrate**: Use the API in your applications

## Need Help?

- Check the main README.md for detailed documentation
- Run `python test_sample.py` to test everything
- Use the web UI at http://localhost:4321 for interactive testing

This simple setup gets you started quickly with just your API key!
