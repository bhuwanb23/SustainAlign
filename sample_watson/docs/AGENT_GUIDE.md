# IBM WatsonX Orchestrate Agent Creation and Usage Guide

## Table of Contents
1. [Overview](#overview)
2. [Agent Structure](#agent-structure)
3. [Creating Your First Agent](#creating-your-first-agent)
4. [Advanced Agent Configuration](#advanced-agent-configuration)
5. [Tool Integration](#tool-integration)
6. [Importing and Deploying Agents](#importing-and-deploying-agents)
7. [Testing and Debugging](#testing-and-debugging)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Overview

IBM WatsonX Orchestrate agents are AI-powered assistants that can perform specific tasks using tools and knowledge bases. This guide will walk you through creating, configuring, and deploying agents effectively.

## Agent Structure

### Basic Agent Components

An agent consists of:
- **Instructions**: How the agent should behave and respond
- **LLM Model**: The language model that powers the agent
- **Tools**: Functions the agent can use to perform tasks
- **Style**: The interaction style (default, react, etc.)
- **Collaborators**: Other agents the agent can work with

### Agent YAML Structure

```yaml
spec_version: v1
kind: native
name: your_agent_name
description: A brief description of what the agent does
instructions: |
  Detailed instructions on how the agent should behave,
  what tasks it can perform, and how it should interact with users.
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
style: default
collaborators: []
tools: 
  - tool_name_1
  - tool_name_2
```

## Creating Your First Agent

### Step 1: Create Agent YAML File

Create a new file in the `agents/` directory:

```bash
# Create a new agent file
touch agents/my_first_agent.yaml
```

### Step 2: Define Agent Configuration

```yaml
spec_version: v1
kind: native
name: MyFirstAgent
description: A simple agent that helps with basic tasks
instructions: |
  You are a helpful AI assistant that can:
  1. Answer general questions
  2. Help with basic calculations
  3. Process text and data
  4. Provide friendly conversation
  
  Guidelines:
  - Be helpful and professional
  - Use tools when they can help provide better answers
  - Ask clarifying questions when needed
  - Always maintain a positive tone

llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
style: default
collaborators: []
tools: 
  - calculator_tool
  - text_processor_tool
```

### Step 3: Import the Agent

```bash
# Import the agent
orchestrate agents import -f agents/my_first_agent.yaml
```

### Step 4: Test the Agent

```bash
# Start the chat interface
orchestrate chat start

# Visit http://localhost:3000/chat-lite
# Select your agent and start chatting
```

## Advanced Agent Configuration

### Agent Styles

#### Default Style
```yaml
style: default
```
- Standard conversational style
- Good for general-purpose agents

#### ReAct Style
```yaml
style: react
```
- Reasoning and Acting style
- Better for complex problem-solving
- Uses tools more strategically

### LLM Model Selection

#### Meta Llama Models
```yaml
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
```
- Good for general tasks
- Fast and efficient
- Supports vision capabilities

#### IBM Granite Models
```yaml
llm: watsonx/ibm/granite-3.0-20b-instruct
```
- IBM's proprietary model
- Optimized for enterprise tasks
- Better for complex reasoning

### Advanced Instructions

```yaml
instructions: |
  You are a specialized data analyst agent with the following capabilities:
  
  CORE FUNCTIONS:
  - Analyze datasets and provide insights
  - Create visualizations and reports
  - Identify patterns and trends
  - Make data-driven recommendations
  
  WORKFLOW:
  1. Always start by understanding the data structure
  2. Use appropriate tools for analysis
  3. Provide clear, actionable insights
  4. Include relevant visualizations when helpful
  
  COMMUNICATION STYLE:
  - Use professional, technical language when appropriate
  - Provide step-by-step explanations
  - Include confidence levels for predictions
  - Offer multiple analysis approaches when relevant
  
  CONSTRAINTS:
  - Always validate data before analysis
  - Explain limitations and assumptions
  - Suggest improvements to data quality
  - Maintain data privacy and security
```

## Tool Integration

### Available Tools

The sample project includes these tools:

1. **calculator_tool**: Mathematical operations
2. **text_processor_tool**: Text analysis and processing
3. **data_processor_tool**: Data manipulation and analysis

### Adding Tools to Agents

```yaml
tools: 
  - calculator_tool      # For mathematical operations
  - text_processor_tool  # For text analysis
  - data_processor_tool  # For data processing
```

### Creating Custom Tools

1. **Create Tool Python File**:
```python
# tools/my_custom_tool.py
def my_custom_tool(param1: str, param2: int) -> dict:
    """
    Custom tool description
    
    Args:
        param1: Description of param1
        param2: Description of param2
    
    Returns:
        dict: Result with success status and data
    """
    try:
        # Your tool logic here
        result = f"Processed {param1} with {param2}"
        
        return {
            "success": True,
            "result": result,
            "param1": param1,
            "param2": param2
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "param1": param1,
            "param2": param2
        }
```

2. **Create Tool YAML Specification**:
```yaml
# tools/my_custom_tool.yaml
spec_version: v1
kind: python
name: my_custom_tool
description: Custom tool for specific tasks
entry_point: tools.my_custom_tool:my_custom_tool
parameters:
  type: object
  properties:
    param1:
      type: string
      description: First parameter
    param2:
      type: integer
      description: Second parameter
  required:
    - param1
    - param2
```

3. **Import the Tool**:
```bash
orchestrate tools import -k python -f tools/my_custom_tool.py --package-root .
```

4. **Add to Agent**:
```yaml
tools: 
  - my_custom_tool
```

## Importing and Deploying Agents

### Manual Import

```bash
# Import a single agent
orchestrate agents import -f agents/my_agent.yaml

# Import all agents in a directory
for file in agents/*.yaml; do
    orchestrate agents import -f "$file"
done
```

### Using the Import Script

```bash
# Import all tools and agents
python scripts/import_all_tools.py
```

### Checking Deployed Agents

```bash
# List all agents
orchestrate agents list

# Get details about a specific agent
orchestrate agents describe my_agent_name
```

## Testing and Debugging

### Testing Agents

1. **Start Chat Interface**:
```bash
orchestrate chat start
```

2. **Test Different Scenarios**:
   - Ask questions the agent should handle
   - Test tool usage
   - Try edge cases and error conditions

3. **Monitor Agent Logs**:
```bash
orchestrate agents logs my_agent_name
```

### Debugging Common Issues

#### Agent Not Responding
- Check if agent is properly imported
- Verify LLM model is available
- Check agent instructions for clarity

#### Tools Not Working
- Ensure tools are imported before agents
- Check tool function signatures
- Verify tool YAML specifications

#### Poor Agent Performance
- Refine agent instructions
- Try different LLM models
- Adjust agent style (default vs react)

## Best Practices

### Agent Design

1. **Clear Instructions**: Write specific, actionable instructions
2. **Focused Purpose**: Each agent should have a clear, specific purpose
3. **Appropriate Tools**: Only include tools the agent actually needs
4. **Error Handling**: Include instructions for handling errors gracefully

### Tool Integration

1. **Tool Validation**: Always validate tool inputs and outputs
2. **Error Handling**: Provide meaningful error messages
3. **Documentation**: Document tool parameters and return values
4. **Testing**: Test tools thoroughly before deploying

### Performance Optimization

1. **Model Selection**: Choose the right LLM for your use case
2. **Style Selection**: Use react style for complex reasoning tasks
3. **Tool Efficiency**: Optimize tool performance
4. **Caching**: Implement caching where appropriate

## Troubleshooting

### Common Issues

#### "Agent not found" Error
```bash
# Check if agent is imported
orchestrate agents list

# Re-import if needed
orchestrate agents import -f agents/my_agent.yaml
```

#### "Tool not found" Error
```bash
# Check if tool is imported
orchestrate tools list

# Import tool first
orchestrate tools import -k python -f tools/my_tool.py --package-root .
```

#### Agent Not Using Tools
- Check tool names in agent YAML match imported tool names
- Verify tool functions are properly defined
- Check agent instructions mention tool usage

#### Poor Agent Responses
- Refine agent instructions
- Try different LLM models
- Adjust agent style
- Add more specific examples in instructions

### Getting Help

1. **Check Logs**: Use `orchestrate agents logs` to see agent activity
2. **Test Tools**: Test tools independently before using in agents
3. **Review Instructions**: Ensure agent instructions are clear and specific
4. **Community Support**: Check IBM WatsonX Orchestrate documentation

## Example Agent Templates

### Customer Service Agent
```yaml
spec_version: v1
kind: native
name: CustomerServiceAgent
description: Handles customer inquiries and support requests
instructions: |
  You are a customer service agent. Your role is to:
  - Help customers with their questions and issues
  - Provide accurate information about products/services
  - Escalate complex issues to human agents when needed
  - Maintain a friendly and professional tone
  
  Always be helpful, patient, and solution-oriented.
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
style: default
collaborators: []
tools: 
  - text_processor_tool
```

### Data Analysis Agent
```yaml
spec_version: v1
kind: native
name: DataAnalysisAgent
description: Analyzes data and provides insights
instructions: |
  You are a data analysis expert. Your capabilities include:
  - Analyzing datasets and identifying patterns
  - Creating visualizations and reports
  - Providing data-driven recommendations
  - Explaining statistical concepts clearly
  
  Always validate data quality and explain your methodology.
llm: watsonx/ibm/granite-3.0-20b-instruct
style: react
collaborators: []
tools: 
  - calculator_tool
  - data_processor_tool
  - text_processor_tool
```

### Creative Writing Agent
```yaml
spec_version: v1
kind: native
name: CreativeWritingAgent
description: Helps with creative writing and content creation
instructions: |
  You are a creative writing assistant. You can help with:
  - Brainstorming ideas and concepts
  - Writing and editing content
  - Improving writing style and flow
  - Providing feedback and suggestions
  
  Be creative, inspiring, and supportive in your approach.
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct
style: default
collaborators: []
tools: 
  - text_processor_tool
```

This guide provides everything you need to create, configure, and deploy effective IBM WatsonX Orchestrate agents. Start with simple agents and gradually add complexity as you become more familiar with the platform.
