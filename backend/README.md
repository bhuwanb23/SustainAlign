# SustainAlign Backend (Flask 3)

A comprehensive Flask API supporting the complete SustainAlign CSR/ESG management platform with AI agents, comprehensive data models, and automated workflows.

## 🌟 Features
- **JWT Authentication** - Multi-role user management (corporate, ngo, admin, regulator)
- **AI Agent Integration** - 6 specialized AI agents for CSR/ESG lifecycle management
- **Comprehensive Data Models** - 25+ models covering projects, companies, NGOs, impact tracking
- **Sample Data Seeding** - Rich, realistic data for development and demos
- **Modular Architecture** - Blueprint-based API organization with clean separation
- **Advanced Analytics** - Impact metrics, risk scoring, compliance tracking
- **Document Management** - File uploads, compliance documents, NGO certificates
- **Real-time Monitoring** - Project tracking, alerts, impact dashboards

## 🚀 Quick Start

1. **Create and activate virtual environment**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows PowerShell
source .venv/bin/activate  # macOS/Linux
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**
Create a `.env` file with:
```env
FLASK_ENV=development
SECRET_KEY=change-this-secret
CORS_ORIGIN=http://localhost:5173
PORT=5000
DATABASE_URL=sqlite:///sustainalign.db
PASSWORD_SALT=please-change-salt
```

4. **Setup Database with Sample Data**
```bash
# Seed database with comprehensive sample data
python seed_database.py

# Alternative: Use migrate.py for basic setup
python migrate.py create
python migrate.py sample
```

5. **Run the server**
```bash
python app.py
```

API will be available at `http://localhost:5000`.

## 🗄️ Database Management

### Sample Data Seeding (Recommended)
```bash
# Comprehensive seeding with realistic data
python seed_database.py
```

This creates:
- **13 Users** (corporate, NGO, admin, regulator roles)
- **5 Companies** with complete profiles
- **15+ Projects** with milestones and impact reports
- **NGO Profiles** with transparency reports and certificates
- **AI Matches** and approval workflows
- **Impact Metrics** and monitoring data
- **Risk Assessments** and compliance tracking

### Basic Database Operations
```bash
# Create all tables from models
python migrate.py create

# Create basic sample data
python migrate.py sample

# Show database information
python migrate.py info

# Reset everything (drop + create + sample data)
python migrate.py reset
```

## 🏗️ Model Architecture

### Core Models (25+ Models)

#### **User & Authentication**
- `User` - Multi-role authentication (corporate, ngo, admin, regulator)
- `UserRole` - Company-specific role assignments

#### **Company Management**
- `Company` - Main company information
- `CompanyBranch` - Branch locations and details
- `CSRContact` - CSR contact person information
- `Budget` - CSR budget with flexible splits
- `FocusArea` - ESG goals and SDG priorities
- `NGOPreference` - NGO partnership preferences
- `AIConfig` - AI agent optimization settings

#### **Project & NGO Management**
- `Project` - CSR project details with SDG alignment
- `ProjectMilestone` - Project timeline and milestones
- `ProjectApplication` - Project funding applications
- `ProjectImpactReport` - Impact measurement and reporting
- `NGOProfile` - Comprehensive NGO information
- `NGOImpactEvent` - NGO impact tracking
- `NGODocument` - NGO certificates and documents
- `NGOTestimonial` - NGO success stories

#### **AI & Decision Support**
- `AIMatch` - Company-project alignment scoring
- `ApprovalRequest` - Project approval workflows
- `ApprovalStep` - Multi-step approval process
- `DecisionRationale` - AI decision explanations
- `RationaleNote` - Detailed reasoning notes

#### **Monitoring & Impact**
- `ImpactMetricSnapshot` - Real-time impact data
- `ImpactTimeSeries` - Historical impact trends
- `ImpactRegionStat` - Geographic impact distribution
- `ImpactGoal` - Impact targets and KPIs
- `ProjectTrackingInfo` - Real-time project monitoring
- `ProjectTimelineEntry` - Project timeline events

#### **Risk & Compliance**
- `NGORiskAssessment` - NGO credibility scoring
- `AuditEvent` - Compliance audit trail
- `ComplianceDocument` - Policy and certificate files

#### **Reporting & Analytics**
- `ReportJob` - Automated report generation
- `ReportArtifact` - Generated report files

## 🔌 API Endpoints

### **Authentication & Users**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/forgot-password` - Password recovery
- `GET /api/profile/me` - Current user profile

### **Company & Profile Management**
- `GET /api/profile/companies` - List user companies
- `GET /api/profile/companies/<id>` - Company details
- `POST /api/profile/companies` - Create company profile
- `PUT /api/profile/companies/<id>` - Update company profile
- `POST /api/profile/companies/<id>/documents` - Upload documents

### **Project Discovery & Management**
- `GET /api/projects` - List/filter projects (public)
- `POST /api/projects` - Create project (guest fallback)
- `PUT /api/projects/:id` - Update project
- `GET /api/projects/:id/milestones` - Project milestones
- `GET /api/projects/:id/impact` - Project impact data

### **AI Matching & Alignment**
- `GET /api/ai-matches` - Company-project alignment scores
- `POST /api/ai-matches` - Generate new matches
- `GET /api/ai-matches/company/:id` - Company-specific matches

### **Approval Workflows**
- `GET /api/approvals` - List approval requests
- `GET /api/approvals/:id` - Approval details
- `POST /api/approvals/:id/steps/:step_id/status` - Update approval step
- `GET /api/approvals/:id/workflow` - Workflow timeline

### **Impact Monitoring**
- `GET /api/impact/snapshots` - Impact metric snapshots
- `GET /api/impact/time-series` - Historical impact data
- `GET /api/impact/regions` - Geographic impact stats
- `GET /api/impact/goals` - Impact targets and KPIs

### **NGO Marketplace**
- `GET /api/ngos` - NGO profiles (authenticated)
- `GET /api/ngos/:id` - NGO details
- `GET /api/ngos/:id/impact` - NGO impact events
- `GET /api/ngos/:id/documents` - NGO certificates

### **Risk Assessment**
- `GET /api/risk/assessments` - NGO risk assessments
- `GET /api/risk/assessments/:id` - Risk assessment details
- `POST /api/risk/assessments` - Generate risk assessment

### **Reporting & Compliance**
- `POST /api/reports/generate` - Generate compliance reports
- `GET /api/reports/jobs` - Report generation jobs
- `GET /api/reports/artifacts` - Generated reports
- `GET /api/audit/events` - Compliance audit trail

## 📊 Sample Data Structure

### **Users & Roles**
- **Corporate Users**: 5 companies with sustainability officers
- **NGO Representatives**: 5 NGOs with project portfolios
- **Admin Users**: Platform administrators
- **Regulators**: Government auditors and inspectors

### **Projects & Impact**
- **Education Projects**: Digital literacy, rural education
- **Environmental Projects**: Clean water, tree planting, renewable energy
- **Healthcare Projects**: Medical camps, health awareness
- **Women Empowerment**: Skills training, entrepreneurship

### **AI Matching Data**
- **Alignment Scores**: 0-100% company-project fit
- **Risk Assessments**: NGO credibility and financial health
- **Impact Predictions**: Expected outcomes and KPIs

### **Workflow Data**
- **Approval Requests**: Multi-step approval processes
- **Decision Rationales**: AI explanations for recommendations
- **Audit Trails**: Complete compliance tracking

## 🔧 Development Workflow

### **Adding New Models**
1. **Create model file** in `models/` folder
2. **Update `models/__init__.py`** with new imports
3. **Add sample data** in `sample_data/` folder
4. **Update `seed_database.py`** for seeding
5. **Create tables**: `python seed_database.py`

### **Adding New API Endpoints**
1. **Create route file** in `routes/` folder
2. **Register blueprint** in `app.py`
3. **Add authentication** and validation
4. **Test endpoints** with `test_api.py`

### **Database Schema Updates**
```bash
# For new tables (preserves existing data)
python seed_database.py

# For complete reset
python migrate.py reset
```

## 🧪 Testing

### **API Testing**
```bash
# Run comprehensive API tests
python test_api.py

# Test specific endpoints
curl -X GET http://localhost:5000/api/health
```

### **Sample Data Testing**
After seeding, test with:
- **Corporate Login**: `admin@techcorp.com` / `admin123`
- **NGO Login**: `director@womenempowerment.org` / `women123`
- **Admin Login**: `admin@sustainalign.local` / `admin123`

## 🚀 Production Deployment

### **Environment Setup**
- Use PostgreSQL/MySQL instead of SQLite
- Set strong `SECRET_KEY` and `PASSWORD_SALT`
- Configure proper `CORS_ORIGIN` for production domain
- Enable HTTPS and security headers

### **Database Migration**
1. **Backup existing data**
2. **Update models** and dependencies
3. **Run migrations** carefully
4. **Verify data integrity**

### **Security Considerations**
- Change all default secrets
- Implement rate limiting
- Add proper logging and monitoring
- Use cloud storage for file uploads
- Regular security audits

## 📁 Project Structure
```
backend/
├── app.py                 # App factory and blueprint registration
├── models.py              # Main models import (backward compatibility)
├── seed_database.py       # Comprehensive sample data seeding
├── migrate.py             # Basic database migration scripts
├── test_api.py            # API testing script
├── requirements.txt       # Python dependencies
├── models/                # Modular model structure
│   ├── __init__.py        # Model exports
│   ├── base.py            # SQLAlchemy database instance
│   ├── user.py            # User authentication model
│   ├── company_details.py # Company and profile models
│   ├── projects.py        # Project and NGO models
│   ├── ai_matching.py     # AI matching and alignment
│   ├── approval.py        # Approval workflows
│   ├── impact.py          # Impact monitoring models
│   ├── risk.py            # Risk assessment models
│   ├── reporting.py       # Reporting and compliance
│   └── tracker.py         # Project tracking models
├── sample_data/           # Comprehensive sample data
│   ├── __init__.py        # Sample data aggregator
│   ├── user_sample.py     # User and role data
│   ├── company_details_sample.py # Company profiles
│   ├── projects_sample.py # Projects and NGOs
│   ├── ai_matching_sample.py # AI matching data
│   ├── approval_sample.py # Approval workflows
│   ├── impact_sample.py   # Impact metrics
│   ├── ngo_marketplace_sample.py # NGO marketplace
│   ├── risk_sample.py     # Risk assessments
│   ├── tracker_sample.py  # Project tracking
│   └── reporting_sample.py # Reporting data
├── routes/                # API endpoints
│   ├── auth.py            # Authentication endpoints
│   ├── profile.py         # Company profile management
│   ├── projects.py        # Project management
│   ├── reports.py         # Reporting endpoints
│   └── views.py           # Admin HTML views
└── templates/             # HTML templates
```

## 🔍 Troubleshooting

### **Common Issues**

**Import Errors:**
```bash
# Ensure virtual environment is activated
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux

# Check Python path
which python  # Should show .venv/bin/python
```

**Database Issues:**
```bash
# Reset database completely
python seed_database.py

# Check database status
python migrate.py info
```

**API Errors:**
```bash
# Check server status
curl http://localhost:5000/api/health

# Check server logs
python app.py
```

### **Sample Data Issues**
- Ensure all sample data files are present
- Check database file permissions
- Verify model relationships are correct

## 🌟 Key Benefits

### **For Developers**
- **Rich Sample Data**: Immediate testing and development
- **Modular Architecture**: Easy to extend and maintain
- **Comprehensive Models**: Covers entire CSR/ESG lifecycle
- **AI Integration Ready**: Built for AI agent workflows

### **For Stakeholders**
- **Realistic Demos**: Show platform capabilities immediately
- **Complete Workflows**: End-to-end CSR management
- **AI Insights**: Demonstrate AI agent value
- **Compliance Ready**: Built for regulatory requirements

## 📚 Additional Resources

- **Model Documentation**: `models/README.md`
- **API Testing**: `test_api.py`
- **Sample Data**: `sample_data/` folder
- **Database Schema**: `PROJECT_MODELS_SUMMARY.md`

---

**Made with care for sustainability-minded teams 🌍**
