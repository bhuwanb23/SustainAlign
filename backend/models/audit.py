from datetime import datetime
from .base import db


class AuditEvent(db.Model):
    __tablename__ = 'audit_events'

    id = db.Column(db.Integer, primary_key=True)
    entity_type = db.Column(db.String(64), nullable=False)  # e.g., project, approval, company, report
    entity_id = db.Column(db.Integer, nullable=True, index=True)
    action = db.Column(db.String(64), nullable=False)  # created | updated | deleted | status_changed | generated | login | etc
    actor_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True, index=True)
    actor_role = db.Column(db.String(64), nullable=True)
    source = db.Column(db.String(64), nullable=True)  # ui | api | system | scheduler

    message = db.Column(db.String(255), nullable=True)
    metadata = db.Column(db.JSON, nullable=True)  # arbitrary structured details for the event

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'entityType': self.entity_type,
            'entityId': self.entity_id,
            'action': self.action,
            'actorUserId': self.actor_user_id,
            'actorRole': self.actor_role,
            'source': self.source,
            'message': self.message,
            'metadata': self.metadata or {},
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }


