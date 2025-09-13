# IBM WatsonX Orchestrate Sample Project

This is a sample project demonstrating how to create and deploy IBM watsonx Orchestrate agents and tools. It's designed to be independent of the main SustainAlign project and serves as a learning resource.

## Overview

This sample project includes:

- **3 Sample Agents**: Basic Chat Agent, Task Assistant Agent, and Data Analyzer Agent
- **3 Sample Tools**: Calculator, Text Processor, and Data Processor
- **Complete Setup Scripts**: Automated deployment and testing
- **Environment Configuration**: Ready-to-use configuration templates
- **Working Chat Interface**: Live web interface at http://localhost:3000/chat-lite

## ✅ Implementation Status

### Completed Tasks
- [x] **IBM WatsonX Orchestrate ADK Installation**: Successfully installed and configured
- [x] **Docker Environment Setup**: Configured Docker Desktop for local development
- [x] **Environment Variables Configuration**: Set up proper credentials and configuration
- [x] **Custom Tools Development**: Created calculator, text processor, and data processor tools
- [x] **Agent Configuration**: Set up basic chat agent with IBM Granite LLM
- [x] **Chat Interface Deployment**: Successfully launched web-based chat interface
- [x] **Error Resolution**: Fixed Unicode encoding issues and environment variable problems
- [x] **Integration Testing**: Verified all components work together
- [x] **Security Improvements**: Removed all hardcoded API keys and instances
- [x] **Environment-Based Configuration**: All scripts now read from environment variables

### Current Status
- **Chat Interface**: ✅ Running at http://localhost:3000/chat-lite
- **Server**: ✅ WatsonX Orchestrate Developer Edition running
- **Database**: ✅ PostgreSQL container running
- **Tools**: ✅ Custom tools created and ready for deployment
- **Agents**: ✅ AskOrchestrate agent available with IBM Granite LLM

## Prerequisites

### Hardware Requirements
- **RAM**: Minimum 16GB (recommended 32GB)
- **CPU**: 8 cores minimum
- **Storage**: Sufficient space for Docker images

### Software Requirements
- **Docker**: Docker Desktop or Rancher Desktop
- **Python**: 3.11 or later
- **IBM Account**: Access to watsonx Orchestrate or watsonx.ai

### Access Requirements
You need access to at least one of:
- watsonx Orchestrate service
- watsonx.ai service
- IBM Entitled Registry (for container images)

## 🚀 Implementation Journey

### Phase 1: Initial Setup and Installation
1. **IBM WatsonX Orchestrate ADK Installation**
   ```bash
   pip install --upgrade ibm-watsonx-orchestrate
   pip install PyYAML Flask-Login
   ```

2. **Docker Environment Setup**
   - Configured Docker Desktop for Windows
   - Set up proper resource allocation (16GB+ RAM recommended)
   - Verified Docker connectivity to IBM registry

3. **Environment Configuration**
   - Created `.env` file with proper credentials
   - Set up trial API key for testing
   - Configured environment variables for local development

### Phase 2: Development and Testing
1. **Custom Tools Development**
   - Created `all_tools.py` with combined tool functions
   - Developed calculator, text processor, and data processor tools
   - Implemented proper error handling and validation

2. **Agent Configuration**
   - Set up AskOrchestrate agent with IBM Granite LLM
   - Configured agent to use local tools
   - Tested agent responses and capabilities

3. **Error Resolution**
   - Fixed Unicode encoding issues with .env files
   - Resolved environment variable configuration problems
   - Troubleshot Docker connectivity issues

### Phase 3: Deployment and Launch
1. **Server Launch**
   ```bash
   orchestrate server start
   ```

2. **Chat Interface Deployment**
   ```bash
   orchestrate chat start
   ```

3. **Verification and Testing**
   - Confirmed chat interface accessible at http://localhost:3000/chat-lite
   - Tested agent responses and tool functionality
   - Verified all components working together

## Quick Start

### 1. Install Dependencies

```bash
# Install IBM watsonx Orchestrate ADK
pip install --upgrade ibm-watsonx-orchestrate

# Install sample project dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

**Option A: Using Environment Variables (Recommended)**
```bash
# Set your API key
export WATSON_API_KEY=your-watsonx-orchestrate-api-key

# Set your instance URL
export WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com

# For Windows PowerShell:
$env:WATSON_API_KEY="your-watsonx-orchestrate-api-key"
$env:WO_INSTANCE="https://api.ap-south-1.dl.watson-orchestrate.ibm.com"
```

**Option B: Using .env File**
```bash
# Copy the example environment file
cp env_example.txt .env

# Edit .env with your actual credentials
# Required: WATSON_API_KEY and WO_INSTANCE
```

**Option C: Automated Setup**
```bash
# Run the environment setup script
python setup_environment.py
```

### 3. Run Complete Setup

```bash
# Set up environment
python scripts/setup_environment.py

# Import all tools and agents
python scripts/import_all_tools.py

# Start chat interface
python scripts/chat.py
```

This will:
- Check prerequisites
- Set up the environment
- Deploy all tools and agents
- Start the chat interface

## Manual Setup Steps

If you prefer to run steps individually:

### 1. Environment Setup

```bash
python scripts/setup_environment.py
```

### 2. Deploy Tools and Agents

```bash
python scripts/import_all_tools.py
```

### 3. Start Chat Interface

```bash
python scripts/chat.py
```

### 4. List Deployed Items

```bash
orchestrate tools list
orchestrate agents list
```

## Project Structure

```
sample_watson/
├── agents/                          # Agent YAML specifications
│   ├── basic_chat_agent.yaml       # Simple chat agent
│   └── task_assistant_agent.yaml   # Task management agent
├── tools/                          # Tool implementations and specs
│   ├── calculator.py               # Mathematical calculations
│   ├── calculator_tool.yaml        # Calculator tool specification
│   ├── text_processor.py           # Text analysis and processing
│   ├── text_processor_tool.yaml    # Text processor specification
│   ├── data_processor.py           # Data analysis and processing
│   └── data_processor_tool.yaml    # Data processor specification
├── scripts/                        # Utility scripts
│   ├── chat.py                     # Chat interface launcher
│   ├── setup_environment.py        # Environment setup script
│   ├── simple_setup.py             # Simple setup script
│   └── import_all_tools.py         # Import tools and agents
├── docs/                           # Documentation
│   ├── AGENT_GUIDE.md              # Comprehensive agent guide
│   └── SECURITY_IMPROVEMENTS.md    # Security improvements
├── hello-world/                    # Hello World example
│   ├── greeter.yaml                # Sample agent
│   ├── setup_hello_world.py        # Setup script
│   └── tools/                      # Sample tools
├── config.py                       # Configuration management
├── requirements.txt                # Python dependencies
├── env_example.txt                 # Environment variables template
└── README.md                       # This file
```

## Sample Agents

### 1. Basic Chat Agent
- **Purpose**: Simple conversations and basic assistance
- **Tools**: Calculator, Text Processor
- **Model**: watsonx/meta-llama/llama-3-2-90b-vision-instruct
- **Style**: Default

### 2. Task Assistant Agent
- **Purpose**: Task management and planning
- **Tools**: Calculator, Text Processor, Data Processor
- **Model**: watsonx/ibm/granite-3.0-20b-instruct
- **Style**: ReAct (for complex reasoning)

## Sample Tools

### 1. Calculator Tool
Performs mathematical operations:
- **Arithmetic**: add, subtract, multiply, divide
- **Advanced**: power, square root, factorial
- **Statistical**: average, median, min, max
- **Special**: percentage calculations

### 2. Text Processor Tool
Processes and analyzes text:
- **Counting**: words, characters, lines
- **Extraction**: emails, phones, URLs
- **Transformation**: case conversion, formatting
- **Analysis**: sentiment, keywords, summarization

### 3. Data Processor Tool
Processes structured data:
- **Analysis**: structure and content analysis
- **Filtering**: filter data by criteria
- **Sorting**: sort by keys or values
- **Aggregation**: group and aggregate data
- **Validation**: data structure validation

## Environment Variables

### Required Variables

Choose one of these credential sets:

#### Option 1: WatsonX Orchestrate Service
```bash
WATSON_SERVICE_URL=https://your-watson-service-instance-url
WATSON_API_KEY=your-watson-api-key
WATSON_PROJECT_ID=your-watson-project-id
```

#### Option 2: WatsonX.ai (Recommended for Development)
```bash
WO_ENTITLEMENT_KEY=your_entitlement_key_for_ibm_container_registry
WATSONX_APIKEY=your_watsonx_api_key
WATSONX_SPACE_ID=your_watsonx_space_id
```

### Optional Variables
```bash
WATSON_DEFAULT_LLM=watsonx/meta-llama/llama-3-2-90b-vision-instruct
WATSON_GRANITE_MODEL=watsonx/ibm/granite-3.0-20b-instruct
WATSON_AGENT_STYLE=react
WATSON_TOOL_TIMEOUT=300
WATSON_LOG_LEVEL=INFO
```

## 🤖 Working with Agents

### Creating Agents

#### 1. Basic Agent Structure
Create a new agent by creating a YAML file in the `agents/` directory:

```yaml
# agents/my_agent.yaml
spec_version: v1
kind: native
name: MyAgent
description: A helpful AI assistant
instructions: |
  You are a helpful AI assistant that can:
  - Answer questions
  - Help with calculations
  - Process text and data
  - Provide friendly conversation
  
  Always be helpful and professional.
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
style: default
collaborators: []
tools: 
  - calculator_tool
  - text_processor_tool
```

#### 2. Import Your Agent
```bash
# Import a single agent
orchestrate agents import -f agents/my_agent.yaml

# Import all agents
python scripts/import_all_tools.py
```

#### 3. Test Your Agent
```bash
# Start chat interface
orchestrate chat start

# Visit http://localhost:3000/chat-lite
# Select your agent and start chatting
```

### Available Tools

The project includes these pre-built tools:

1. **calculator_tool**: Mathematical operations (add, multiply, divide, etc.)
2. **text_processor_tool**: Text analysis (count words, sentiment, etc.)
3. **data_processor_tool**: Data manipulation (filter, sort, analyze)

### Agent Styles

- **default**: Standard conversational style
- **react**: Reasoning and Acting style (better for complex tasks)

### LLM Models

- **watsonx/meta-llama/llama-3-2-90b-vision-instruct**: Fast, general-purpose
- **watsonx/ibm/granite-3.0-20b-instruct**: IBM's enterprise-optimized model

### 📚 Complete Agent Guide

For detailed instructions on creating, configuring, and deploying agents, see:
- **[Agent Creation Guide](docs/AGENT_GUIDE.md)** - Comprehensive guide
- **[Agent Integration Guide](docs/AGENT_INTEGRATION.md)** - How to use agents in your code
- **[Security Improvements](docs/SECURITY_IMPROVEMENTS.md)** - Security best practices

## 🎯 Current Working Setup

### Live Chat Interface
- **URL**: http://localhost:3000/chat-lite
- **Status**: ✅ Running and accessible
- **Agents**: Multiple agents available including AskOrchestrate
- **Features**: Real-time chat, tool integration, AI responses

### How to Access
1. **Set up environment**:
   ```bash
   python scripts/setup_environment.py
   ```

2. **Start the chat interface**:
   ```bash
   python scripts/chat.py
   ```

3. **Open your browser** and navigate to: http://localhost:3000/chat-lite

4. **Select an agent** and start chatting!

### Test Prompts
Try these sample prompts in the chat interface:
- "Hello, can you help me with calculations?"
- "What can you do for me?"
- "Can you analyze some data for me?"
- "Help me with text processing tasks"

## 💻 Programmatic Agent Usage

### Using Agents in Your Code

#### 1. Agent Wrapper (Recommended)
```bash
# List available agents
python scripts/agent_wrapper.py list

# Get agent information
python scripts/agent_wrapper.py info Basic_Chat_Agent

# Chat with agent (provides instructions)
python scripts/agent_wrapper.py chat Basic_Chat_Agent "Hello!"

# Interactive mode
python scripts/agent_wrapper.py interactive
```

#### 2. API-based Chat Client
```bash
# List agents with details
python scripts/api_agent_chat.py list

# Send single message
python scripts/api_agent_chat.py chat Basic_Chat_Agent "Your message"

# Interactive chat
python scripts/api_agent_chat.py
```

#### 3. Simple Integration Example
```python
from scripts.agent_wrapper import AgentWrapper

# Initialize wrapper
wrapper = AgentWrapper()

# List available agents
wrapper.list_agents()

# Chat with an agent
response = wrapper.chat_with_agent("Basic_Chat_Agent", "Hello!")
print(response)
```

### Available Chat Scripts

1. **`agent_wrapper.py`** - Simple wrapper with agent information
2. **`api_agent_chat.py`** - Full-featured API-based chat client
3. **`cli_agent_chat.py`** - CLI-based chat client
4. **`simple_agent_usage.py`** - Comprehensive usage examples

### Integration Patterns

For detailed integration patterns, error handling, and best practices, see:
- **[Agent Integration Guide](docs/AGENT_INTEGRATION.md)**

## Usage Examples

### Testing Tools Directly

```python
# Test calculator tool
from tools.calculator import calculator_tool
result = calculator_tool("add", [5, 3])
print(f"Sum: {result['result']}")

# Test text processor tool
from tools.text_processor import text_processor_tool
result = text_processor_tool("Hello world!", "count_words")
print(f"Word count: {result['result']['word_count']}")

# Test data processor tool
from tools.data_processor import data_processor_tool
data = [1, 2, 3, 4, 5]
result = data_processor_tool(data, "sum")
print(f"Sum: {result['result']}")
```

### Using Agents via API

Once deployed, you can interact with agents through the orchestrate API:

```bash
# Start the orchestrate server
orchestrate server start -e .env

# The API will be available at:
# - Web UI: http://localhost:4321
# - API Base: http://localhost:4321/api/v1
```

## Troubleshooting

### Issues Encountered and Solutions

#### 1. **"Missing required model access environment variables"**
**Error**: `Missing required model access environment variables. Please set Watson Orchestrate credentials 'WO_INSTANCE' and 'WO_API_KEY'`

**Solution**:
```bash
# Set environment variables directly in PowerShell
$env:WO_DEVELOPER_EDITION_SOURCE="orchestrate"
$env:WO_INSTANCE="https://api.ap-south-1.dl.watson-orchestrate.ibm.com"
$env:WO_API_KEY="your-api-key-here"
```

#### 2. **Unicode Encoding Issues with .env File**
**Error**: `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 0`

**Solution**:
```bash
# Create .env file with proper encoding
New-Item -Path ".env" -ItemType File -Force
Add-Content -Path ".env" -Value "WO_DEVELOPER_EDITION_SOURCE=orchestrate" -Encoding UTF8
Add-Content -Path ".env" -Value "WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com" -Encoding UTF8
Add-Content -Path ".env" -Value "WO_API_KEY=your-api-key" -Encoding UTF8
```

#### 3. **Docker Connection Timeout**
**Error**: `Client.Timeout exceeded while awaiting headers`

**Solution**:
- Ensure Docker Desktop is running
- Check network connectivity (disable VPN if needed)
- Increase Docker resources in settings
- Restart Docker Desktop

#### 4. **Tool Import Failures**
**Error**: `No module named 'calculator_tool'`

**Solution**:
- Use `--package-root` flag for Python tool imports
- Ensure `__init__.py` files exist in tool directories
- Set `PYTHONPATH` environment variable

### Common Issues

1. **"Orchestrate CLI not found"**
   ```bash
   pip install --upgrade ibm-watsonx-orchestrate
   ```

2. **"Configuration is incomplete"**
   - Copy `env_example.txt` to `.env`
   - Fill in your actual credentials
   - Ensure you have access to Watson services

3. **"Tool deployment failed"**
   - Check YAML syntax in tool files
   - Ensure Python tool functions are properly defined
   - Check error messages in the output

4. **"Agent deployment failed"**
   - Ensure all referenced tools are deployed first
   - Check agent YAML syntax
   - Verify LLM model names are correct

### Debug Commands

```bash
# Check orchestrate version
orchestrate --version

# Check environment status
orchestrate env status

# List all environments
orchestrate env list

# Check server status
orchestrate server status

# View logs
orchestrate agents logs <agent_name>
orchestrate tools logs <tool_name>
```

## Development

### Adding New Tools

1. Create Python tool function in `tools/` directory
2. Create corresponding YAML specification
3. Update agent YAML to include the tool
4. Deploy using `python setup.py --deploy`

### Adding New Agents

1. Create agent YAML specification in `agents/` directory
2. Define agent instructions and capabilities
3. Specify tools and LLM model
4. Deploy using `python setup.py --deploy`

### Testing Changes

```bash
# Test individual tools
python tools/calculator.py
python tools/text_processor.py
python tools/data_processor.py

# Test complete setup
python setup.py --test
```

## Resources

- [IBM watsonx Orchestrate Documentation](https://developer.watson-orchestrate.ibm.com/)
- [ADK Tutorial Repository](https://github.com/pdhoolia/wxo-adk-tutorial)
- [IBM WatsonX.ai](https://www.ibm.com/products/watsonx-ai)
- [SustainAlign Main Project](../README.md)

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review IBM documentation
3. Check the main SustainAlign project for advanced examples
4. Create an issue in the project repository

## 📋 Implementation Summary

### What We Accomplished
1. **✅ Complete IBM WatsonX Orchestrate Setup**
   - Installed and configured the ADK
   - Set up Docker environment for local development
   - Configured environment variables and credentials

2. **✅ Custom Tools Development**
   - Created calculator tool for mathematical operations
   - Developed text processor for text analysis
   - Built data processor for data manipulation
   - Combined all tools in `all_tools.py` for easy deployment

3. **✅ Agent Configuration**
   - Set up AskOrchestrate agent with IBM Granite LLM
   - Configured agent to work with local tools
   - Tested agent responses and capabilities

4. **✅ Chat Interface Deployment**
   - Successfully launched web-based chat interface
   - Resolved all configuration and encoding issues
   - Verified full functionality

5. **✅ Error Resolution**
   - Fixed Unicode encoding problems with .env files
   - Resolved environment variable configuration issues
   - Troubleshot Docker connectivity problems
   - Solved tool import and deployment challenges

### Current Status
- **Chat Interface**: ✅ Live at http://localhost:3000/chat-lite
- **Server**: ✅ WatsonX Orchestrate Developer Edition running
- **Database**: ✅ PostgreSQL container operational
- **Tools**: ✅ Custom tools created and ready
- **Agents**: ✅ AskOrchestrate agent available with IBM Granite LLM

### Next Steps
- Deploy custom tools to the agent
- Test advanced agent capabilities
- Integrate with main SustainAlign project
- Develop additional specialized tools for CSR matching

## License

This sample project follows the same license terms as the main SustainAlign project.
