from datetime import datetime, date
from .base import db


class ImpactMetricSnapshot(db.Model):
    __tablename__ = 'impact_metric_snapshots'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)
    as_of_date = db.Column(db.Date, nullable=False, default=date.today, index=True)

    beneficiaries = db.Column(db.Integer, nullable=True)
    trees_planted = db.Column(db.Integer, nullable=True)
    co2_reduced_tons = db.Column(db.Float, nullable=True)
    water_saved_liters = db.Column(db.Float, nullable=True)
    energy_generated_kwh = db.Column(db.Float, nullable=True)
    waste_reduced_tons = db.Column(db.Float, nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_cards(self) -> list:
        return [
            { 'label': 'Total Beneficiaries', 'value': self.beneficiaries or 0 },
            { 'label': 'Trees Planted', 'value': self.trees_planted or 0 },
            { 'label': 'CO₂ Reduced (tons)', 'value': round(self.co2_reduced_tons or 0, 2) },
            { 'label': 'Water Saved (L)', 'value': round(self.water_saved_liters or 0, 0) },
        ]


class ImpactTimeSeries(db.Model):
    __tablename__ = 'impact_time_series'

    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(64), nullable=False, index=True)  # e.g., 'co2_reduced_tons'
    ts_date = db.Column(db.Date, nullable=False, index=True)
    value = db.Column(db.Float, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)

    def to_point(self) -> dict:
        return { 'date': self.ts_date.isoformat(), 'value': self.value }


class ImpactRegionStat(db.Model):
    __tablename__ = 'impact_region_stats'

    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(80), nullable=True)
    region = db.Column(db.String(80), nullable=True)
    city = db.Column(db.String(80), nullable=True)
    metric_name = db.Column(db.String(64), nullable=False)
    period_month = db.Column(db.String(7), nullable=False)  # YYYY-MM
    value = db.Column(db.Float, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)

    def to_row(self) -> dict:
        return {
            'country': self.country,
            'region': self.region,
            'city': self.city,
            'metric': self.metric_name,
            'period': self.period_month,
            'value': self.value,
        }


class ImpactGoal(db.Model):
    __tablename__ = 'impact_goals'

    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(64), nullable=False)
    period_month = db.Column(db.String(7), nullable=False)  # YYYY-MM
    target_value = db.Column(db.Float, nullable=False)
    current_value = db.Column(db.Float, nullable=False, default=0)
    status = db.Column(db.String(16), nullable=False, default='on_track')  # on_track | at_risk | off_track
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)

    def to_dict(self) -> dict:
        return {
            'metric': self.metric_name,
            'period': self.period_month,
            'target': self.target_value,
            'current': self.current_value,
            'status': self.status,
        }


