from datetime import datetime, date
from .base import db


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


