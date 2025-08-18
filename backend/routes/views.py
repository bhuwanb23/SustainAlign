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



@views_bp.get('/database')
def database_view():
	tables_info = []
	# Iterate over all known tables in SQLAlchemy metadata
	for table in db.metadata.sorted_tables:
		try:
			total_rows = db.session.scalar(
				db.select(db.func.count()).select_from(table)
			)
		except Exception:
			total_rows = None

		column_names = [col.name for col in table.c]
		preview_rows = []
		try:
			result = db.session.execute(db.select(table).limit(25))
			for row in result:
				mapping = row._mapping
				preview_rows.append({name: mapping.get(name) for name in column_names})
		except Exception:
			preview_rows = []

		tables_info.append({
			'name': table.name,
			'columns': column_names,
			'count': total_rows,
			'rows': preview_rows,
		})

	return render_template('database.html', tables=tables_info)