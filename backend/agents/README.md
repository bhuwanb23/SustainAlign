# 🤖 SustainAlign Agents

This directory contains all the AI agents that power the SustainAlign platform for CSR/ESG project management and decision-making.

## 📋 Agent Overview

### 1. 🔍 Discovery Agent (`discovery_agent.py`)
- **Purpose**: Fetches NGO/CSR project data from APIs (NGO Darpan, UN SDG datasets, sustainability platforms)
- **Key Features**:
  - Project search and filtering by sector, geography, budget, and SDGs
  - Integration with multiple data sources
  - Real-time project discovery
  - Statistics and analytics

### 2. 🎯 Alignment Agent (`alignment_agent.py`)
- **Purpose**: Maps corporate ESG/CSR goals with potential projects
- **Key Features**:
  - Generates alignment scores (0-100) for each project
  - Multi-criteria alignment analysis (SDG, geography, budget, sector, NGO credibility)
  - Weighted scoring system
  - Top recommendations generation

### 3. 📊 Evaluation Agent (`evaluation_agent.py`)
- **Purpose**: Performs side-by-side comparisons of projects
- **Key Features**:
  - Multi-criteria decision matrices
  - Cost efficiency analysis
  - Impact potential assessment
  - Risk evaluation
  - NGO credibility scoring

### 4. 🎯 Decision Support Agent (`decision_support_agent.py`)
- **Purpose**: Converts evaluations into board-ready summaries with Explainable AI (XAI)
- **Key Features**:
  - Board-ready decision summaries
  - XAI explanations for recommendations
  - Top 3 project suggestions
  - Risk assessment and mitigation strategies

### 5. 📈 Monitoring Agent (`monitoring_agent.py`)
- **Purpose**: Tracks ongoing project performance and detects issues
- **Key Features**:
  - Real-time project monitoring
  - Performance tracking via NGO reports, IoT feeds, satellite updates
  - Alert generation for delays, budget overruns, compliance risks
  - Automated recommendations

### 6. 📋 Reporting Agent (`reporting_agent.py`)
- **Purpose**: Generates automated CSR/ESG reports
- **Key Features**:
  - CSR-2 compliance reports for India
  - GRI/ESG reports for global standards
  - Multiple export formats (PDF, Excel, JSON)
  - Audit trail maintenance

### 7. 🏪 Marketplace Agent (`marketplace_agent.py`)
- **Purpose**: Manages NGO side dashboards and auto-matching
- **Key Features**:
  - NGO registration and credibility checks
  - Project proposal uploads
  - Auto-matching NGO projects with corporate needs
  - Bidding and matching workflow support

### 8. ⚙️ Admin Agent (`admin_agent.py`)
- **Purpose**: Handles user/role management and system administration
- **Key Features**:
  - User and role management (corporates, NGOs, regulators)
  - Agent settings configuration
  - System health monitoring
  - Integration management with ERP/Sustainability tools

### 9. 💬 Support Agent (`support_agent.py`)
- **Purpose**: Provides AI-powered chat assistance and feedback collection
- **Key Features**:
  - CSR rules and ESG standards assistance
  - FAQ handling
  - Feedback collection and issue resolution
  - Knowledge base management

## 🚀 Quick Start

### Prerequisites
```bash
pip install numpy
```

### Running the Test Suite
```bash
cd backend/agents
python test_agents.py
```

### Individual Agent Usage

#### Discovery Agent
```python
from discovery_agent import DiscoveryAgent

agent = DiscoveryAgent()
projects = agent.fetch_ngo_projects()
filtered_projects = agent.search_projects("education", {"sector": "Education"})
```

#### Alignment Agent
```python
from alignment_agent import AlignmentAgent

agent = AlignmentAgent()
alignment_results = agent.batch_align_projects(projects, corporate_profile)
top_recommendations = agent.get_top_recommendations(projects, corporate_profile, top_n=5)
```

#### Evaluation Agent
```python
from evaluation_agent import EvaluationAgent

agent = EvaluationAgent()
evaluation = agent.evaluate_project(project_data)
comparison_results = agent.compare_projects(project_list)
```

## 📊 Agent Workflow

```
1. Discovery Agent → Finds relevant projects
2. Alignment Agent → Scores project-corporate fit
3. Evaluation Agent → Compares projects side-by-side
4. Decision Support Agent → Generates board recommendations
5. Monitoring Agent → Tracks approved projects
6. Reporting Agent → Generates compliance reports
7. Marketplace Agent → Manages NGO interactions
8. Admin Agent → Manages system and users
9. Support Agent → Provides assistance and feedback
```

## 🔧 Configuration

Each agent can be configured through their respective initialization parameters:

```python
# Example: Configure Alignment Agent weights
alignment_agent = AlignmentAgent()
alignment_agent.alignment_weights = {
    'sdg_alignment': 0.4,
    'geographic_fit': 0.3,
    'budget_alignment': 0.2,
    'sector_relevance': 0.1
}
```

## 📈 Performance Metrics

The agents provide various performance metrics:

- **Discovery Agent**: Projects found, search accuracy, API response times
- **Alignment Agent**: Alignment scores, recommendation accuracy
- **Evaluation Agent**: Evaluation consistency, comparison accuracy
- **Decision Support Agent**: Decision quality, XAI explanation clarity
- **Monitoring Agent**: Alert accuracy, monitoring coverage
- **Reporting Agent**: Report generation time, compliance accuracy
- **Marketplace Agent**: Match success rate, NGO verification accuracy
- **Admin Agent**: System uptime, user management efficiency
- **Support Agent**: Response accuracy, user satisfaction

## 🔒 Security & Compliance

- All agents include proper error handling and logging
- Data privacy and security measures implemented
- Audit trails maintained for all AI recommendations
- Compliance with CSR-2 and ESG reporting standards

## 🛠️ Development

### Adding New Agents
1. Create a new Python file following the naming convention: `{purpose}_agent.py`
2. Implement the agent class with proper error handling
3. Add comprehensive logging
4. Include unit tests
5. Update this README with agent documentation

### Testing
```bash
# Run individual agent tests
python -m pytest test_discovery_agent.py
python -m pytest test_alignment_agent.py

# Run all tests
python -m pytest
```

## 📝 API Documentation

Each agent provides a consistent API interface:

- **Initialization**: `AgentName()`
- **Main Methods**: Core functionality methods
- **Utility Methods**: Helper functions
- **Error Handling**: Consistent exception handling
- **Logging**: Comprehensive logging for debugging

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add comprehensive docstrings and comments
3. Include error handling and logging
4. Write unit tests for new functionality
5. Update documentation

## 📄 License

This project is part of the SustainAlign platform. All agents are designed to work together to provide comprehensive CSR/ESG project management capabilities.

## 🆘 Support

For technical support or questions about the agents:
- Check the individual agent documentation
- Review the test files for usage examples
- Contact the development team

---

**Note**: These agents are designed as standalone modules for demonstration purposes. In a production environment, they would be integrated with the main SustainAlign application and connected to real data sources and APIs.
