# SustainAlign Backend - Quick Reference

## 🚀 Essential Commands

### Setup & Installation
```bash
# Copy environment template
cp config/env_example.txt .env

# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Setup database
python scripts/migrate.py
python scripts/seed_database.py

# Start application
python app.py
```

### IBM WatsonX Integration
```bash
# Navigate to WatsonX directory
cd ibm_watson

# Start WatsonX server
orchestrate server start -e ../.env

# Activate local environment
orchestrate env activate local

# Deploy tools
orchestrate tools import -k python -f tools/project_analyzer.py
orchestrate tools import -k python -f tools/impact_calculator.py
orchestrate tools import -k python -f tools/risk_assessor.py
orchestrate tools import -k python -f tools/budget_optimizer.py

# Deploy agents
orchestrate agents import -f agents/csr_matching_agent.yaml
orchestrate agents import -f agents/project_evaluation_agent.yaml
orchestrate agents import -f agents/decision_support_agent.yaml
orchestrate agents import -f agents/impact_assessment_agent.yaml

# Start chat interface
orchestrate chat start
```

## 📁 Key Directories

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `config/` | Configuration | `env_example.txt` |
| `data/` | Database files | `sustainalign.db` |
| `docs/` | Documentation | `DIRECTORY_STRUCTURE.md` |
| `ibm_watson/` | AI Integration | `agents/`, `tools/` |
| `models/` | Database models | `user.py`, `projects.py` |
| `routes/` | API endpoints | `auth.py`, `projects.py` |
| `scripts/` | Utility scripts | `migrate.py`, `seed_database.py` |
| `tests/` | Test files | `test_api.py` |

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Flask
SECRET_KEY=your-secret-key
FLASK_ENV=development
DATABASE_URL=sqlite:///data/sustainalign.db

# IBM WatsonX
WO_DEVELOPER_EDITION_SOURCE=orchestrate
WO_API_KEY=your-api-key
WO_INSTANCE=your-instance-url
WATSON_API_KEY=your-api-key
WATSON_SERVICE_URL=your-service-url
```

## 🧪 Testing

```bash
# Run all tests
python -m pytest tests/

# Run specific tests
python tests/test_api.py
python tests/test_watson_integration.py
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/<id>`
- `PUT /api/projects/<id>`
- `DELETE /api/projects/<id>`

### AI Matching
- `POST /api/ai-matching/match`
- `GET /api/ai-matching/recommendations`

## 🤖 AI Agents

1. **CSR Matching Agent** - Project-company alignment
2. **Project Evaluation Agent** - Feasibility assessment
3. **Decision Support Agent** - Investment recommendations
4. **Impact Assessment Agent** - Impact measurement

## 🛠️ AI Tools

1. **Project Analyzer** - Alignment analysis
2. **Impact Calculator** - Impact metrics
3. **Risk Assessor** - Risk assessment
4. **Budget Optimizer** - Budget allocation

## 📚 Documentation

- **Main README**: `README.md`
- **Directory Structure**: `docs/DIRECTORY_STRUCTURE.md`
- **WatsonX Integration**: `ibm_watson/README.md`
- **Environment Setup**: `docs/ENVIRONMENT_SETUP.md`

## 🔍 Troubleshooting

### Common Issues
1. **Database errors**: Run `python scripts/migrate.py`
2. **Import errors**: Check virtual environment activation
3. **WatsonX errors**: Verify API keys in `.env`
4. **Port conflicts**: Check if ports 5000, 3000, 4321 are free

### Debug Commands
```bash
# Check database
python -c "from models import db; print('DB OK')"

# Check WatsonX
cd ibm_watson && orchestrate health

# Check API
curl http://localhost:5000/api/health
```

## 🎯 Development Workflow

1. **Make changes** to models, routes, or templates
2. **Run tests** to verify functionality
3. **Update documentation** if needed
4. **Test WatsonX integration** if AI features changed
5. **Commit changes** with descriptive messages

---

**Quick Reference** - Essential commands and information for SustainAlign backend development.
