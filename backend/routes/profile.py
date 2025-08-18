from flask import Blueprint, jsonify

profile_bp = Blueprint('profile', __name__)


@profile_bp.get('/me')
def me():
    # Placeholder
    return jsonify({'ok': True})


