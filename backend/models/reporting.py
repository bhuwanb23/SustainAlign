from datetime import datetime
from .base import db


class ReportJob(db.Model):
    __tablename__ = 'report_jobs'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)

    period = db.Column(db.String(64), nullable=False)
    report_type = db.Column(db.String(64), nullable=False)  # CSR Compliance | ESG Progress | SDG Impact
    metrics = db.Column(db.JSON, nullable=True)  # { carbonFootprint: true, waterUsage: false, ... }

    status = db.Column(db.String(24), nullable=False, default='queued')  # queued | generating | completed | failed
    last_updated_human = db.Column(db.String(64), nullable=True)

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    artifacts = db.relationship('ReportArtifact', backref='job', cascade='all, delete-orphan')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'companyId': self.company_id,
            'period': self.period,
            'reportType': self.report_type,
            'metrics': self.metrics or {},
            'status': self.status,
            'lastUpdated': self.last_updated_human,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'artifacts': [a.to_dict() for a in self.artifacts],
        }


class ReportArtifact(db.Model):
    __tablename__ = 'report_artifacts'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('report_jobs.id'), nullable=False, index=True)
    kind = db.Column(db.String(32), nullable=False)  # pdf | csv | json | html
    url = db.Column(db.String(255), nullable=True)
    content = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'kind': self.kind,
            'url': self.url,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }


