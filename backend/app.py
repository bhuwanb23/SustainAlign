import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import db


def create_app() -> Flask:
	load_dotenv()
	app = Flask(__name__, template_folder='templates')
	app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret")
	app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///sustainalign.db")
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
	CORS(app, resources={r"/api/*": {"origins": os.environ.get("CORS_ORIGIN", "*")}})

	# Init DB
	db.init_app(app)
	with app.app_context():
		db.create_all()

	# Blueprints (API)
	from routes.auth import auth_bp
	from routes.projects import projects_bp
	from routes.reports import reports_bp
	from routes.profile import profile_bp
	app.register_blueprint(auth_bp, url_prefix="/api/auth")
	app.register_blueprint(profile_bp, url_prefix="/api/profile")
	app.register_blueprint(projects_bp, url_prefix="/api")
	app.register_blueprint(reports_bp, url_prefix="/api/reports")

	# View pages
	from routes.views import views_bp
	app.register_blueprint(views_bp)

	@app.route("/api/health")
	def health():
		return jsonify({"status": "ok"}), 200

	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=os.environ.get("FLASK_ENV") == "development")


