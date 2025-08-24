# SustainAlign Models Structure

This folder contains all the database models organized in a modular structure for better maintainability and organization.

## Folder Structure

```
models/
├── __init__.py          # Main import file - exports all models
├── base.py              # SQLAlchemy database instance
├── user.py              # User authentication model
├── company_details.py   # All company-related models
└── README.md           # This documentation file
```

## Model Files

### `__init__.py`
Main import file that exports all models for easy importing throughout the application.

**Exports:**
- `db` - SQLAlchemy database instance
- `User` - User authentication model
- All company-related models from `company_details.py`

### `base.py`
Contains the SQLAlchemy database instance that is shared across all models.

### `user.py`
Contains the User model for authentication and user management.

**Model:**
- `User` - User authentication with email, password hash, role, and timestamps

### `company_details.py`
Contains all models related to company profile management and CSR/ESG data.

**Models:**
- `Company` - Main company entity with basic information
- `CompanyBranch` - Company branch locations
- `CSRContact` - CSR contact person details
- `Budget` - CSR budget and financial information
- `FocusArea` - ESG goals and SDG priorities
- `ComplianceDocument` - Policy, report, and certificate files
- `NGOPreference` - NGO partnership preferences
- `AIConfig` - AI optimization settings
- `UserRole` - Company user roles and access

## Database Setup & Management

### Initial Database Setup

```bash
# Navigate to backend directory
cd backend

# Create all database tables
python migrate.py create

# Create sample data for testing
python migrate.py sample

# Verify database setup
python migrate.py info
```

### Database Operations

```bash
# Create tables (preserves existing data)
python migrate.py create

# Drop all tables (DANGEROUS - deletes all data)
python migrate.py drop

# Reset everything (drop + create + sample data)
python migrate.py reset

# Show database information
python migrate.py info
```

### Adding New Models

1. **Create new model file** in the `models/` folder:

```python
# models/new_feature.py
from datetime import datetime
from .base import db

class NewModel(db.Model):
    __tablename__ = 'new_models'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
```

2. **Update `models/__init__.py`**:

```python
from .base import db
from .user import User
from .company_details import (
    Company, 
    CompanyBranch, 
    CSRContact, 
    Budget, 
    FocusArea, 
    ComplianceDocument, 
    NGOPreference, 
    AIConfig, 
    UserRole
)
from .new_feature import NewModel  # Add this line

__all__ = [
    'db',
    'User',
    'Company',
    'CompanyBranch', 
    'CSRContact',
    'Budget',
    'FocusArea',
    'ComplianceDocument',
    'NGOPreference',
    'AIConfig',
    'UserRole',
    'NewModel'  # Add this line
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

### Model Relationships

When adding new models, consider relationships:

```python
# Example: Adding a relationship to Company
class Company(db.Model):
    # ... existing fields ...
    
    # Add new relationship
    new_models = db.relationship('NewModel', backref='company', cascade='all, delete-orphan')

class NewModel(db.Model):
    # ... existing fields ...
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
```

## Usage

### Importing Models

```python
# Import all models
from models import db, User, Company, CompanyBranch, etc.

# Or import specific models
from models import User, Company
```

### Database Relationships

The models are designed with proper relationships:

- **User** has many **Companies** (one-to-many)
- **Company** has many **CompanyBranches** (one-to-many)
- **Company** has one **CSRContact** (one-to-one)
- **Company** has one **Budget** (one-to-one)
- **Company** has one **FocusArea** (one-to-one)
- **Company** has many **ComplianceDocuments** (one-to-many)
- **Company** has one **NGOPreference** (one-to-one)
- **Company** has one **AIConfig** (one-to-one)
- **Company** has many **UserRoles** (one-to-many)

### JSON Fields

Several models use JSON fields for flexible data storage:

- `Budget.splits` - Budget allocation percentages
- `FocusArea.priority_sdgs` - Selected SDG priorities
- `NGOPreference.regions` - Geographic regions
- `AIConfig.optimize_for` - Optimization metrics
- `AIConfig.integrations` - System integrations

### Helper Methods

Each model includes helper methods:

- `to_dict()` - Convert model to dictionary for JSON serialization
- `set_splits()`, `get_splits()` - JSON field management for Budget
- `set_priority_sdgs()`, `get_priority_sdgs()` - JSON field management for FocusArea
- `set_regions()`, `get_regions()` - JSON field management for NGOPreference
- `set_optimize_for()`, `get_optimize_for()` - JSON field management for AIConfig
- `set_integrations()`, `get_integrations()` - JSON field management for AIConfig

## Database Schema

### Tables Created

1. `users` - User authentication
2. `companies` - Main company information
3. `company_branches` - Company branch locations
4. `csr_contacts` - CSR contact details
5. `budgets` - Budget and financial information
6. `focus_areas` - ESG goals and SDG priorities
7. `compliance_documents` - Document uploads
8. `ngo_preferences` - NGO partnership preferences
9. `ai_configs` - AI optimization settings
10. `user_roles` - Company user roles

### Cascade Deletes

Proper cascade relationships ensure data integrity:
- Deleting a Company deletes all related records
- Deleting a User deletes all their Companies and related data

## Development Workflow

### Adding New Features

1. **Create new model file**:
```bash
# Create new model file in models/ folder
touch models/new_feature.py
```

2. **Define model class**:
```python
# models/new_feature.py
from datetime import datetime
from .base import db

class NewModel(db.Model):
    __tablename__ = 'new_models'
    # ... model definition
```

3. **Update imports**:
```python
# models/__init__.py
from .new_feature import NewModel
```

4. **Create database tables**:
```bash
python migrate.py create
```

5. **Test the model**:
```bash
python test_api.py
```

### Database Migrations

```bash
# For new tables (preserves existing data)
python migrate.py create

# For schema changes (reset everything)
python migrate.py reset

# For production migrations
# 1. Backup existing data
# 2. Update models
# 3. Run create command
# 4. Restore data if needed
```

### Testing Models

```bash
# Test all API endpoints
python test_api.py

# Test specific model operations
python -c "
from app import create_app
from models import db, NewModel
app = create_app()
with app.app_context():
    # Test model operations
    new_item = NewModel(name='Test')
    db.session.add(new_item)
    db.session.commit()
    print('Model test successful!')
"
```

## Troubleshooting

### Common Issues

**Import Errors:**
```bash
# Make sure you're in the backend directory
cd backend

# Check if models folder exists
ls models/

# Check if __init__.py is properly configured
cat models/__init__.py
```

**Database Issues:**
```bash
# Reset database completely
python migrate.py reset

# Check database status
python migrate.py info

# Check if tables exist
python -c "
from app import create_app
from models import db
app = create_app()
with app.app_context():
    tables = db.engine.table_names()
    print('Tables:', tables)
"
```

**Model Relationship Issues:**
```python
# Check foreign key constraints
# Make sure foreign key columns exist
# Verify relationship definitions
# Check cascade delete settings
```

### Best Practices

1. **Always include `to_dict()` method** in new models
2. **Use proper foreign key constraints** for relationships
3. **Include timestamps** (`created_at`, `updated_at`) for audit trails
4. **Use JSON fields** for flexible data storage
5. **Test relationships** after adding new models
6. **Backup data** before major schema changes
7. **Document new models** in this README

### Migration Checklist

When adding new models:

- [ ] Create model file in `models/` folder
- [ ] Define model class with proper fields
- [ ] Add `to_dict()` method
- [ ] Update `models/__init__.py`
- [ ] Add relationships if needed
- [ ] Run `python migrate.py create`
- [ ] Test model operations
- [ ] Update this documentation
- [ ] Test API endpoints

## Testing

Test the models using the provided test script:

```bash
python test_api.py
```

This will test all API endpoints that use these models.

### Manual Testing

```bash
# Test database connection
python -c "
from app import create_app
from models import db
app = create_app()
with app.app_context():
    print('Database connection successful!')
"

# Test model creation
python -c "
from app import create_app
from models import db, User
from utils import hash_password
app = create_app()
with app.app_context():
    user = User(email='test@example.com', password_hash=hash_password('test123'))
    db.session.add(user)
    db.session.commit()
    print('User created successfully!')
"
```
