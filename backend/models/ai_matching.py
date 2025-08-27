from datetime import datetime
from .base import db


class AIMatch(db.Model):
    __tablename__ = 'ai_matches'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign keys
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False, index=True)

    # Scoring and display fields
    alignment_score = db.Column(db.Integer, nullable=False, default=0)  # 0-100
    investment_min = db.Column(db.Numeric(18, 2), nullable=True)
    investment_max = db.Column(db.Numeric(18, 2), nullable=True)
    investment_currency = db.Column(db.String(8), nullable=True)
    timeline_months = db.Column(db.Integer, nullable=True)
    location_text = db.Column(db.String(255), nullable=True)
    

    # Optional metadata
    tags = db.Column(db.JSON, nullable=True)  # e.g., [{ icon: '🎓', bg: 'bg-blue-100', fg: 'text-blue-600' }]
    rationale = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships (read-only convenience)
    project = db.relationship('Project', backref=db.backref('ai_matches', lazy='dynamic'))
    company = db.relationship('Company', backref=db.backref('ai_matches', lazy='dynamic'))

    def investment_range_label(self) -> str:
        if self.investment_min is None and self.investment_max is None:
            return ''
        currency = (self.investment_currency or '').upper()
        if self.investment_min is not None and self.investment_max is not None:
            return f"{currency}{int(self.investment_min):,} - {currency}{int(self.investment_max):,}"
        if self.investment_min is not None:
            return f"{currency}{int(self.investment_min):,}+"
        return f"Up to {currency}{int(self.investment_max):,}"

    def timeline_label(self) -> str:
        return f"{self.timeline_months} months" if self.timeline_months else ''

    def to_dict(self) -> dict:
        # Shape aligned to frontend AI_MATCHES constants where possible
        return {
            'id': f"m{self.id}",
            'title': getattr(self.project, 'title', None),
            'summary': getattr(self.project, 'short_description', None),
            'alignmentScore': self.alignment_score,
            'investmentRange': self.investment_range_label(),
            'timeline': self.timeline_label(),
            'location': self.location_text or self._derive_location(),
            'tags': self.tags or [],
            'projectId': self.project_id,
            'companyId': self.company_id,
        }

    def _derive_location(self) -> str:
        if not self.project:
            return ''
        parts = [getattr(self.project, 'location_city', None), getattr(self.project, 'location_region', None), getattr(self.project, 'location_country', None)]
        return ', '.join([p for p in parts if p])


