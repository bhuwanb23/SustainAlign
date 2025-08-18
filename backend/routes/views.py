from flask import Blueprint, render_template
from models import User, db

views_bp = Blueprint('views', __name__)


@views_bp.get('/')
def index():
	return render_template('index.html')


@views_bp.get('/dashboard')
def dashboard():
	user_count = db.session.scalar(db.select(db.func.count()).select_from(User))
	return render_template('dashboard.html', user_count=user_count)


@views_bp.get('/users')
def users():
	all_users = User.query.order_by(User.created_at.desc()).all()
	return render_template('users.html', users=all_users)


@views_bp.get('/projects')
def projects():
	# Placeholder projects to display
	placeholder = [
		{'id': 'p1', 'title': 'Clean Water Initiative', 'budget': 450000},
		{'id': 'p2', 'title': 'Education Access Program', 'budget': 320000},
	]
	return render_template('projects.html', projects=placeholder)


@views_bp.get('/api-docs')
def api_docs():
	return render_template('api_docs.html')


@views_bp.get('/health')
def health_page():
	return render_template('health.html')


