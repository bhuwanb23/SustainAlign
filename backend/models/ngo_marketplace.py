from datetime import datetime, date
from .base import db
import json


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

    # Profile Summary
    about = db.Column(db.Text)

    # Status
    status = db.Column(db.String(50), default='active')  # active, inactive, suspended
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships to marketplace resources
    impact_events = db.relationship('NGOImpactEvent', backref='ngo', cascade='all, delete-orphan')
    documents_rel = db.relationship('NGODocument', backref='ngo', cascade='all, delete-orphan')
    transparency_reports = db.relationship('NGOTransparencyReport', backref='ngo', cascade='all, delete-orphan')
    certificates = db.relationship('NGOCertificate', backref='ngo', cascade='all, delete-orphan')
    testimonials = db.relationship('NGOTestimonial', backref='ngo', cascade='all, delete-orphan')

    def set_primary_sectors(self, sectors_list):
        if isinstance(sectors_list, list):
            self.primary_sectors = json.dumps(sectors_list)

    def get_primary_sectors(self):
        if self.primary_sectors:
            return json.loads(self.primary_sectors)
        return []

    def set_sdg_focus(self, sdg_list):
        if isinstance(sdg_list, list):
            self.sdg_focus = json.dumps(sdg_list)

    def get_sdg_focus(self):
        if self.sdg_focus:
            return json.loads(self.sdg_focus)
        return []

    def set_geographic_focus(self, regions_list):
        if isinstance(regions_list, list):
            self.geographic_focus = json.dumps(regions_list)

    def get_geographic_focus(self):
        if self.geographic_focus:
            return json.loads(self.geographic_focus)
        return []

    def set_funding_sources(self, sources_list):
        if isinstance(sources_list, list):
            self.funding_sources = json.dumps(sources_list)

    def get_funding_sources(self):
        if self.funding_sources:
            return json.loads(self.funding_sources)
        return []

    def set_documents(self, doc_urls):
        if isinstance(doc_urls, list):
            self.documents = json.dumps(doc_urls)

    def get_documents(self):
        if self.documents:
            return json.loads(self.documents)
        return []

    def to_summary(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'location': {
                'city': self.city,
                'state': self.state,
                'country': self.country,
            },
            'rating': self.rating,
            'verificationBadge': self.verification_badge,
            'sectors': self.get_primary_sectors(),
            'logoUrl': self.logo_url,
            'profileImageUrl': self.profile_image_url,
            'projectsCompleted': self.total_projects_completed,
            'beneficiariesReached': self.total_beneficiaries_reached,
        }

    def to_detail(self) -> dict:
        return {
            **self.to_summary(),
            'about': self.about,
            'sdgFocus': self.get_sdg_focus(),
            'geographicFocus': self.get_geographic_focus(),
            'financials': {
                'annualBudget': float(self.annual_budget) if self.annual_budget else None,
                'currency': self.currency,
                'fundingSources': self.get_funding_sources(),
            },
            'contact': {
                'address': self.address,
                'phone': self.phone,
                'email': self.email,
                'website': self.website,
            },
            'legal': {
                'registrationNumber': self.registration_number,
                'legalStatus': self.legal_status,
                'yearEstablished': self.year_established,
                'pan': self.pan_number,
                'tan': self.tan_number,
                'gst': self.gst_number,
                '80gStatus': self._80g_status,
                'fcraStatus': self.fcra_status,
                'fcraNumber': self.fcra_number,
            },
            'media': {
                'documents': self.get_documents(),
                'logoUrl': self.logo_url,
                'profileImageUrl': self.profile_image_url,
            },
            'status': self.status,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None,
        }

    # Back-compat for older code paths
    def to_dict(self) -> dict:
        return self.to_detail()


class NGOImpactEvent(db.Model):
    __tablename__ = 'ngo_impact_events'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)
    date = db.Column(db.Date, nullable=True)
    title = db.Column(db.String(180), nullable=False)
    description = db.Column(db.Text, nullable=True)
    kpis = db.Column(db.JSON, nullable=True)  # [{label, value}] or strings
    color = db.Column(db.String(16), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_timeline_item(self) -> dict:
        return {
            'date': self.date.isoformat() if self.date else None,
            'title': self.title,
            'description': self.description,
            'kpis': self.kpis or [],
            'color': self.color,
        }


class NGODocument(db.Model):
    __tablename__ = 'ngo_documents'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)
    name = db.Column(db.String(180), nullable=False)
    kind = db.Column(db.String(64), nullable=True)  # policy | annual_report | audit | registration | other
    url = db.Column(db.String(300), nullable=True)
    uploaded_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_row(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'kind': self.kind,
            'url': self.url,
            'uploadedAt': self.uploaded_at.isoformat() if self.uploaded_at else None,
        }


class NGOTransparencyReport(db.Model):
    __tablename__ = 'ngo_transparency_reports'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)
    period = db.Column(db.String(32), nullable=True)  # FY2023-24, Q4 2024, etc.
    summary = db.Column(db.Text, nullable=True)
    metrics = db.Column(db.JSON, nullable=True)  # {spent: 'INR 1.2Cr', allocated: 'INR 2.0Cr', ...}
    score = db.Column(db.Integer, nullable=True)  # 0-100
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'period': self.period,
            'summary': self.summary,
            'metrics': self.metrics or {},
            'score': self.score,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }


class NGOCertificate(db.Model):
    __tablename__ = 'ngo_certificates'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)
    title = db.Column(db.String(180), nullable=False)
    issuer = db.Column(db.String(120), nullable=True)
    valid_from = db.Column(db.Date, nullable=True)
    valid_until = db.Column(db.Date, nullable=True)
    url = db.Column(db.String(300), nullable=True)

    def to_card(self) -> dict:
        return {
            'id': self.id,
            'title': self.title,
            'issuer': self.issuer,
            'validFrom': self.valid_from.isoformat() if self.valid_from else None,
            'validUntil': self.valid_until.isoformat() if self.valid_until else None,
            'url': self.url,
        }


class NGOTestimonial(db.Model):
    __tablename__ = 'ngo_testimonials'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)
    author = db.Column(db.String(120), nullable=True)
    role = db.Column(db.String(120), nullable=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_card(self) -> dict:
        return {
            'id': self.id,
            'author': self.author,
            'role': self.role,
            'content': self.content,
            'rating': self.rating,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }


