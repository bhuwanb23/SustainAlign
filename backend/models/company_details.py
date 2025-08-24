from datetime import datetime
from .base import db
import json


class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    logo_url = db.Column(db.String(500))  # URL to stored logo file
    registration_id = db.Column(db.String(100))
    industry = db.Column(db.String(100), nullable=False)
    hq_country = db.Column(db.String(100), nullable=False)
    hq_state = db.Column(db.String(100))
    hq_city = db.Column(db.String(100))
    website = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='companies')
    branches = db.relationship('CompanyBranch', backref='company', cascade='all, delete-orphan')
    csr_contact = db.relationship('CSRContact', backref='company', uselist=False, cascade='all, delete-orphan')
    budget = db.relationship('Budget', backref='company', uselist=False, cascade='all, delete-orphan')
    focus_area = db.relationship('FocusArea', backref='company', uselist=False, cascade='all, delete-orphan')
    compliance_documents = db.relationship('ComplianceDocument', backref='company', cascade='all, delete-orphan')
    ngo_preferences = db.relationship('NGOPreference', backref='company', uselist=False, cascade='all, delete-orphan')
    ai_config = db.relationship('AIConfig', backref='company', uselist=False, cascade='all, delete-orphan')
    user_roles = db.relationship('UserRole', backref='company', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'company_name': self.company_name,
            'logo_url': self.logo_url,
            'registration_id': self.registration_id,
            'industry': self.industry,
            'hq_country': self.hq_country,
            'hq_state': self.hq_state,
            'hq_city': self.hq_city,
            'website': self.website,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'branches': [branch.to_dict() for branch in self.branches],
            'csr_contact': self.csr_contact.to_dict() if self.csr_contact else None,
            'budget': self.budget.to_dict() if self.budget else None,
            'focus_area': self.focus_area.to_dict() if self.focus_area else None,
            'compliance_documents': [doc.to_dict() for doc in self.compliance_documents],
            'ngo_preferences': self.ngo_preferences.to_dict() if self.ngo_preferences else None,
            'ai_config': self.ai_config.to_dict() if self.ai_config else None,
            'user_roles': [role.to_dict() for role in self.user_roles],
        }


class CompanyBranch(db.Model):
    __tablename__ = 'company_branches'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100))
    city = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'country': self.country,
            'state': self.state,
            'city': self.city,
            'created_at': self.created_at.isoformat(),
        }


class CSRContact(db.Model):
    __tablename__ = 'csr_contacts'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    contact_name = db.Column(db.String(255), nullable=False)
    contact_role = db.Column(db.String(100))
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'contact_name': self.contact_name,
            'contact_role': self.contact_role,
            'email': self.email,
            'phone': self.phone,
            'created_at': self.created_at.isoformat(),
        }


class Budget(db.Model):
    __tablename__ = 'budgets'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    amount = db.Column(db.Numeric(15, 2), nullable=False)  # Large decimal for budget amounts
    currency = db.Column(db.String(10), default='INR')
    project_size = db.Column(db.String(50), default='Medium')
    # Store budget splits as JSON
    splits = db.Column(db.Text)  # JSON string for budget allocation percentages
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_splits(self, splits_dict):
        self.splits = json.dumps(splits_dict)

    def get_splits(self):
        if self.splits:
            return json.loads(self.splits)
        return {}

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'amount': float(self.amount) if self.amount else 0,
            'currency': self.currency,
            'project_size': self.project_size,
            'splits': self.get_splits(),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }


class FocusArea(db.Model):
    __tablename__ = 'focus_areas'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    # Store priority SDGs as JSON array
    priority_sdgs = db.Column(db.Text)  # JSON array of SDG names
    esg_goals = db.Column(db.Text)  # Free text for ESG goals
    themes = db.Column(db.Text)  # Free text for thematic areas
    target_year = db.Column(db.String(10))  # e.g., "2030"
    reporting_standard = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_priority_sdgs(self, sdgs_list):
        self.priority_sdgs = json.dumps(sdgs_list)

    def get_priority_sdgs(self):
        if self.priority_sdgs:
            return json.loads(self.priority_sdgs)
        return []

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'priority_sdgs': self.get_priority_sdgs(),
            'esg_goals': self.esg_goals,
            'themes': self.themes,
            'target_year': self.target_year,
            'reporting_standard': self.reporting_standard,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }


class ComplianceDocument(db.Model):
    __tablename__ = 'compliance_documents'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    document_type = db.Column(db.String(50), nullable=False)  # 'policy', 'report', 'certificate'
    file_name = db.Column(db.String(255), nullable=False)
    file_url = db.Column(db.String(500), nullable=False)  # URL to stored file
    file_size = db.Column(db.Integer)  # File size in bytes
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'document_type': self.document_type,
            'file_name': self.file_name,
            'file_url': self.file_url,
            'file_size': self.file_size,
            'upload_date': self.upload_date.isoformat(),
        }


class NGOPreference(db.Model):
    __tablename__ = 'ngo_preferences'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    ngo_size = db.Column(db.String(50), default='Mid-level')
    partnership_model = db.Column(db.String(100), default='Funding + Execution')
    # Store regions as JSON array
    regions = db.Column(db.Text)  # JSON array of region names
    spend_history = db.Column(db.Text)  # Free text for spend history
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_regions(self, regions_list):
        self.regions = json.dumps(regions_list)

    def get_regions(self):
        if self.regions:
            return json.loads(self.regions)
        return []

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'ngo_size': self.ngo_size,
            'partnership_model': self.partnership_model,
            'regions': self.get_regions(),
            'spend_history': self.spend_history,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }


class AIConfig(db.Model):
    __tablename__ = 'ai_configs'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    # Store optimization metrics as JSON array
    optimize_for = db.Column(db.Text)  # JSON array of optimization metrics
    risk_appetite = db.Column(db.String(50), default='Medium')
    alignment_mode = db.Column(db.String(100), default='Strict compliance')
    # Store integrations as JSON array
    integrations = db.Column(db.Text)  # JSON array of integration names
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_optimize_for(self, metrics_list):
        self.optimize_for = json.dumps(metrics_list)

    def get_optimize_for(self):
        if self.optimize_for:
            return json.loads(self.optimize_for)
        return []

    def set_integrations(self, integrations_list):
        self.integrations = json.dumps(integrations_list)

    def get_integrations(self):
        if self.integrations:
            return json.loads(self.integrations)
        return []

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'optimize_for': self.get_optimize_for(),
            'risk_appetite': self.risk_appetite,
            'alignment_mode': self.alignment_mode,
            'integrations': self.get_integrations(),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }


class UserRole(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(100), default='CSR Manager')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'company_id': self.company_id,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
        }
