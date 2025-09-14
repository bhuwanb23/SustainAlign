# Backend Directory Structure

This document explains the organization and purpose of each directory and file in the SustainAlign backend.

## 📁 Directory Organization

### Core Application
- **`app.py`** - Main Flask application entry point
- **`models.py`** - Central model imports and configuration
- **`utils.py`** - Utility functions and helpers
- **`requirements.txt`** - Python package dependencies

### Configuration & Data
- **`config/`** - Configuration files and templates
  - `env_example.txt` - Environment variables template
- **`data/`** - Database files and data storage
  - `sustainalign.db` - SQLite database file
- **`instance/`** - Flask instance-specific files

### Application Logic
- **`models/`** - Database models and schemas
  - `user.py` - User management models
  - `projects.py` - Project data models
  - `company_details.py` - Company profile models
  - `ai_matching.py` - AI matching models
  - `approval.py` - Approval workflow models
  - `audit.py` - Audit trail models
  - `comparison.py` - Project comparison models
  - `impact.py` - Impact assessment models
  - `ngo_marketplace.py` - NGO marketplace models
  - `rationale.py` - Decision rationale models
  - `reporting.py` - Reporting models
  - `risk.py` - Risk assessment models
  - `tracker.py` - Project tracking models

- **`routes/`** - API endpoints and route handlers
  - `auth.py` - Authentication routes
  - `projects.py` - Project management routes
  - `ai_matching.py` - AI matching routes
  - `enhanced_ai_matching.py` - Enhanced AI matching
  - `watson_agents.py` - WatsonX agent routes
  - `approvals.py` - Approval workflow routes
  - `comparisons.py` - Project comparison routes
  - `profile.py` - User profile routes
  - `reports.py` - Reporting routes
  - `views.py` - General view routes

- **`ai_models/`** - AI/ML model implementations
  - `ai_matching_service.py` - Core AI matching logic
  - `ai_model.py` - AI model configuration
  - `watson_enhanced_matching.py` - WatsonX integration

### IBM WatsonX Integration
- **`ibm_watson/`** - Complete WatsonX Orchestrate integration
  - `agents/` - WatsonX agent YAML definitions
    - `csr_matching_agent.yaml` - CSR matching agent
    - `project_evaluation_agent.yaml` - Project evaluation agent
    - `decision_support_agent.yaml` - Decision support agent
    - `impact_assessment_agent.yaml` - Impact assessment agent
  - `tools/` - WatsonX tool implementations
    - `project_analyzer.py` - Project analysis tool
    - `impact_calculator.py` - Impact calculation tool
    - `risk_assessor.py` - Risk assessment tool
    - `budget_optimizer.py` - Budget optimization tool
    - `*.yaml` - Tool YAML definitions
  - `deploy_agents.py` - Agent deployment automation
  - `test_integration.py` - Integration testing
  - `demo_integration.py` - Live demonstration
  - `README.md` - Comprehensive setup guide

### Legacy Components
- **`agents/`** - Legacy agent implementations
  - `admin_agent.py` - Administrative functions
  - `alignment_agent.py` - Project alignment logic
  - `decision_support_agent.py` - Decision support
  - `discovery_agent.py` - Project discovery
  - `evaluation_agent.py` - Project evaluation
  - `marketplace_agent.py` - Marketplace functions
  - `monitoring_agent.py` - Monitoring and tracking
  - `reporting_agent.py` - Reporting functions
  - `support_agent.py` - Support functions
  - `test_agents.py` - Agent testing

### Development & Testing
- **`scripts/`** - Utility and maintenance scripts
  - `migrate.py` - Database migration script
  - `seed_database.py` - Database seeding script
  - `generate_password_hashes.py` - Password utilities
  - `fix_tracker_tables.py` - Database fixes

- **`tests/`** - Test files and test data
  - `test_api.py` - API endpoint tests
  - `test_watson_integration.py` - WatsonX integration tests
  - `watson_integration_test_report.json` - Test results

- **`sample_data/`** - Sample data generators
  - `user_sample.py` - User sample data
  - `projects_sample.py` - Project sample data
  - `company_details_sample.py` - Company sample data
  - `ai_matching_sample.py` - AI matching sample data
  - `approval_sample.py` - Approval sample data
  - `audit_sample.py` - Audit sample data
  - `comparison_sample.py` - Comparison sample data
  - `impact_sample.py` - Impact sample data
  - `ngo_marketplace_sample.py` - NGO sample data
  - `rationale_sample.py` - Rationale sample data
  - `reporting_sample.py` - Reporting sample data
  - `risk_sample.py` - Risk sample data
  - `tracker_sample.py` - Tracker sample data

### Documentation & Templates
- **`docs/`** - Documentation files
  - `IBM_WATSON_INTEGRATION_SUMMARY.md` - Integration summary
  - `ENVIRONMENT_SETUP.md` - Environment setup guide
  - `DIRECTORY_STRUCTURE.md` - This file

- **`templates/`** - HTML templates
  - `base.html` - Base template
  - `dashboard.html` - Dashboard view
  - `projects.html` - Projects view
  - `users.html` - Users view
  - `api_docs.html` - API documentation
  - `database.html` - Database view
  - `health.html` - Health check view
  - `index.html` - Home page

### Environment
- **`venv/`** - Python virtual environment
- **`__pycache__/`** - Python bytecode cache
- **`.gitignore`** - Git ignore rules

## 🎯 Organization Principles

### 1. **Separation of Concerns**
- Models, routes, and business logic are separated
- AI integration is isolated in its own directory
- Configuration is centralized

### 2. **Scalability**
- Modular structure allows easy addition of new features
- Clear separation between legacy and new components
- Independent testing and documentation

### 3. **Maintainability**
- Related files are grouped together
- Clear naming conventions
- Comprehensive documentation

### 4. **Development Workflow**
- Scripts for common tasks
- Sample data for testing
- Comprehensive test coverage

## 🔄 File Movement History

The following files were moved during reorganization:

### Moved to `docs/`
- `IBM_WATSON_INTEGRATION_SUMMARY.md`
- `ENVIRONMENT_SETUP.md`

### Moved to `tests/`
- `test_api.py`
- `test_watson_integration.py`
- `watson_integration_test_report.json`

### Moved to `config/`
- `env_example.txt`

### Moved to `scripts/`
- `migrate.py`
- `seed_database.py`
- `generate_password_hashes.py`
- `fix_tracker_tables.py`

### Moved to `data/`
- `sustainalign.db`

## 📋 Best Practices

### Adding New Features
1. **Models**: Add to `models/` directory
2. **API Routes**: Add to `routes/` directory
3. **Templates**: Add to `templates/` directory
4. **Tests**: Add to `tests/` directory
5. **Documentation**: Add to `docs/` directory

### File Naming
- Use snake_case for Python files
- Use descriptive names that indicate purpose
- Group related files in subdirectories

### Dependencies
- Keep `requirements.txt` updated
- Use virtual environment for isolation
- Document any new dependencies

This organization provides a clean, maintainable structure that supports the current functionality while allowing for future growth and development.
