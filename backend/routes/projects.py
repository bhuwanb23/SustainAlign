from flask import Blueprint, jsonify

projects_bp = Blueprint('projects', __name__)


@projects_bp.get('/projects')
def list_projects():
    # Placeholder data
    return jsonify({
        'projects': [
            {'id': 'p1', 'title': 'Clean Water Initiative', 'budget': 450000},
            {'id': 'p2', 'title': 'Education Access Program', 'budget': 320000},
        ]
    })


