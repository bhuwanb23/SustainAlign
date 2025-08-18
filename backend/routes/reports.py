from flask import Blueprint, jsonify

reports_bp = Blueprint('reports', __name__)


@reports_bp.post('/generate')
def generate_report():
    # Placeholder generator
    return jsonify({'status': 'queued'}), 202


