# SustainAlign Backend (Flask)

A lightweight Flask API to support authentication and core endpoints for the SustainAlign hackathon app.

## Features
- JWT authentication (signup, login, forgot-password stub)
- SQLAlchemy models with SQLite by default
- CORS enabled for local frontend
- Health check endpoint
- Comprehensive company profile management
- CSR/ESG data management
- Document upload support
- Modular model structure for easy maintenance

## Quick start

1. Create a virtual environment and install deps

```bash
python -m venv .venv
./venv/Scripts/activate  # Windows PowerShell
pip install -r requirements.txt
```

2. Configure environment

Create a `.env` file with:

```
FLASK_ENV=development
SECRET_KEY=change-this-secret
CORS_ORIGIN=http://localhost:5173
PORT=5000
DATABASE_URL=sqlite:///sustainalign.db
PASSWORD_SALT=please-change-salt
```

3. Setup Database

```bash
# Create all database tables
python migrate.py create

# Create sample data for testing
python migrate.py sample

# Verify database setup
python migrate.py info
```

4. Run the server

```bash
python app.py
```

API will be available at `http://localhost:5000`.

## Database Management

### Initial Setup

```bash
# Create all tables from models
python migrate.py create

# Create sample data
python migrate.py sample

# Show database information
python migrate.py info
```

### Database Operations

```bash
# Drop all tables (DANGEROUS - deletes all data)
python migrate.py drop

# Reset everything (drop + create + sample data)
python migrate.py reset

# Show current database status
python migrate.py info
```

### Adding New Tables/Models

1. **Create new model file** in `models/` folder:
```python
# models/new_feature.py
from datetime import datetime
from .base import db

class NewModel(db.Model):
    __tablename__ = 'new_models'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat(),
        }
```

2. **Update `models/__init__.py`**:
```python
from .new_feature import NewModel

__all__ = [
    # ... existing models
    'NewModel'
]
```

3. **Create new tables**:
```bash
python migrate.py create
```

### Database Schema Updates

For existing databases with data:

```bash
# Create new tables (preserves existing data)
python migrate.py create

# If you need to reset everything
python migrate.py reset
```

### Testing Database

```bash
# Run comprehensive API tests
python test_api.py

# Test specific endpoints
curl -X GET http://localhost:5000/api/health
```

## Model Structure

The backend uses a modular model structure:

```
models/
├── __init__.py          # Main import file
├── base.py              # SQLAlchemy database instance
├── user.py              # User authentication model
├── company_details.py   # All company-related models
└── README.md           # Detailed model documentation
```

### Core Models
- **User** - User authentication and basic profile
- **Company** - Main company information and relationships
- **CompanyBranch** - Company branch locations
- **CSRContact** - CSR contact person details
- **Budget** - CSR budget and financial information
- **FocusArea** - ESG goals and SDG priorities
- **ComplianceDocument** - Policy, report, and certificate files
- **NGOPreference** - NGO partnership preferences
- **AIConfig** - AI optimization settings
- **UserRole** - Company user roles and access

## Endpoints

### Authentication
- `GET /api/health` – health check
- `POST /api/auth/signup` – body: `{ email, password, role }`
- `POST /api/auth/login` – body: `{ email, password }`
- `POST /api/auth/forgot-password` – body: `{ email }` (stub only)

### Profile Management
- `GET /api/profile/me` – get current user profile
- `GET /api/profile/companies` – get all companies for current user
- `GET /api/profile/companies/<id>` – get specific company details
- `POST /api/profile/companies` – create new company profile
- `PUT /api/profile/companies/<id>` – update company profile
- `DELETE /api/profile/companies/<id>` – delete company profile
- `POST /api/profile/companies/<id>/documents` – upload compliance document

## API Request/Response Examples

### Create Company Profile
```json
POST /api/profile/companies
Authorization: Bearer <jwt_token>

{
  "company": {
    "companyName": "TechCorp Solutions",
    "logoFile": "https://example.com/logo.png",
    "registrationId": "TECH001",
    "industry": "Technology",
    "hq": {
      "country": "India",
      "state": "Karnataka",
      "city": "Bangalore"
    },
    "branches": [
      {
        "country": "India",
        "state": "Maharashtra",
        "city": "Mumbai"
      }
    ]
  },
  "contact": {
    "csrContactName": "Priya Sharma",
    "csrContactRole": "CSR Manager",
    "csrEmail": "priya@techcorp.com",
    "csrPhone": "+91-9876543210",
    "website": "https://techcorp.com"
  },
  "budget": {
    "amount": 5000000,
    "currency": "INR",
    "projectSize": "Medium",
    "splits": {
      "education": 30,
      "healthcare": 25,
      "environment": 45
    }
  },
  "focus": {
    "prioritySdgs": ["Quality Education", "Climate Action", "Industry & Innovation"],
    "esgGoals": "Net Zero by 2035, Women in Leadership 40% by 2030",
    "themes": "Digital literacy, Renewable energy",
    "targetYear": "2030",
    "reportingStandard": "GRI"
  },
  "ngoPrefs": {
    "ngoSize": "Mid-level",
    "partnershipModel": "Funding + Execution",
    "regions": ["Local", "National"],
    "spendHistory": "Previous CSR spend on education projects"
  },
  "ai": {
    "optimizeFor": ["Impact", "Budget efficiency"],
    "riskAppetite": "Medium",
    "alignmentMode": "Strict compliance",
    "integrations": ["SAP", "Workday"]
  },
  "access": {
    "roles": [
      {
        "email": "admin@techcorp.com",
        "role": "Admin"
      },
      {
        "email": "csr@techcorp.com",
        "role": "CSR Manager"
      }
    ]
  }
}
```

### Response
```json
{
  "message": "Company profile created successfully",
  "company": {
    "id": 1,
    "user_id": 1,
    "company_name": "TechCorp Solutions",
    "logo_url": "https://example.com/logo.png",
    "registration_id": "TECH001",
    "industry": "Technology",
    "hq_country": "India",
    "hq_state": "Karnataka",
    "hq_city": "Bangalore",
    "website": "https://techcorp.com",
    "created_at": "2024-01-15T10:30:00",
    "updated_at": "2024-01-15T10:30:00",
    "branches": [...],
    "csr_contact": {...},
    "budget": {...},
    "focus_area": {...},
    "compliance_documents": [...],
    "ngo_preferences": {...},
    "ai_config": {...},
    "user_roles": [...]
  }
}
```

## Project structure
```
backend/
├── app.py                 # app factory and blueprint registration
├── models.py              # main models import (backward compatibility)
├── utils.py               # hashing, JWT helpers
├── migrate.py             # database migration and setup scripts
├── test_api.py            # API testing script
├── requirements.txt       # Python dependencies
├── models/                # Modular model structure
│   ├── __init__.py        # Model exports
│   ├── base.py            # SQLAlchemy database instance
│   ├── user.py            # User authentication model
│   ├── company_details.py # All company-related models
│   └── README.md          # Model documentation
├── routes/                # API endpoints
│   ├── auth.py            # authentication endpoints
│   ├── profile.py         # company profile management
│   ├── projects.py        # project management
│   ├── reports.py         # reporting endpoints
│   └── views.py           # view pages
└── templates/             # HTML templates
```

## Development Workflow

### Adding New Features

1. **Create new model** (if needed):
```bash
# Add model to models/ folder
# Update models/__init__.py
python migrate.py create
```

2. **Add new routes**:
```bash
# Create new route file in routes/ folder
# Register blueprint in app.py
```

3. **Test changes**:
```bash
python test_api.py
```

### Database Migrations

```bash
# For new tables
python migrate.py create

# For schema changes (reset everything)
python migrate.py reset

# For production (manual migration)
# 1. Backup existing data
# 2. Update models
# 3. Run create command
# 4. Restore data if needed
```

### Testing

```bash
# Run all tests
python test_api.py

# Test specific endpoints
curl -X GET http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","role":"corporate"}'
```

## Troubleshooting

### Common Issues

**Import Errors:**
```bash
# Make sure you're in the backend directory
cd backend

# Check if virtual environment is activated
which python  # Should show .venv/bin/python
```

**Database Issues:**
```bash
# Reset database completely
python migrate.py reset

# Check database status
python migrate.py info
```

**API Errors:**
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Check server logs
python app.py
```

### Sample Data

After running `python migrate.py sample`, you can use:
- **Email**: `demo@techcorp.com`
- **Password**: `demo123`

## Production Notes

- Change all default secrets and salts
- Use proper database (PostgreSQL, MySQL) instead of SQLite
- Implement proper file upload to cloud storage
- Add rate limiting and security headers
- Use environment variables for all configuration
- Implement proper logging and monitoring
- Add database backups and recovery procedures

## Development notes
- The DB file `sustainalign.db` will be created automatically on first run.
- Do not use static salts or dev secrets in production.
- JSON fields are used for flexible data storage (SDGs, budget splits, etc.).
- File uploads are placeholder implementations - integrate with cloud storage in production.
- All endpoints require JWT authentication via Authorization header.
- Cascade deletes ensure data integrity when companies are removed.
- Modular model structure allows easy addition of new features.
