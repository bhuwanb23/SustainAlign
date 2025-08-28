from datetime import datetime, date
from .base import db


class ProjectTrackingInfo(db.Model):
    __tablename__ = 'project_tracking_info'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False, index=True)

    status = db.Column(db.String(24), nullable=False, default='on-track')  # on-track | delayed | completed
    progress_pct = db.Column(db.Integer, nullable=False, default=0)
    due_date = db.Column(db.Date, nullable=True)
    subtitle = db.Column(db.String(200), nullable=True)
    metric_label = db.Column(db.String(80), nullable=True)
    icon = db.Column(db.String(8), nullable=True)

    gradient_from = db.Column(db.String(16), nullable=True)
    gradient_to = db.Column(db.String(16), nullable=True)
    progress_from = db.Column(db.String(16), nullable=True)
    progress_to = db.Column(db.String(16), nullable=True)
    metric_color = db.Column(db.String(16), nullable=True)

    tooltip = db.Column(db.String(255), nullable=True)
    team_user_ids = db.Column(db.JSON, nullable=True)
    cta_label = db.Column(db.String(64), nullable=True)
    cta_color = db.Column(db.String(16), nullable=True)

    # Flexible details blob for the side panel in tracker UI
    details = db.Column(db.JSON, nullable=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = db.relationship('Project', backref=db.backref('tracking_info', uselist=False))

    def to_card(self) -> dict:
        return {
            'id': f"p{self.project_id}",
            'title': getattr(self.project, 'title', ''),
            'subtitle': self.subtitle,
            'status': self.status,
            'badge': self._badge_for_status(),
            'progressPct': self.progress_pct,
            'due': self._due_label(),
            'metricLabel': self.metric_label,
            'icon': self.icon,
            'gradientFrom': self.gradient_from,
            'gradientTo': self.gradient_to,
            'progressFrom': self.progress_from,
            'progressTo': self.progress_to,
            'metricColor': self.metric_color,
            'tooltip': self.tooltip,
            'team': self.team_user_ids or [],
            'cta': { 'label': self.cta_label, 'color': self.cta_color } if self.cta_label else None,
        }

    def to_detail(self) -> dict:
        d = self.details or {}
        return {
            'id': f"p{self.project_id}",
            'title': getattr(self.project, 'title', None),
            'subtitle': self.subtitle or d.get('ngo') or d.get('subtitle'),
            'icon': self.icon or d.get('icon'),
            'gradientFrom': self.gradient_from or d.get('gradientFrom'),
            'gradientTo': self.gradient_to or d.get('gradientTo'),
            'progressPct': self.progress_pct,
            'metricLabel': self.metric_label or d.get('sector') or d.get('metricLabel'),
            'due': self._due_label(),
            # Basics
            'sector': d.get('sector'),
            'sdgs': d.get('sdgs', []),
            'region': d.get('region'),
            # Timeline & milestones
            'start': d.get('start'),
            'end': d.get('end'),
            'phase': d.get('phase'),
            'completedMilestones': d.get('completedMilestones'),
            'totalMilestones': d.get('totalMilestones'),
            'milestoneSummary': d.get('milestoneSummary'),
            'nextMilestone': d.get('nextMilestone'),
            'nextDue': d.get('nextDue'),
            # Financials
            'allocated': d.get('allocated'),
            'spent': d.get('spent'),
            'remaining': d.get('remaining'),
            'utilizedPct': d.get('utilizedPct'),
            # KPIs & status
            'kpis': d.get('kpis', []),
            'statusText': d.get('statusText'),
            'issues': d.get('issues'),
            'aiSuggestions': d.get('aiSuggestions'),
            # Supporting data
            'latestReport': d.get('latestReport'),
            'evidenceLinks': d.get('evidenceLinks', []),
            'verification': d.get('verification'),
        }

    def _due_label(self) -> str:
        if not self.due_date:
            return ''
        return f"Due: {self.due_date.strftime('%b %Y')}" if self.status != 'completed' else f"Completed: {self.due_date.strftime('%b %Y')}"

    def _badge_for_status(self) -> dict:
        if self.status == 'on-track':
            return { 'text': 'On Track', 'bg': '#DCFCE7', 'textColor': '#166534' }
        if self.status == 'delayed':
            return { 'text': 'Delayed', 'bg': '#FFEDD5', 'textColor': '#9A3412' }
        return { 'text': 'Completed', 'bg': '#DBEAFE', 'textColor': '#1E40AF' }


class ProjectTimelineEntry(db.Model):
    __tablename__ = 'project_timeline_entries'

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String(16), nullable=True)
    text = db.Column(db.String(200), nullable=False)
    quarter = db.Column(db.String(16), nullable=True)  # e.g., Q1 2024
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_item(self) -> dict:
        return { 'color': self.color, 'text': self.text, 'quarter': self.quarter }


