# IBM WatsonX Orchestrate Command Reference

Complete reference for all IBM WatsonX Orchestrate commands used in SustainAlign.

## 🚀 Quick Start Commands

### Complete Setup (One-time)
```bash
# 1. Install and setup
cd backend/ibm_watson
pip install ibm-watsonx-orchestrate
orchestrate env activate local

# 2. Start server
orchestrate server start -e ../.env

# 3. Deploy tools
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate tools import -k python -f tools/impact_calculator.py
orchestrate tools import -k python -f tools/risk_assessor.py
orchestrate tools import -k python -f tools/budget_optimizer.py

# 4. Deploy agents
orchestrate agents import -f agents/csr_matching_agent.yaml
orchestrate agents import -f agents/project_evaluation_agent.yaml
orchestrate agents import -f agents/decision_support_agent.yaml
orchestrate agents import -f agents/impact_assessment_agent.yaml

# 5. Start chat
orchestrate chat start
```

## 📋 Command Categories

### 🔧 Server Management

#### Start/Stop Server
```bash
# Start server
orchestrate server start -e ../.env

# Stop server
orchestrate server stop

# Restart server
orchestrate server restart

# Check server status
orchestrate server status
```

#### Server Logs & Debugging
```bash
# View server logs
orchestrate server logs

# Follow logs in real-time
orchestrate server logs --follow

# Check server health
orchestrate health

# Check Docker containers
docker ps

# View container logs
docker logs container_name
```

### 🌍 Environment Management

#### Environment Operations
```bash
# List all environments
orchestrate env list

# Activate local environment
orchestrate env activate local

# Deactivate current environment
orchestrate env deactivate

# Check current environment
orchestrate env current
```

### 🛠️ Tools Management

#### Tool Operations
```bash
# List all tools
orchestrate tools list

# Import single tool
orchestrate tools import -k python -f tools/tool_name.py

# Import multiple tools
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate tools import -k python -f tools/impact_calculator.py
orchestrate tools import -k python -f tools/risk_assessor.py
orchestrate tools import -k python -f tools/budget_optimizer.py

# Get tool details
orchestrate tools get tool_name

# Remove tool
orchestrate tools remove tool_name

# Update tool
orchestrate tools update -k python -f tools/tool_name.py
```

#### Tool Verification
```bash
# Check if tools are working
orchestrate tools test tool_name

# List tool capabilities
orchestrate tools capabilities tool_name

# Get tool schema
orchestrate tools schema tool_name
```

### 🤖 Agents Management

#### Agent Operations
```bash
# List all agents
orchestrate agents list

# Import single agent
orchestrate agents import -f agents/agent_name.yaml

# Import multiple agents
orchestrate agents import -f agents/csr_matching_agent.yaml
orchestrate agents import -f agents/project_evaluation_agent.yaml
orchestrate agents import -f agents/decision_support_agent.yaml
orchestrate agents import -f agents/impact_assessment_agent.yaml

# Get agent details
orchestrate agents get agent_name

# Remove agent
orchestrate agents remove agent_name

# Update agent
orchestrate agents update -f agents/agent_name.yaml
```

#### Agent Verification
```bash
# Test agent
orchestrate agents test agent_name

# Check agent status
orchestrate agents status agent_name

# Get agent logs
orchestrate agents logs agent_name
```

### 💬 Chat & Interaction

#### Chat Operations
```bash
# Start chat interface
orchestrate chat start

# Start chat with specific agent
orchestrate chat start --agent agent_name

# List available agents for chat
orchestrate chat agents

# Stop chat
orchestrate chat stop
```

#### Chat Configuration
```bash
# Set chat preferences
orchestrate chat config --theme dark
orchestrate chat config --model watsonx/ibm/granite-3-2-8b-instruct

# Get chat status
orchestrate chat status
```

### 🔍 Monitoring & Debugging

#### System Health
```bash
# Check overall health
orchestrate health

# Check specific component
orchestrate health --component server
orchestrate health --component tools
orchestrate health --component agents

# Get system info
orchestrate info
```

#### Logging & Debugging
```bash
# Enable debug mode
orchestrate config --debug true

# View all logs
orchestrate logs

# Filter logs by component
orchestrate logs --component server
orchestrate logs --component tools
orchestrate logs --component agents

# Clear logs
orchestrate logs --clear
```

### 🔧 Configuration

#### Configuration Management
```bash
# View current config
orchestrate config

# Set configuration
orchestrate config --key value

# Reset configuration
orchestrate config --reset

# Export configuration
orchestrate config --export config.json

# Import configuration
orchestrate config --import config.json
```

## 🎯 SustainAlign Specific Commands

### Complete Deployment
```bash
# Deploy all SustainAlign components
cd backend/ibm_watson

# Start server
orchestrate server start -e ../.env

# Deploy all tools
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate tools import -k python -f tools/impact_calculator.py
orchestrate tools import -k python -f tools/risk_assessor.py
orchestrate tools import -k python -f tools/budget_optimizer.py

# Deploy all agents
orchestrate agents import -f agents/csr_matching_agent.yaml
orchestrate agents import -f agents/project_evaluation_agent.yaml
orchestrate agents import -f agents/decision_support_agent.yaml
orchestrate agents import -f agents/impact_assessment_agent.yaml

# Start chat interface
orchestrate chat start
```

### Verification Commands
```bash
# Verify all tools are deployed
orchestrate tools list | grep -E "(project_analyzer|impact_calculator|risk_assessor|budget_optimizer)"

# Verify all agents are deployed
orchestrate agents list | grep -E "(csr_matching|project_evaluation|decision_support|impact_assessment)"

# Check system health
orchestrate health

# Test chat interface
orchestrate chat start
```

### Troubleshooting Commands
```bash
# Check server status
orchestrate server status

# View server logs
orchestrate server logs

# Check Docker containers
docker ps

# Restart if needed
orchestrate server restart

# Re-deploy if needed
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate agents import -f agents/csr_matching_agent.yaml
```

## 🌐 Web Interface Access

### Access Points
- **Chat Interface**: http://localhost:3000/chat-lite
- **Admin Dashboard**: http://localhost:3000/admin
- **API Documentation**: http://localhost:3000/docs
- **Health Check**: http://localhost:4321/health

### Using the Web Interface
1. Open http://localhost:3000/chat-lite
2. Select an agent from the dropdown
3. Type your query or request
4. Agent will use appropriate tools
5. Review responses and recommendations

## 🔧 Environment Variables

### Required Variables
```bash
WO_DEVELOPER_EDITION_SOURCE=orchestrate
WO_API_KEY=your-watsonx-orchestrate-api-key
WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com/instances/your-instance-id
WATSON_API_KEY=your-watson-api-key
WATSON_SERVICE_URL=https://api.ap-south-1.dl.watson-orchestrate.ibm.com
```

### Optional Variables
```bash
CALLBACK_HOST_URL=http://192.168.48.1:4321
WATSON_DEFAULT_LLM=watsonx/ibm/granite-3-2-8b-instruct
WATSON_LOG_LEVEL=INFO
WATSON_ENABLE_DEBUG=false
```

## 🚨 Common Issues & Solutions

### Issue: Server won't start
```bash
# Check Docker
docker --version
docker ps

# Check environment
cat .env

# Restart Docker
# Try again
orchestrate server start -e ../.env
```

### Issue: Tools not importing
```bash
# Check file paths
ls tools/
ls agents/

# Check Python syntax
python -m py_compile tools/project_analyzer.py

# Re-import
orchestrate tools import -k python -f tools/project_analyzer.py
```

### Issue: Agents not importing
```bash
# Check YAML syntax
python -c "import yaml; yaml.safe_load(open('agents/csr_matching_agent.yaml'))"

# Re-import
orchestrate agents import -f agents/csr_matching_agent.yaml
```

### Issue: Chat not loading
```bash
# Check server status
orchestrate server status

# Check port 3000
netstat -an | findstr :3000

# Restart chat
orchestrate chat stop
orchestrate chat start
```

## 📚 Additional Resources

- **IBM WatsonX Orchestrate Documentation**: https://ibm.github.io/watsonx-orchestrate/
- **SustainAlign Backend README**: `backend/README.md`
- **IBM WatsonX Integration Guide**: `backend/ibm_watson/README.md`
- **Environment Setup**: `backend/docs/ENVIRONMENT_SETUP.md`

---

**Command Reference** - Complete IBM WatsonX Orchestrate commands for SustainAlign integration.
