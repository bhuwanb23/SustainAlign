from datetime import datetime
from .base import db
import json


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    
    # Basic Info
    title = db.Column(db.String(255), nullable=False, index=True)
    short_description = db.Column(db.Text, nullable=False)
    ngo_name = db.Column(db.String(255), nullable=False, index=True)
    location_city = db.Column(db.String(100))
    location_region = db.Column(db.String(100))
    location_country = db.Column(db.String(100), nullable=False)
    
    # Thematic Info
    sdg_goals = db.Column(db.Text)  # JSON array of SDG numbers 1-17
    csr_focus_areas = db.Column(db.Text)  # JSON array of focus areas
    target_beneficiaries = db.Column(db.Text)  # JSON array of beneficiary types
    
    # Financials
    total_project_cost = db.Column(db.Numeric(15, 2), nullable=False)
    funding_required = db.Column(db.Numeric(15, 2), nullable=False)
    currency = db.Column(db.String(10), default='INR')
    csr_eligibility = db.Column(db.Boolean, default=True)  # Yes/No under Schedule VII
    preferred_contribution_type = db.Column(db.String(100))  # cash, in-kind, volunteer hours
    
    # Timeline
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    duration_months = db.Column(db.Integer)  # Calculated field
    
    # Impact Metrics
    expected_outcomes = db.Column(db.Text)  # JSON object with metrics
    kpis = db.Column(db.Text)  # JSON object with KPIs
    past_impact = db.Column(db.Text)  # JSON object for recurring projects
    
    # NGO Credibility
    ngo_registration_number = db.Column(db.String(100))
    ngo_80g_status = db.Column(db.String(50))  # Valid, Expired, Not Available
    ngo_fcra_status = db.Column(db.String(50))  # Valid, Expired, Not Required
    ngo_rating = db.Column(db.Integer)  # 1-5 rating
    ngo_verification_badge = db.Column(db.String(50))  # Verified, Pending, Unverified
    past_projects_completed = db.Column(db.Integer, default=0)
    
    # Media & Supporting Files
    project_images = db.Column(db.Text)  # JSON array of image URLs
    proposal_document_url = db.Column(db.String(500))
    video_link = db.Column(db.String(500))
    
    # Status & Metadata
    status = db.Column(db.String(50), default='draft')  # draft, published, funded, completed
    visibility = db.Column(db.String(50), default='public')  # public, private, restricted
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    creator = db.relationship('User', backref='created_projects')
    milestones = db.relationship('ProjectMilestone', backref='project', cascade='all, delete-orphan')
    applications = db.relationship('ProjectApplication', backref='project', cascade='all, delete-orphan')
    impact_reports = db.relationship('ProjectImpactReport', backref='project', cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        super(Project, self).__init__(**kwargs)
        if self.start_date and self.end_date:
            self.calculate_duration()
    
    def calculate_duration(self):
        """Calculate duration in months between start and end dates"""
        if self.start_date and self.end_date:
            delta = self.end_date - self.start_date
            self.duration_months = (delta.days // 30) + 1
    
    def set_sdg_goals(self, sdg_list):
        """Set SDG goals as JSON array"""
        if isinstance(sdg_list, list):
            self.sdg_goals = json.dumps(sdg_list)
    
    def get_sdg_goals(self):
        """Get SDG goals as list"""
        if self.sdg_goals:
            return json.loads(self.sdg_goals)
        return []
    
    def set_csr_focus_areas(self, focus_areas):
        """Set CSR focus areas as JSON array"""
        if isinstance(focus_areas, list):
            self.csr_focus_areas = json.dumps(focus_areas)
    
    def get_csr_focus_areas(self):
        """Get CSR focus areas as list"""
        if self.csr_focus_areas:
            return json.loads(self.csr_focus_areas)
        return []
    
    def set_target_beneficiaries(self, beneficiaries):
        """Set target beneficiaries as JSON array"""
        if isinstance(beneficiaries, list):
            self.target_beneficiaries = json.dumps(beneficiaries)
    
    def get_target_beneficiaries(self):
        """Get target beneficiaries as list"""
        if self.target_beneficiaries:
            return json.loads(self.target_beneficiaries)
        return []
    
    def set_expected_outcomes(self, outcomes):
        """Set expected outcomes as JSON object"""
        if isinstance(outcomes, dict):
            self.expected_outcomes = json.dumps(outcomes)
    
    def get_expected_outcomes(self):
        """Get expected outcomes as dict"""
        if self.expected_outcomes:
            return json.loads(self.expected_outcomes)
        return {}
    
    def set_kpis(self, kpis_dict):
        """Set KPIs as JSON object"""
        if isinstance(kpis_dict, dict):
            self.kpis = json.dumps(kpis_dict)
    
    def get_kpis(self):
        """Get KPIs as dict"""
        if self.kpis:
            return json.loads(self.kpis)
        return {}
    
    def set_past_impact(self, impact_dict):
        """Set past impact as JSON object"""
        if isinstance(impact_dict, dict):
            self.past_impact = json.dumps(impact_dict)
    
    def get_past_impact(self):
        """Get past impact as dict"""
        if self.past_impact:
            return json.loads(self.past_impact)
        return {}
    
    def set_project_images(self, image_urls):
        """Set project images as JSON array"""
        if isinstance(image_urls, list):
            self.project_images = json.dumps(image_urls)
    
    def get_project_images(self):
        """Get project images as list"""
        if self.project_images:
            return json.loads(self.project_images)
        return []
    
    def to_dict(self):
        """Convert project to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'short_description': self.short_description,
            'ngo_name': self.ngo_name,
            'location': {
                'city': self.location_city,
                'region': self.location_region,
                'country': self.location_country
            },
            'sdg_goals': self.get_sdg_goals(),
            'csr_focus_areas': self.get_csr_focus_areas(),
            'target_beneficiaries': self.get_target_beneficiaries(),
            'financials': {
                'total_project_cost': float(self.total_project_cost) if self.total_project_cost else 0,
                'funding_required': float(self.funding_required) if self.funding_required else 0,
                'currency': self.currency,
                'csr_eligibility': self.csr_eligibility,
                'preferred_contribution_type': self.preferred_contribution_type
            },
            'timeline': {
                'start_date': self.start_date.isoformat() if self.start_date else None,
                'end_date': self.end_date.isoformat() if self.end_date else None,
                'duration_months': self.duration_months
            },
            'impact_metrics': {
                'expected_outcomes': self.get_expected_outcomes(),
                'kpis': self.get_kpis(),
                'past_impact': self.get_past_impact()
            },
            'ngo_credibility': {
                'registration_number': self.ngo_registration_number,
                '80g_status': self.ngo_80g_status,
                'fcra_status': self.ngo_fcra_status,
                'rating': self.ngo_rating,
                'verification_badge': self.ngo_verification_badge,
                'past_projects_completed': self.past_projects_completed
            },
            'media_files': {
                'project_images': self.get_project_images(),
                'proposal_document_url': self.proposal_document_url,
                'video_link': self.video_link
            },
            'status': self.status,
            'visibility': self.visibility,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'milestones': [milestone.to_dict() for milestone in self.milestones],
            'applications_count': len(self.applications),
            'impact_reports_count': len(self.impact_reports)
        }


class ProjectMilestone(db.Model):
    __tablename__ = 'project_milestones'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    target_date = db.Column(db.Date, nullable=False)
    completion_date = db.Column(db.Date)
    status = db.Column(db.String(50), default='pending')  # pending, in_progress, completed, delayed
    progress_percentage = db.Column(db.Integer, default=0)  # 0-100
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'title': self.title,
            'description': self.description,
            'target_date': self.target_date.isoformat() if self.target_date else None,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None,
            'status': self.status,
            'progress_percentage': self.progress_percentage,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class ProjectApplication(db.Model):
    __tablename__ = 'project_applications'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    application_type = db.Column(db.String(50), nullable=False)  # funding, partnership, volunteer
    amount_offered = db.Column(db.Numeric(15, 2))  # For funding applications
    contribution_details = db.Column(db.Text)  # Description of contribution
    status = db.Column(db.String(50), default='pending')  # pending, approved, rejected, withdrawn
    notes = db.Column(db.Text)  # Internal notes or feedback
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    company = db.relationship('Company', backref='project_applications')
    
    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'company_id': self.company_id,
            'company_name': self.company.company_name if self.company else None,
            'application_type': self.application_type,
            'amount_offered': float(self.amount_offered) if self.amount_offered else None,
            'contribution_details': self.contribution_details,
            'status': self.status,
            'notes': self.notes,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class ProjectImpactReport(db.Model):
    __tablename__ = 'project_impact_reports'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    report_period = db.Column(db.String(50), nullable=False)  # monthly, quarterly, annual
    report_date = db.Column(db.Date, nullable=False)
    impact_metrics = db.Column(db.Text)  # JSON object with actual vs expected metrics
    challenges_faced = db.Column(db.Text)
    lessons_learned = db.Column(db.Text)
    next_steps = db.Column(db.Text)
    attachments = db.Column(db.Text)  # JSON array of file URLs
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    creator = db.relationship('User', backref='created_impact_reports')
    
    def set_impact_metrics(self, metrics_dict):
        """Set impact metrics as JSON object"""
        if isinstance(metrics_dict, dict):
            self.impact_metrics = json.dumps(metrics_dict)
    
    def get_impact_metrics(self):
        """Get impact metrics as dict"""
        if self.impact_metrics:
            return json.loads(self.impact_metrics)
        return {}
    
    def set_attachments(self, file_urls):
        """Set attachments as JSON array"""
        if isinstance(file_urls, list):
            self.attachments = json.dumps(file_urls)
    
    def get_attachments(self):
        """Get attachments as list"""
        if self.attachments:
            return json.loads(self.attachments)
        return []
    
    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'report_period': self.report_period,
            'report_date': self.report_date.isoformat() if self.report_date else None,
            'impact_metrics': self.get_impact_metrics(),
            'challenges_faced': self.challenges_faced,
            'lessons_learned': self.lessons_learned,
            'next_steps': self.next_steps,
            'attachments': self.get_attachments(),
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class NGOProfile(db.Model):
    __tablename__ = 'ngo_profiles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True, index=True)
    registration_number = db.Column(db.String(100), unique=True)
    legal_status = db.Column(db.String(100))  # Trust, Society, Company, etc.
    year_established = db.Column(db.Integer)
    
    # Contact Information
    address = db.Column(db.Text)
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(50))
    email = db.Column(db.String(255))
    website = db.Column(db.String(255))
    
    # Legal Compliance
    pan_number = db.Column(db.String(20))
    tan_number = db.Column(db.String(20))
    gst_number = db.Column(db.String(20))
    _80g_status = db.Column(db.String(50))  # Valid, Expired, Not Available
    fcra_status = db.Column(db.String(50))  # Valid, Expired, Not Required
    fcra_number = db.Column(db.String(100))
    
    # Credibility & Rating
    rating = db.Column(db.Integer)  # 1-5 rating
    verification_badge = db.Column(db.String(50))  # Verified, Pending, Unverified
    total_projects_completed = db.Column(db.Integer, default=0)
    total_beneficiaries_reached = db.Column(db.Integer, default=0)
    
    # Focus Areas
    primary_sectors = db.Column(db.Text)  # JSON array of sectors
    sdg_focus = db.Column(db.Text)  # JSON array of SDG numbers
    geographic_focus = db.Column(db.Text)  # JSON array of regions/states
    
    # Financial Information
    annual_budget = db.Column(db.Numeric(15, 2))
    currency = db.Column(db.String(10), default='INR')
    funding_sources = db.Column(db.Text)  # JSON array of funding sources
    
    # Media & Documents
    logo_url = db.Column(db.String(500))
    profile_image_url = db.Column(db.String(500))
    documents = db.Column(db.Text)  # JSON array of document URLs
    
    # Status
    status = db.Column(db.String(50), default='active')  # active, inactive, suspended
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    projects = db.relationship('Project', backref='ngo_profile', foreign_keys=[Project.ngo_name], primaryjoin="NGOProfile.name == Project.ngo_name")
    
    def set_primary_sectors(self, sectors_list):
        """Set primary sectors as JSON array"""
        if isinstance(sectors_list, list):
            self.primary_sectors = json.dumps(sectors_list)
    
    def get_primary_sectors(self):
        """Get primary sectors as list"""
        if self.primary_sectors:
            return json.loads(self.primary_sectors)
        return []
    
    def set_sdg_focus(self, sdg_list):
        """Set SDG focus as JSON array"""
        if isinstance(sdg_list, list):
            self.sdg_focus = json.dumps(sdg_list)
    
    def get_sdg_focus(self):
        """Get SDG focus as list"""
        if self.sdg_focus:
            return json.loads(self.sdg_focus)
        return []
    
    def set_geographic_focus(self, regions_list):
        """Set geographic focus as JSON array"""
        if isinstance(regions_list, list):
            self.geographic_focus = json.dumps(regions_list)
    
    def get_geographic_focus(self):
        """Get geographic focus as list"""
        if self.geographic_focus:
            return json.loads(self.geographic_focus)
        return []
    
    def set_funding_sources(self, sources_list):
        """Set funding sources as JSON array"""
        if isinstance(sources_list, list):
            self.funding_sources = json.dumps(sources_list)
    
    def get_funding_sources(self):
        """Get funding sources as list"""
        if self.funding_sources:
            return json.loads(self.funding_sources)
        return []
    
    def set_documents(self, doc_urls):
        """Set documents as JSON array"""
        if isinstance(doc_urls, list):
            self.documents = json.dumps(doc_urls)
    
    def get_documents(self):
        """Get documents as list"""
        if self.documents:
            return json.loads(self.documents)
        return []
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'registration_number': self.registration_number,
            'legal_status': self.legal_status,
            'year_established': self.year_established,
            'contact': {
                'address': self.address,
                'city': self.city,
                'state': self.state,
                'country': self.country,
                'phone': self.phone,
                'email': self.email,
                'website': self.website
            },
            'legal_compliance': {
                'pan_number': self.pan_number,
                'tan_number': self.tan_number,
                'gst_number': self.gst_number,
                '80g_status': self._80g_status,
                'fcra_status': self.fcra_status,
                'fcra_number': self.fcra_number
            },
            'credibility': {
                'rating': self.rating,
                'verification_badge': self.verification_badge,
                'total_projects_completed': self.total_projects_completed,
                'total_beneficiaries_reached': self.total_beneficiaries_reached
            },
            'focus_areas': {
                'primary_sectors': self.get_primary_sectors(),
                'sdg_focus': self.get_sdg_focus(),
                'geographic_focus': self.get_geographic_focus()
            },
            'financials': {
                'annual_budget': float(self.annual_budget) if self.annual_budget else None,
                'currency': self.currency,
                'funding_sources': self.get_funding_sources()
            },
            'media': {
                'logo_url': self.logo_url,
                'profile_image_url': self.profile_image_url,
                'documents': self.get_documents()
            },
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'projects_count': len(self.projects)
        }
