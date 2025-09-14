# SustainAlign Backend

A comprehensive CSR platform backend with AI-powered project analysis and IBM WatsonX Orchestrate integration.

## 📁 Directory Structure

```
backend/
├── 📁 ai_models/           # AI/ML model implementations
├── 📁 agents/              # Legacy agent implementations  
├── 📁 config/              # Configuration files
├── 📁 data/                # Database and data files
├── 📁 docs/                # Documentation
├── 📁 ibm_watson/          # IBM WatsonX Orchestrate Integration
├── 📁 instance/            # Flask instance folder
├── 📁 models/              # Database models
├── 📁 routes/              # API endpoints
├── 📁 sample_data/         # Sample data generators
├── 📁 scripts/             # Utility scripts
├── 📁 templates/           # HTML templates
├── 📁 tests/               # Test files
├── 📁 venv/                # Python virtual environment
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Copy config template
cp config/env_example.txt .env

# Edit .env with your credentials
```

### 2. Install Dependencies
```bash
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt
```

### 3. Setup Database
```bash
# Run migrations
python scripts/migrate.py

# Seed database
python scripts/seed_database.py
```

### 4. Start Application
```bash
python app.py
```

## 🤖 AI Features

### IBM WatsonX Orchestrate Integration

#### AI Agents
- **CSR Matching Agent** - Analyzes company objectives and matches NGO projects
- **Project Evaluation Agent** - Evaluates project feasibility and impact
- **Decision Support Agent** - Provides strategic investment recommendations
- **Impact Assessment Agent** - Measures social and environmental impact

#### AI Tools
- **Project Analyzer** - Analyzes project alignment and feasibility
- **Impact Calculator** - Calculates comprehensive impact metrics
- **Risk Assessor** - Assesses project risks and mitigation strategies
- **Budget Optimizer** - Optimizes budget allocation across projects

### IBM WatsonX Orchestrate Setup

#### Prerequisites
- Docker installed and running
- IBM WatsonX Orchestrate API key
- Python 3.8+ with virtual environment

#### Step-by-Step Setup

**1. Install IBM WatsonX Orchestrate ADK**
```bash
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install WatsonX Orchestrate
pip install ibm-watsonx-orchestrate
```

**2. Configure Environment**
```bash
# Copy environment template
cp config/env_example.txt .env

# Edit .env with your credentials
# Add these variables:
WO_DEVELOPER_EDITION_SOURCE=orchestrate
WO_API_KEY=your-watsonx-orchestrate-api-key
WO_INSTANCE=https://api.ap-south-1.dl.watson-orchestrate.ibm.com/instances/your-instance-id
WATSON_API_KEY=your-watson-api-key
WATSON_SERVICE_URL=https://api.ap-south-1.dl.watson-orchestrate.ibm.com
```

**3. Start WatsonX Orchestrate Server**
```bash
# Navigate to WatsonX directory
cd ibm_watson

# Activate local environment
orchestrate env activate local

# Start server (requires Docker)
orchestrate server start -e ../.env

# Wait for server to fully start (check Docker containers)
docker ps
```

**4. Deploy AI Tools**
```bash
# Import all tools (run these commands in ibm_watson directory)
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate tools import -k python -f tools/impact_calculator.py
orchestrate tools import -k python -f tools/risk_assessor.py
orchestrate tools import -k python -f tools/budget_optimizer.py

# Verify tools are deployed
orchestrate tools list
```

**5. Deploy AI Agents**
```bash
# Import all agents (run these commands in ibm_watson directory)
orchestrate agents import -f agents/csr_matching_agent.yaml
orchestrate agents import -f agents/project_evaluation_agent.yaml
orchestrate agents import -f agents/decision_support_agent.yaml
orchestrate agents import -f agents/impact_assessment_agent.yaml

# Verify agents are deployed
orchestrate agents list
```

**6. Start Chat Interface**
```bash
# Start interactive chat interface
orchestrate chat start

# This opens web interface at: http://localhost:3000/chat-lite
```

#### Essential WatsonX Commands

**Server Management**
```bash
# Check server status
orchestrate server status

# View server logs
orchestrate server logs

# Stop server
orchestrate server stop

# Restart server
orchestrate server restart
```

**Environment Management**
```bash
# List environments
orchestrate env list

# Activate environment
orchestrate env activate local

# Deactivate environment
orchestrate env deactivate
```

**Tools Management**
```bash
# List all tools
orchestrate tools list

# Import single tool
orchestrate tools import -k python -f tools/tool_name.py

# Remove tool
orchestrate tools remove tool_name

# Get tool details
orchestrate tools get tool_name
```

**Agents Management**
```bash
# List all agents
orchestrate agents list

# Import single agent
orchestrate agents import -f agents/agent_name.yaml

# Remove agent
orchestrate agents remove agent_name

# Get agent details
orchestrate agents get agent_name
```

**Chat & Interaction**
```bash
# Start chat interface
orchestrate chat start

# Start chat with specific agent
orchestrate chat start --agent agent_name

# List available agents for chat
orchestrate chat agents
```

**Health & Debugging**
```bash
# Check system health
orchestrate health

# Check Docker containers
docker ps

# View container logs
docker logs container_name

# Check API connectivity
curl http://localhost:4321/health
```

#### Troubleshooting

**Common Issues & Solutions**

1. **Docker not running**
   ```bash
   # Start Docker Desktop
   # Check Docker status
   docker --version
   docker ps
   ```

2. **Server won't start**
   ```bash
   # Check environment variables
   cat .env
   
   # Restart Docker
   # Try again
   orchestrate server start -e ../.env
   ```

3. **Tools/Agents not importing**
   ```bash
   # Check file paths
   ls tools/
   ls agents/
   
   # Verify YAML syntax
   # Check Python tool decorators
   ```

4. **Chat interface not loading**
   ```bash
   # Check if server is running
   orchestrate server status
   
   # Check port 3000
   netstat -an | findstr :3000
   
   # Restart chat
   orchestrate chat start
   ```

#### Web Interface Usage

**Access Points**
- **Chat Interface**: http://localhost:3000/chat-lite
- **Admin Dashboard**: http://localhost:3000/admin
- **API Documentation**: http://localhost:3000/docs

**Using AI Agents**
1. Open chat interface
2. Select agent from dropdown
3. Type your query or request
4. Agent will use appropriate tools
5. Review responses and recommendations

**Example Queries**
- "Analyze this project for CSR alignment"
- "Calculate impact metrics for education project"
- "Assess risks for environmental initiative"
- "Optimize budget allocation across projects"

## 📊 Key API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/projects` - List projects
- `POST /api/ai-matching/match` - AI project matching
- `GET /api/company` - Company profile management

## 🧪 Testing

```bash
# Run all tests
python -m pytest tests/

# Run specific tests
python tests/test_api.py
python tests/test_watson_integration.py
```

## 📚 Documentation

- **WatsonX Integration**: `ibm_watson/README.md`
- **WatsonX Commands**: `ibm_watson/WATSONX_COMMANDS.md`
- **Environment Setup**: `docs/ENVIRONMENT_SETUP.md`
- **API Documentation**: Available at `/docs` when running

## 🔧 Configuration

Key environment variables in `.env`:
```bash
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///data/sustainalign.db
WO_API_KEY=your-watsonx-api-key
WO_INSTANCE=your-instance-url
```

## 🎯 Features

- ✅ User authentication and management
- ✅ Project management and tracking
- ✅ AI-powered project matching
- ✅ IBM WatsonX Orchestrate integration
- ✅ RESTful API endpoints
- ✅ Comprehensive testing
- ✅ Database migrations

---

**SustainAlign Backend** - Empowering CSR through AI-driven insights.