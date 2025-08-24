# SustainAlign Database Models Documentation

This document provides comprehensive information about the database models used in the SustainAlign backend system.

## 📊 Database Overview

The SustainAlign database is built using **SQLAlchemy ORM** with a modular structure that separates different business domains into logical model files. The system supports both **SQLite** (development) and **PostgreSQL** (production) databases.

## 🏗️ Model Structure

```
backend/models/
├── __init__.py          # Main import file for all models
├── base.py              # Database instance and base configuration
├── user.py              # User authentication and management
├── company_details.py   # Corporate profile and CSR management
└── projects.py          # Project management and NGO profiles
```

## 🔐 User Management Models

### User Model (`user.py`)

**Purpose**: Core user authentication and role management

**Key Fields**:
- `id`: Primary key
- `email`: Unique email address (indexed)
- `password_hash`: Hashed password for security
- `role`: User role (corporate, ngo, admin)
- `created_at`: Account creation timestamp

**Relationships**:
- `companies`: One-to-many relationship with Company profiles
- `created_projects`: Projects created by the user
- `created_impact_reports`: Impact reports created by the user

## 🏢 Corporate Profile Models (`company_details.py`)

### Company Model

**Purpose**: Main corporate entity with CSR focus

**Key Fields**:
- `company_name`: Official company name
- `industry`: Business sector
- `hq_country/state/city`: Headquarters location
- `logo_url`: Company logo image URL
- `registration_id`: Legal registration number

**Relationships**:
- `branches`: Company branch offices
- `csr_contact`: Primary CSR contact person
- `budget`: CSR budget allocation
- `focus_area`: ESG and SDG priorities
- `compliance_documents`: Legal compliance files
- `ngo_preferences`: Partnership criteria
- `ai_config`: AI matching preferences
- `user_roles`: Team member access levels

### Supporting Models

- **CompanyBranch**: Geographic presence across locations
- **CSRContact**: Primary CSR team contact information
- **Budget**: Financial planning with sector-wise allocation
- **FocusArea**: ESG goals and SDG priorities
- **ComplianceDocument**: Legal and regulatory documents
- **NGOPreference**: NGO partnership criteria
- **AIConfig**: Machine learning configuration
- **UserRole**: Team member roles and permissions

## 🚀 Project Management Models (`projects.py`)

### Project Model

**Purpose**: Core project entity for CSR initiatives

**Key Fields**:

#### Basic Information
- `title`: Project name
- `short_description`: 2-3 line summary
- `ngo_name`: Implementing partner organization
- `location_city/region/country`: Geographic scope

#### Thematic Information
- `sdg_goals`: JSON array of SDG numbers (1-17)
- `csr_focus_areas`: JSON array of focus areas
- `target_beneficiaries`: JSON array of beneficiary types

#### Financial Information
- `total_project_cost`: Complete project budget
- `funding_required`: Remaining funding gap
- `currency`: Budget currency (default: INR)
- `csr_eligibility`: Schedule VII compliance status
- `preferred_contribution_type`: cash, in-kind, volunteer hours

#### Timeline
- `start_date`: Project commencement date
- `end_date`: Project completion date
- `duration_months`: Calculated project duration

#### Impact Metrics
- `expected_outcomes`: JSON object with target metrics
- `kpis`: JSON object with key performance indicators
- `past_impact`: JSON object for recurring projects

#### NGO Credibility
- `ngo_registration_number`: Legal registration
- `ngo_80g_status`: Tax exemption status
- `ngo_fcra_status`: Foreign contribution status
- `ngo_rating`: 1-5 credibility rating
- `ngo_verification_badge`: Verification status
- `past_projects_completed`: Track record

#### Media & Files
- `project_images`: JSON array of image URLs
- `proposal_document_url`: Project proposal PDF
- `video_link`: Optional pitch video

#### Status & Metadata
- `status`: draft, published, funded, completed
- `visibility`: public, private, restricted
- `created_by`: User who created the project
- `created_at/updated_at`: Timestamps

**Relationships**:
- `creator`: User who created the project
- `milestones`: Project timeline milestones
- `applications`: Company applications for funding
- `impact_reports`: Progress and impact reports

### Supporting Project Models

#### ProjectMilestone
**Purpose**: Track project progress and timeline

**Key Fields**:
- `title`: Milestone name
- `description`: Detailed description
- `target_date`: Expected completion date
- `completion_date`: Actual completion date
- `status`: pending, in_progress, completed, delayed
- `progress_percentage`: 0-100 completion status

#### ProjectApplication
**Purpose**: Track company applications for projects

**Key Fields**:
- `application_type`: funding, partnership, volunteer
- `amount_offered`: Financial contribution amount
- `contribution_details`: Description of contribution
- `status`: pending, approved, rejected, withdrawn
- `notes`: Internal feedback and notes

#### ProjectImpactReport
**Purpose**: Monitor and report project progress

**Key Fields**:
- `report_period`: monthly, quarterly, annual
- `report_date`: Report generation date
- `impact_metrics`: JSON object with actual vs expected metrics
- `challenges_faced`: Obstacles encountered
- `lessons_learned`: Key insights gained
- `next_steps`: Future action items
- `attachments`: JSON array of supporting files

### NGO Profile Model

**Purpose**: Comprehensive NGO organization profiles

**Key Fields**:

#### Basic Information
- `name`: Organization name (unique)
- `registration_number`: Legal registration
- `legal_status`: Trust, Society, Company, etc.
- `year_established`: Foundation year

#### Contact Information
- `address`: Physical address
- `city/state/country`: Location details
- `phone/email/website`: Contact methods

#### Legal Compliance
- `pan_number`: Permanent Account Number
- `tan_number`: Tax Deduction Account Number
- `gst_number`: Goods and Services Tax number
- `80g_status`: Tax exemption status
- `fcra_status`: Foreign contribution status
- `fcra_number`: FCRA registration number

#### Credibility & Rating
- `rating`: 1-5 credibility rating
- `verification_badge`: Verified, Pending, Unverified
- `total_projects_completed`: Project count
- `total_beneficiaries_reached`: Impact count

#### Focus Areas
- `primary_sectors`: JSON array of sectors
- `sdg_focus`: JSON array of SDG numbers
- `geographic_focus`: JSON array of regions

#### Financial Information
- `annual_budget`: Annual operating budget
- `currency`: Budget currency
- `funding_sources`: JSON array of funding sources

#### Media & Documents
- `logo_url`: Organization logo
- `profile_image_url`: Profile image
- `documents`: JSON array of legal documents

## 🔄 Database Relationships

### One-to-Many Relationships
- **User** → **Company** (one user can have multiple companies)
- **User** → **Project** (one user can create multiple projects)
- **Company** → **CompanyBranch** (one company can have multiple branches)
- **Company** → **ProjectApplication** (one company can apply to multiple projects)
- **Project** → **ProjectMilestone** (one project can have multiple milestones)
- **Project** → **ProjectApplication** (one project can receive multiple applications)
- **Project** → **ProjectImpactReport** (one project can have multiple reports)

### One-to-One Relationships
- **Company** → **CSRContact** (one company has one primary CSR contact)
- **Company** → **Budget** (one company has one CSR budget)
- **Company** → **FocusArea** (one company has one ESG focus area)
- **Company** → **NGOPreference** (one company has one NGO preference set)
- **Company** → **AIConfig** (one company has one AI configuration)

### Many-to-Many Relationships
- **Project** ↔ **NGOProfile** (projects are implemented by NGOs, NGOs can have multiple projects)

## 📝 JSON Field Management

Many models use JSON fields to store flexible, structured data. Helper methods are provided for safe JSON operations:

### Setting JSON Fields
```python
# Set SDG goals
project.set_sdg_goals([4, 9, 10])

# Set focus areas
project.set_csr_focus_areas(["Education", "Technology"])

# Set expected outcomes
project.set_expected_outcomes({
    "students_enrolled": 500,
    "villages_covered": 10
})
```

### Getting JSON Fields
```python
# Get SDG goals
sdg_list = project.get_sdg_goals()

# Get focus areas
focus_areas = project.get_csr_focus_areas()

# Get expected outcomes
outcomes = project.get_expected_outcomes()
```

## 🗄️ Database Operations

### Creating Records
```python
# Create a new project
project = Project(
    title="Digital Literacy Program",
    short_description="Computer education for rural students",
    ngo_name="EduCare Foundation",
    total_project_cost=2500000,
    funding_required=1500000,
    created_by=user.id
)

# Set JSON fields
project.set_sdg_goals([4, 9, 10])
project.set_csr_focus_areas(["Education", "Technology"])

# Save to database
db.session.add(project)
db.session.commit()
```

### Querying Records
```python
# Get all published projects
published_projects = Project.query.filter_by(status='published').all()

# Get projects by SDG goal
education_projects = Project.query.filter(
    Project.sdg_goals.contains('4')
).all()

# Get projects by location
bangalore_projects = Project.query.filter(
    Project.location_city.contains('Bangalore')
).all()
```

### Updating Records
```python
# Update project status
project.status = 'funded'
project.updated_at = datetime.utcnow()

# Update JSON fields
project.set_kpis({
    "digital_literacy_rate": "85%",
    "employment_placement": "70%"
})

db.session.commit()
```

## 🚀 Migration and Setup

### Initial Database Setup
```bash
# Create all tables
python migrate.py create

# Add new tables to existing database
python migrate.py add

# Create sample data
python migrate.py sample

# Check database status
python migrate.py status
```

### Database Schema Updates
```bash
# Add only new tables (preserves existing data)
python migrate.py add

# Reset entire database (WARNING: destroys all data)
python migrate.py reset
```

## 🔒 Security and Validation

### Input Validation
- All required fields are marked with `nullable=False`
- JSON fields are validated before storage
- Date fields are parsed and validated
- Numeric fields use appropriate precision

### Access Control
- User authentication required for all operations
- Project ownership verification for updates/deletes
- Role-based access control for admin functions
- Company association verification for applications

### Data Integrity
- Foreign key constraints maintain referential integrity
- Cascade deletes for dependent records
- Timestamp tracking for audit trails
- Status validation for workflow management

## 📊 Performance Considerations

### Indexing
- Primary keys are automatically indexed
- Email fields are indexed for fast lookups
- Project title and NGO name are indexed for search
- Status fields are indexed for filtering

### Query Optimization
- Use specific filters to reduce result sets
- Leverage JSON containment operators for flexible searches
- Implement pagination for large result sets
- Use eager loading for related data when needed

### Database Maintenance
- Regular database backups
- Monitor table sizes and growth
- Archive old records when appropriate
- Regular index maintenance and optimization

## 🧪 Testing and Development

### Sample Data Creation
The migration script includes comprehensive sample data creation:
- Demo user accounts
- Sample company profiles
- Example projects with milestones
- NGO profiles with verification data
- Project applications and impact reports

### API Testing
Use the included `test_api.py` script to test all endpoints:
```bash
python test_api.py
```

## 🔮 Future Enhancements

### Planned Model Extensions
- **Impact Measurement**: Advanced impact tracking and analytics
- **Financial Tracking**: Detailed budget vs actual tracking
- **Stakeholder Management**: Extended stakeholder relationship models
- **Reporting Engine**: Automated report generation models
- **Integration Models**: Third-party system integration models

### Scalability Considerations
- **Sharding**: Geographic or organizational data partitioning
- **Caching**: Redis integration for frequently accessed data
- **Search**: Full-text search integration for project discovery
- **Analytics**: Data warehouse models for advanced analytics

## 📚 Additional Resources

- **Flask-SQLAlchemy Documentation**: https://flask-sqlalchemy.palletsprojects.com/
- **SQLAlchemy Documentation**: https://docs.sqlalchemy.org/
- **Database Design Best Practices**: Industry standards for CSR/ESG platforms
- **API Design Guidelines**: RESTful API design principles

---

This documentation provides a comprehensive overview of the SustainAlign database models. For specific implementation details, refer to the individual model files and the API documentation.
