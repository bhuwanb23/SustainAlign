# IBM WatsonX Orchestrate Sample Project

This is a sample project demonstrating how to create and deploy IBM watsonx Orchestrate agents and tools. It's designed to be independent of the main SustainAlign project and serves as a learning resource.

## Overview

This sample project includes:

- **3 Sample Agents**: Basic Chat Agent, Task Assistant Agent, and Data Analyzer Agent
- **3 Sample Tools**: Calculator, Text Processor, and Data Processor
- **Complete Setup Scripts**: Automated deployment and testing
- **Environment Configuration**: Ready-to-use configuration templates

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

## Quick Start

### 1. Install Dependencies

```bash
# Install IBM watsonx Orchestrate ADK
pip install --upgrade ibm-watsonx-orchestrate

# Install sample project dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp env_example.txt .env

# Edit .env with your actual credentials
# You need either:
# - WatsonX Orchestrate service credentials, OR
# - WatsonX.ai credentials with entitlement key
```

### 3. Run Complete Setup

```bash
# Run the complete setup (recommended for first time)
python setup.py --all
```

This will:
- Check prerequisites
- Set up the environment
- Deploy all tools and agents
- Test the deployment
- List deployed items

## Manual Setup Steps

If you prefer to run steps individually:

### 1. Environment Setup

```bash
python setup.py --setup
```

### 2. Deploy Tools and Agents

```bash
python setup.py --deploy
```

### 3. Test Deployment

```bash
python setup.py --test
```

### 4. List Deployed Items

```bash
python setup.py --list
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
├── config.py                       # Configuration management
├── setup.py                        # Setup and deployment script
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

## Usage Examples

### Testing Tools Directly

```python
# Test calculator tool
from tools.calculator import calculator_tool
result = calculator_tool("add", [1, 2, 3, 4])
print(f"Sum: {result['result']}")

# Test text processor tool
from tools.text_processor import text_processor_tool
result = text_processor_tool("Hello world!", "count_words")
print(f"Word count: {result['result']['word_count']}")

# Test data processor tool
from tools.data_processor import data_processor_tool
data = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
result = data_processor_tool(data, "analyze")
print(f"Data type: {result['result']['type']}")
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

## License

This sample project follows the same license terms as the main SustainAlign project.
