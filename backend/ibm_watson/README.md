# IBM WatsonX Orchestrate Integration for SustainAlign

This module provides integration with IBM WatsonX Orchestrate Agent Development Kit (ADK) for creating and managing AI agents that support CSR project matching, evaluation, and decision-making processes.

## Overview

The IBM Watson integration adds powerful AI agents to the SustainAlign platform that can:

- **CSR Matching Agent**: Analyze and match CSR projects with company objectives
- **Project Evaluation Agent**: Evaluate project feasibility, risks, and implementation potential
- **Decision Support Agent**: Provide strategic decision support for CSR investments
- **Impact Assessment Agent**: Assess social and environmental impact of projects

## Features

### 🤖 AI Agents
- **CSR Matching Agent**: Matches projects with company SDG priorities, geographic focus, and budget constraints
- **Project Evaluation Agent**: Evaluates project feasibility, complexity, and risk factors
- **Decision Support Agent**: Optimizes budget allocation across multiple projects
- **Impact Assessment Agent**: Calculates social, environmental, and economic impact metrics

### 🛠️ Tools
- **Project Analyzer**: Analyzes project alignment, feasibility, and impact potential
- **Impact Calculator**: Calculates comprehensive impact metrics across multiple dimensions
- **Risk Assessor**: Assesses project risks across financial, operational, environmental, social, and regulatory categories
- **Budget Optimizer**: Optimizes budget allocation using cost-effectiveness analysis

### 🔧 Integration
- RESTful API endpoints for agent interactions
- Seamless integration with existing SustainAlign backend
- Support for IBM Granite LLM models and other WatsonX models
- Comprehensive error handling and logging

## Installation

### Prerequisites

1. **Python 3.11+**: Ensure you have Python 3.11 or later installed
2. **IBM WatsonX Orchestrate Account**: Sign up for a free 30-day trial at [developer.watson-orchestrate.ibm.com](https://developer.watson-orchestrate.ibm.com)
3. **Docker**: Required for local development (optional for cloud deployment)

### Setup Steps

1. **Install IBM WatsonX Orchestrate ADK**:
   ```bash
   pip install --upgrade ibm-watsonx-orchestrate
   ```

2. **Configure Environment Variables**:
   ```bash
   # Copy the example configuration
   cp env_watson_example.txt .env
   
   # Edit .env and add your Watson credentials
   WATSON_SERVICE_URL=https://your-watson-service-instance-url
   WATSON_API_KEY=your-watson-api-key
   WATSON_PROJECT_ID=your-watson-project-id
   ```

3. **Run Setup Script**:
   ```bash
   cd backend/ibm_watson
   python setup.py --setup
   ```

4. **Verify Installation**:
   ```bash
   python setup.py --list
   python setup.py --test
   ```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WATSON_ENV_NAME` | Environment name for Watson | No (default: sustainalign-dev) |
| `WATSON_SERVICE_URL` | Watson service instance URL | Yes |
| `WATSON_API_KEY` | Watson API key | Yes |
| `WATSON_PROJECT_ID` | Watson project ID | Yes |
| `WATSON_DEFAULT_LLM` | Default LLM model | No |
| `WATSON_GRANITE_MODEL` | Granite model to use | No |

### Agent Configuration

Agents are configured in `config.py` with the following settings:

- **LLM Models**: IBM Granite models (3.0-8b, 3.0-20b, 3.0-70b)
- **Agent Styles**: ReAct style for complex reasoning tasks
- **Tool Integration**: Each agent has access to specific tools
- **Collaboration**: Agents can collaborate with each other

## API Endpoints

### Agent Management

- `POST /api/watson/initialize` - Initialize Watson service
- `GET /api/watson/agents/status` - Get status of deployed agents
- `GET /api/watson/health` - Health check for Watson service

### Project Analysis

- `POST /api/watson/analyze-alignment` - Analyze project alignment with company objectives
- `POST /api/watson/evaluate-feasibility` - Evaluate project feasibility
- `POST /api/watson/assess-impact` - Assess project impact
- `POST /api/watson/comprehensive-analysis` - Get comprehensive analysis using multiple agents

### Budget Optimization

- `POST /api/watson/optimize-budget` - Optimize budget allocation across projects

### Tool Execution

- `POST /api/watson/tools/execute` - Execute a specific Watson tool

## Usage Examples

### 1. Analyze Project Alignment

```python
import requests

# Analyze project alignment
response = requests.post('/api/watson/analyze-alignment', json={
    'project_id': 'project-123'
})

result = response.json()
print(f"Alignment Score: {result['tool_analysis']['overall_score']}")
print(f"Recommendations: {result['recommendations']}")
```

### 2. Evaluate Project Feasibility

```python
# Evaluate project feasibility
response = requests.post('/api/watson/evaluate-feasibility', json={
    'project_id': 'project-123'
})

result = response.json()
feasibility_score = result['feasibility_analysis']['overall_score']
risk_level = result['risk_analysis']['risk_level']
print(f"Feasibility: {feasibility_score}, Risk: {risk_level}")
```

### 3. Optimize Budget Allocation

```python
# Optimize budget allocation
response = requests.post('/api/watson/optimize-budget', json={
    'available_budget': 1000000,
    'project_ids': ['project-1', 'project-2', 'project-3'],
    'constraints': {
        'min_projects': 2,
        'max_projects': 5
    }
})

result = response.json()
selected_projects = result['optimization_result']['selected_projects']
print(f"Selected {len(selected_projects)} projects for optimal allocation")
```

### 4. Get Comprehensive Analysis

```python
# Get comprehensive analysis
response = requests.post('/api/watson/comprehensive-analysis', json={
    'project_id': 'project-123'
})

result = response.json()
overall_score = result['overall_score']
recommendations = result['comprehensive_recommendations']
print(f"Overall Score: {overall_score}")
print(f"Recommendations: {recommendations}")
```

## Agent Details

### CSR Matching Agent

**Purpose**: Matches CSR projects with company objectives and priorities

**Capabilities**:
- SDG alignment analysis
- Geographic focus matching
- Budget compatibility assessment
- Impact potential evaluation

**Tools Used**:
- Project Analyzer Tool
- Impact Calculator Tool

### Project Evaluation Agent

**Purpose**: Evaluates project feasibility and implementation potential

**Capabilities**:
- Feasibility assessment
- Risk analysis
- Resource requirement evaluation
- Timeline analysis

**Tools Used**:
- Project Analyzer Tool
- Risk Assessor Tool

### Decision Support Agent

**Purpose**: Provides strategic decision support for CSR investments

**Capabilities**:
- Budget optimization
- Portfolio analysis
- ROI assessment
- Risk-return analysis

**Tools Used**:
- Budget Optimizer Tool
- Risk Assessor Tool

### Impact Assessment Agent

**Purpose**: Assesses social and environmental impact of projects

**Capabilities**:
- Social impact calculation
- Environmental impact assessment
- Economic impact analysis
- Sustainability evaluation

**Tools Used**:
- Impact Calculator Tool
- Project Analyzer Tool

## Tool Details

### Project Analyzer Tool

Analyzes projects across three dimensions:

1. **Alignment Analysis**: SDG alignment, geographic alignment, budget alignment
2. **Feasibility Analysis**: Timeline feasibility, complexity assessment, resource availability
3. **Impact Analysis**: Scale impact, metrics quality, sustainability potential

### Impact Calculator Tool

Calculates comprehensive impact metrics:

- **Social Impact**: Beneficiary reach, education impact, health impact, community impact
- **Environmental Impact**: Carbon reduction, water conservation, waste reduction, biodiversity
- **Economic Impact**: Job creation, local spending, skill development, market development

### Risk Assessor Tool

Assesses risks across five categories:

- **Financial Risks**: Budget adequacy, funding reliability, currency volatility
- **Operational Risks**: Complexity, team capacity, technology requirements, location factors
- **Environmental Risks**: Impact assessment, climate vulnerability, resource dependency
- **Social Risks**: Community engagement, stakeholder conflicts, cultural sensitivity
- **Regulatory Risks**: Compliance status, legal framework, permit requirements

### Budget Optimizer Tool

Optimizes budget allocation using:

- **ROI Analysis**: Expected return on investment calculations
- **Impact Scoring**: Social, environmental, and economic impact assessment
- **Risk Assessment**: Project risk evaluation and mitigation
- **Alignment Scoring**: Company objective alignment
- **Feasibility Analysis**: Implementation feasibility assessment

## Development

### Adding New Agents

1. **Define Agent Configuration** in `config.py`:
   ```python
   "new_agent": {
       "name": "New_Agent",
       "description": "Description of the new agent",
       "llm": "watsonx/ibm/granite-3.0-20b-instruct",
       "style": "react"
   }
   ```

2. **Create Agent Instructions** in `agent_manager.py`:
   ```python
   def _get_agent_instructions(self, agent_type: str) -> str:
       if agent_type == "new_agent":
           return "Instructions for the new agent..."
   ```

3. **Deploy the Agent**:
   ```python
   agent_manager.deploy_agent("new_agent")
   ```

### Adding New Tools

1. **Create Tool Function** in `tools/` directory:
   ```python
   def new_tool_function(param1: str, param2: int) -> Dict[str, Any]:
       # Tool implementation
       return {"result": "success"}
   ```

2. **Define Tool Configuration** in `config.py`:
   ```python
   "new_tool": {
       "name": "new_tool_tool",
       "description": "Description of the new tool"
   }
   ```

3. **Add Tool to Agent Manager**:
   ```python
   def _get_tool_parameters(self, tool_type: str) -> Dict[str, Any]:
       if tool_type == "new_tool":
           return {"type": "object", "properties": {...}}
   ```

### Testing

Run the test suite:

```bash
# Test all agents
python setup.py --test

# Test specific tool
python -c "from ibm_watson.tools.project_analyzer import project_analyzer_function; print(project_analyzer_function({}, {}, 'alignment'))"
```

## Troubleshooting

### Common Issues

1. **Configuration Not Found**:
   - Ensure environment variables are set correctly
   - Check that `.env` file exists and contains required variables

2. **Agent Deployment Failed**:
   - Verify Watson service URL and API key
   - Check network connectivity to Watson services
   - Ensure sufficient permissions for agent deployment

3. **Tool Execution Errors**:
   - Check tool parameter validation
   - Verify input data format
   - Review error logs for specific issues

### Debug Mode

Enable debug logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Health Check

Check service health:

```bash
curl http://localhost:5000/api/watson/health
```

## Performance Considerations

- **Model Selection**: Choose appropriate Granite model based on complexity (8b for simple tasks, 70b for complex reasoning)
- **Tool Timeout**: Set appropriate timeout values for tool execution
- **Caching**: Consider caching results for repeated analyses
- **Rate Limiting**: Implement rate limiting for API endpoints

## Security

- **API Key Management**: Store Watson API keys securely
- **Access Control**: Implement proper authentication and authorization
- **Data Privacy**: Ensure sensitive data is handled appropriately
- **Audit Logging**: Log all agent interactions for compliance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## License

This module is part of the SustainAlign project and follows the same license terms.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review IBM WatsonX Orchestrate documentation
3. Create an issue in the project repository
4. Contact the development team

## Resources

- [IBM WatsonX Orchestrate Documentation](https://developer.watson-orchestrate.ibm.com/)
- [IBM WatsonX Orchestrate ADK GitHub](https://github.com/IBM/ibm-watsonx-orchestrate-adk)
- [IBM Granite Models Documentation](https://www.ibm.com/products/watsonx-ai)
- [SustainAlign Project Repository](https://github.com/your-org/sustainalign)
