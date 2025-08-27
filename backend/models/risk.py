from datetime import datetime
from .base import db


class NGORiskAssessment(db.Model):
    __tablename__ = 'ngo_risk_assessments'

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey('ngo_profiles.id'), nullable=False, index=True)

    # Summary risk
    risk_level = db.Column(db.String(16), nullable=False, default='Low')  # Low | Medium | High
    highlight_metric_label = db.Column(db.String(64), nullable=True)
    highlight_metric_value_pct = db.Column(db.Integer, nullable=True)  # 0-100

    # Dimension scores
    financial_stability_pct = db.Column(db.Integer, nullable=True)
    compliance_score_pct = db.Column(db.Integer, nullable=True)
    execution_track_pct = db.Column(db.Integer, nullable=True)
    transparency_pct = db.Column(db.Integer, nullable=True)
    legal_standing_pct = db.Column(db.Integer, nullable=True)

    # Chart data
    radar_categories = db.Column(db.JSON, nullable=True)  # ["Financial", "Compliance", ...]
    radar_values = db.Column(db.JSON, nullable=True)      # [92, 88, 95, 90, 85]
    trend_categories = db.Column(db.JSON, nullable=True)  # ["Jan", "Feb", ...]
    trend_avg = db.Column(db.JSON, nullable=True)         # [75, 78, ...]
    trend_bench = db.Column(db.JSON, nullable=True)       # [70, 72, ...]

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    ngo = db.relationship('NGOProfile', backref=db.backref('risk_assessments', lazy='dynamic'))

    def to_summary(self) -> dict:
        return {
            'id': f"ngo-{self.ngo_id}",
            'name': getattr(self.ngo, 'name', ''),
            'sector': ', '.join(self.ngo.primary_sectors or []) if getattr(self.ngo, 'primary_sectors', None) else '',
            'risk': self.risk_level,
            'highlightMetric': {
                'label': self.highlight_metric_label or 'Compliance Score',
                'valuePct': self.highlight_metric_value_pct or (self.compliance_score_pct or 0)
            }
        }

    def to_detail(self) -> dict:
        return {
            'id': f"ngo-{self.ngo_id}",
            'name': getattr(self.ngo, 'name', ''),
            'metrics': {
                'financialStability': self.financial_stability_pct or 0,
                'pastCompliance': self.compliance_score_pct or 0,
                'executionTrack': self.execution_track_pct or 0,
                'transparency': self.transparency_pct or 0,
                'legalStanding': self.legal_standing_pct or 0,
            },
            'radarSeries': {
                'categories': self.radar_categories or ['Financial', 'Compliance', 'Execution', 'Transparency', 'Legal'],
                'data': self.radar_values or [0, 0, 0, 0, 0],
            },
            'trendSeries': {
                'categories': self.trend_categories or [],
                'avg': self.trend_avg or [],
                'bench': self.trend_bench or [],
            }
        }


