from datetime import datetime
from .base import db


class ApprovalRequest(db.Model):
    __tablename__ = 'approval_requests'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)
    title = db.Column(db.String(200), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(32), nullable=False, default='pending')  # pending | in_review | approved | rejected
    # New flexible fields for AI recommendations and compliance details
    ai_recommendation = db.Column(db.JSON, nullable=True)  # { label: 'Strongly Recommended', confidencePct: 95, reasons: [...] }
    compliance_notes = db.Column(db.JSON, nullable=True)  # [ 'EPA certification required...', 'ISO 14001 ...', ... ]
    compliance_metrics = db.Column(db.JSON, nullable=True)  # { complianceConfidencePct: 95, impactPositive: true, roi: 'strong' }
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = db.relationship('Project', backref=db.backref('approval_requests', lazy='dynamic'))
    company = db.relationship('Company', backref=db.backref('approval_requests', lazy='dynamic'))
    steps = db.relationship('ApprovalStep', backref='request', cascade='all, delete-orphan', order_by='ApprovalStep.order_index')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'title': self.title,
            'summary': self.summary,
            'status': self.status,
            'aiRecommendation': self.ai_recommendation or None,
            'complianceNotes': self.compliance_notes or [],
            'complianceMetrics': self.compliance_metrics or {},
            'projectId': self.project_id,
            'companyId': self.company_id,
            'createdBy': self.created_by,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None,
            # lightweight relationship summaries for UI convenience
            'project': {'id': self.project.id, 'title': getattr(self.project, 'title', None)} if self.project else None,
            'company': {'id': self.company.id, 'name': getattr(self.company, 'company_name', None)} if self.company else None,
            'steps': [s.to_dict() for s in self.steps],
        }


class ApprovalStep(db.Model):
    __tablename__ = 'approval_steps'

    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.Integer, db.ForeignKey('approval_requests.id'), nullable=False, index=True)
    name = db.Column(db.String(120), nullable=False)
    order_index = db.Column(db.Integer, nullable=False, default=0)
    assignee_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    assignee_role = db.Column(db.String(64), nullable=True)
    status = db.Column(db.String(32), nullable=False, default='pending')  # pending | approved | rejected | skipped
    decision_notes = db.Column(db.Text, nullable=True)
    decided_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'order': self.order_index,
            'assigneeUserId': self.assignee_user_id,
            'assigneeRole': self.assignee_role,
            'status': self.status,
            'decisionNotes': self.decision_notes,
            'decidedAt': self.decided_at.isoformat() if self.decided_at else None,
        }


