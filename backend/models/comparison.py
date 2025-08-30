from datetime import datetime
from .base import db


class Comparison(db.Model):
    """Model for storing project comparisons"""
    __tablename__ = 'comparisons'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)  # Name for the comparison
    description = db.Column(db.Text)  # Optional description
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship to comparison items
    items = db.relationship('ComparisonItem', backref='comparison', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'items': [item.to_dict() for item in self.items],
            'project_count': len(self.items)
        }


class ComparisonItem(db.Model):
    """Model for individual projects in a comparison"""
    __tablename__ = 'comparison_items'
    
    id = db.Column(db.Integer, primary_key=True)
    comparison_id = db.Column(db.Integer, db.ForeignKey('comparisons.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)  # User notes about this project in comparison
    priority = db.Column(db.Integer, default=0)  # User-defined priority (0 = no priority)
    
    # Relationship to project
    project = db.relationship('Project', backref='comparison_items')
    
    def to_dict(self):
        return {
            'id': self.id,
            'comparison_id': self.comparison_id,
            'project_id': self.project_id,
            'added_at': self.added_at.isoformat() if self.added_at else None,
            'notes': self.notes,
            'priority': self.priority,
            'project': self.project.to_dict() if self.project else None
        }
