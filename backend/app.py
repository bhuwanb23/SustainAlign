import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import db
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.reports import reports_bp
from routes.profile import profile_bp
from routes.comparisons import comparisons_bp
from routes.approvals import approvals_bp
from routes.ai_matching import ai_matching_bp


def create_app() -> Flask:
	load_dotenv()
	app = Flask(__name__, template_folder='templates')
	app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret")
	# Ensure SQLite default path is absolute to avoid multiple DB files when running from different CWDs
	if os.environ.get("DATABASE_URL"):
		app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
	else:
		base_dir = os.path.abspath(os.path.dirname(__file__))
		sqlite_path = os.path.join(base_dir, "sustainalign.db")
		app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{sqlite_path}"
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
	CORS(app, resources={r"/api/*": {"origins": os.environ.get("CORS_ORIGIN", "*")}})

	# Init DB
	db.init_app(app)
	with app.app_context():
		db.create_all()

	# Blueprints (API)
	app.register_blueprint(auth_bp, url_prefix="/api/auth")
	app.register_blueprint(profile_bp, url_prefix="/api/profile")
	app.register_blueprint(projects_bp, url_prefix="/api/projects")
	app.register_blueprint(reports_bp, url_prefix="/api/reports")
	app.register_blueprint(comparisons_bp, url_prefix="/api/comparisons")
	app.register_blueprint(approvals_bp, url_prefix="/api/approvals")
	app.register_blueprint(ai_matching_bp)

	# View pages
	from routes.views import views_bp
	app.register_blueprint(views_bp)

	@app.route("/api/health")
	def health():
		return jsonify({"status": "ok"}), 200

	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=True)


