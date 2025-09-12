# IBM watsonx Orchestrate Agent Creation Tutorial

This tutorial provides a comprehensive guide for creating IBM watsonx Orchestrate agents based on the [official ADK tutorial](https://github.com/pdhoolia/wxo-adk-tutorial) and the SustainAlign project implementation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Agent Architecture](#agent-architecture)
4. [Creating Your First Agent](#creating-your-first-agent)
5. [Creating Custom Tools](#creating-custom-tools)
6. [Deployment Process](#deployment-process)
7. [Testing and Validation](#testing-and-validation)
8. [Advanced Features](#advanced-features)
9. [Best Practices](#best-practices)

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

## Environment Setup

### 1. Install IBM watsonx Orchestrate ADK

```bash
# Using pip
pip install --upgrade ibm-watsonx-orchestrate

# Using uv (recommended)
uv add ibm-watsonx-orchestrate
```

### 2. Configure Environment Variables

Create a `.env` file with your credentials:

```bash
# For watsonx.ai integration (recommended)
WO_DEVELOPER_EDITION_SOURCE=myibm
WO_ENTITLEMENT_KEY=<your_entitlement_key>
WATSONX_APIKEY=<your_watsonx_api_key>
WATSONX_SPACE_ID=<your_space_id>

# For watsonx Orchestrate service
WO_DEVELOPER_EDITION_SOURCE=orchestrate
WO_INSTANCE=<your_service_instance_url>
WO_API_KEY=<your_api_key>
```

### 3. Start Development Environment

```bash
# Start the orchestrate server
orchestrate server start -e .env

# Start the copilot server (optional but helpful)
orchestrate copilot start -e .env

# Activate local environment
orchestrate env activate local
```

## Agent Architecture

### Core Components

1. **Agent Specification (YAML)**: Defines agent behavior, instructions, and tools
2. **Tools**: Python functions that agents can call to perform specific tasks
3. **LLM Models**: Language models that power agent reasoning
4. **Collaboration**: Agents can work together on complex tasks

### Agent Structure

```yaml
spec_version: v1
kind: native
name: Agent_Name
description: Brief description of the agent's purpose
instructions: |
  Detailed instructions for the agent's behavior
llm: watsonx/ibm/granite-3.0-20b-instruct
style: react
collaborators: []
tools: 
  - tool_name_1
  - tool_name_2
```

## Creating Your First Agent

### Step 1: Define Agent Purpose

Let's create a **Sustainability Advisor Agent** that provides sustainability recommendations for CSR projects.

### Step 2: Create Agent YAML

```yaml
# sustainability_advisor_agent.yaml
spec_version: v1
kind: native
name: Sustainability_Advisor_Agent
description: An AI agent that provides sustainability advice and recommendations for CSR projects
instructions: |
  You are a Sustainability Advisor Agent for the SustainAlign platform. Your role is to:
  
  1. Analyze CSR projects for sustainability best practices
  2. Provide recommendations for improving environmental impact
  3. Assess long-term sustainability potential
  4. Suggest innovative sustainability solutions
  5. Evaluate alignment with global sustainability frameworks (SDGs, ESG)
  
  When analyzing projects, consider:
  - Environmental impact and carbon footprint
  - Social sustainability and community engagement
  - Economic viability and long-term funding
  - Innovation and scalability potential
  - Risk mitigation and resilience factors
  
  Always provide actionable, evidence-based recommendations that help organizations
  maximize their positive impact while ensuring long-term sustainability.
  
llm: watsonx/ibm/granite-3.0-20b-instruct
style: react
collaborators: []
tools: 
  - project_analyzer_tool
  - impact_calculator_tool
  - sustainability_analyzer_tool
```

### Step 3: Create Supporting Tools

Create the `sustainability_analyzer_tool.py`:

```python
def sustainability_analyzer_function(project_data: Dict[str, Any], 
                                   sustainability_framework: str = "SDG") -> Dict[str, Any]:
    """
    Analyze CSR project for sustainability best practices and recommendations
    
    Args:
        project_data: Project information including objectives, impact metrics, timeline
        sustainability_framework: Framework to use (SDG, ESG, TCFD, etc.)
    
    Returns:
        Sustainability analysis with scores and recommendations
    """
    # Implementation details...
    return {
        "framework": sustainability_framework,
        "overall_sustainability_score": 0.85,
        "recommendations": ["Implement carbon offsetting", "Enhance community engagement"],
        "success": True
    }
```

### Step 4: Create Tool YAML

```yaml
# sustainability_analyzer_tool.yaml
spec_version: v1
kind: tool
name: sustainability_analyzer_tool
description: Analyzes projects for sustainability best practices and recommendations
implementation:
  type: python
  entry_point: sustainability_analyzer_function
parameters:
  type: object
  properties:
    project_data:
      type: object
      description: Project information including objectives, impact metrics, timeline
    sustainability_framework:
      type: string
      description: Framework to use (SDG, ESG, TCFD, etc.)
      default: "SDG"
  required:
    - project_data
```

## Creating Custom Tools

### Tool Structure

Tools are Python functions that agents can call. They should:

1. **Have clear input/output contracts**
2. **Handle errors gracefully**
3. **Return structured data**
4. **Be well-documented**

### Example Tool Template

```python
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

def your_tool_function(param1: str, param2: int, param3: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Brief description of what the tool does
    
    Args:
        param1: Description of parameter 1
        param2: Description of parameter 2
        param3: Optional parameter description
    
    Returns:
        Dictionary containing results and metadata
    """
    try:
        logger.info(f"Executing tool with param1: {param1}")
        
        # Tool logic here
        result = perform_analysis(param1, param2, param3)
        
        return {
            "result": result,
            "success": True,
            "metadata": {
                "execution_time": "0.5s",
                "version": "1.0"
            }
        }
        
    except Exception as e:
        logger.error(f"Tool execution failed: {str(e)}")
        return {
            "error": f"Tool execution failed: {str(e)}",
            "success": False
        }

def perform_analysis(param1: str, param2: int, param3: Dict[str, Any]) -> Any:
    """Helper function for the main tool logic"""
    # Implementation details
    pass
```

## Deployment Process

### 1. Deploy Tools First

```bash
# Deploy individual tools
orchestrate tools import -f tools/sustainability_analyzer_tool.yaml

# Or deploy all tools at once
orchestrate tools import -f tools/
```

### 2. Deploy Agents

```bash
# Deploy individual agents
orchestrate agents import -f agents/sustainability_advisor_agent.yaml

# Or deploy all agents at once
orchestrate agents import -f agents/
```

### 3. Verify Deployment

```bash
# List deployed agents
orchestrate agents list

# List deployed tools
orchestrate tools list

# Check agent status
orchestrate agents status <agent_name>
```

## Testing and Validation

### 1. Test Tools Independently

```python
# Test tool functionality
from tools.sustainability_analyzer import sustainability_analyzer_function

test_data = {
    "name": "Test Project",
    "carbon_footprint": {"reduction_target": True},
    "community_engagement": {"engagement_level": "high"}
}

result = sustainability_analyzer_function(test_data, "SDG")
print(f"Tool result: {result}")
```

### 2. Test Agent Interactions

```python
# Test agent through API
import requests

response = requests.post('http://localhost:4321/api/v1/agents/sustainability_advisor/chat', 
                        json={
                            "message": "Analyze this project for sustainability",
                            "project_data": test_data
                        })

print(f"Agent response: {response.json()}")
```

### 3. Integration Testing

```bash
# Run comprehensive tests
python setup.py --test

# Test specific agent
python -c "
from ibm_watson.agent_manager import agent_manager
result = agent_manager.test_agent('sustainability_advisor_agent')
print(result)
"
```

## Advanced Features

### 1. Agent Collaboration

```yaml
# Agent with collaborators
spec_version: v1
kind: native
name: Project_Manager_Agent
description: Coordinates multiple agents for comprehensive project analysis
instructions: |
  You coordinate with other agents to provide comprehensive project analysis.
  Work with CSR_Matching_Agent, Project_Evaluation_Agent, and Impact_Assessment_Agent.
collaborators:
  - CSR_Matching_Agent
  - Project_Evaluation_Agent
  - Impact_Assessment_Agent
```

### 2. Custom LLM Models

```yaml
# Using different models for different tasks
llm: watsonx/ibm/granite-3.0-70b-instruct  # For complex reasoning
# or
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct  # For vision tasks
```

### 3. Agent Styles

```yaml
# Different reasoning styles
style: react      # For complex multi-step reasoning
style: default    # For simple conversational tasks
```

### 4. Dynamic Tool Loading

```python
# Load tools dynamically based on context
def get_available_tools(context: Dict[str, Any]) -> List[str]:
    """Return list of tools based on current context"""
    if context.get('analysis_type') == 'sustainability':
        return ['sustainability_analyzer_tool', 'impact_calculator_tool']
    elif context.get('analysis_type') == 'financial':
        return ['budget_optimizer_tool', 'risk_assessor_tool']
    else:
        return ['project_analyzer_tool']
```

## Best Practices

### 1. Agent Design

- **Single Responsibility**: Each agent should have a clear, focused purpose
- **Clear Instructions**: Provide detailed, specific instructions
- **Error Handling**: Include robust error handling in tools
- **Logging**: Implement comprehensive logging for debugging

### 2. Tool Development

- **Input Validation**: Validate all inputs before processing
- **Structured Output**: Return consistent, structured data
- **Documentation**: Document all parameters and return values
- **Testing**: Write unit tests for all tools

### 3. Performance Optimization

- **Model Selection**: Choose appropriate models for task complexity
- **Caching**: Implement caching for expensive operations
- **Async Operations**: Use async operations for I/O-bound tasks
- **Resource Management**: Monitor and manage resource usage

### 4. Security Considerations

- **Input Sanitization**: Sanitize all inputs to prevent injection attacks
- **Access Control**: Implement proper authentication and authorization
- **Data Privacy**: Handle sensitive data appropriately
- **Audit Logging**: Log all agent interactions for compliance

## Troubleshooting

### Common Issues

1. **Agent Deployment Fails**
   - Check YAML syntax
   - Verify tool dependencies
   - Ensure all referenced tools are deployed

2. **Tool Execution Errors**
   - Check parameter validation
   - Verify input data format
   - Review error logs

3. **Performance Issues**
   - Monitor resource usage
   - Consider model selection
   - Implement caching

### Debug Commands

```bash
# Check agent logs
orchestrate agents logs <agent_name>

# Check tool logs
orchestrate tools logs <tool_name>

# Health check
orchestrate health

# Environment status
orchestrate env status
```

## Next Steps

1. **Explore the SustainAlign Implementation**: Review the existing agents and tools in the project
2. **Create Your Own Agent**: Follow this tutorial to create a custom agent
3. **Integrate with Your Application**: Use the API endpoints to integrate agents
4. **Scale and Optimize**: Monitor performance and optimize as needed

## Resources

- [IBM watsonx Orchestrate Documentation](https://developer.watson-orchestrate.ibm.com/)
- [ADK Tutorial Repository](https://github.com/pdhoolia/wxo-adk-tutorial)
- [SustainAlign Project](https://github.com/your-org/sustainalign)
- [IBM Granite Models](https://www.ibm.com/products/watsonx-ai)

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review IBM documentation
3. Create an issue in the project repository
4. Contact the development team
