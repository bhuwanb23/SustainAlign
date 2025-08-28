from datetime import datetime
from .base import db


class DecisionRationale(db.Model):
    __tablename__ = 'decision_rationales'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=True, index=True)

    title = db.Column(db.String(200), nullable=False)
    context = db.Column(db.JSON, nullable=True)  # free-form info shown in the page header/sidebar
    criteria = db.Column(db.JSON, nullable=True)  # {impact: 0.4, cost: 0.3, risk: 0.3}
    options = db.Column(db.JSON, nullable=True)  # [{key, label, data}]
    selected_option = db.Column(db.String(128), nullable=True)
    pros = db.Column(db.JSON, nullable=True)  # list of strings or {key: list}
    cons = db.Column(db.JSON, nullable=True)
    reasoning_steps = db.Column(db.JSON, nullable=True)  # list of strings
    score_breakdown = db.Column(db.JSON, nullable=True)  # {optionKey: {criterion: score}}
    attachments = db.Column(db.JSON, nullable=True)  # [{name, url}]

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    notes = db.relationship('RationaleNote', backref='rationale', cascade='all, delete-orphan')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'projectId': self.project_id,
            'companyId': self.company_id,
            'title': self.title,
            'context': self.context or {},
            'criteria': self.criteria or {},
            'options': self.options or [],
            'selectedOption': self.selected_option,
            'pros': self.pros or [],
            'cons': self.cons or [],
            'reasoningSteps': self.reasoning_steps or [],
            'scoreBreakdown': self.score_breakdown or {},
            'attachments': self.attachments or [],
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None,
            'notes': [n.to_dict() for n in self.notes],
        }


class RationaleNote(db.Model):
    __tablename__ = 'rationale_notes'

    id = db.Column(db.Integer, primary_key=True)
    rationale_id = db.Column(db.Integer, db.ForeignKey('decision_rationales.id'), nullable=False, index=True)
    author = db.Column(db.String(120), nullable=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'author': self.author,
            'content': self.content,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }


