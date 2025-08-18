# SustainAlign Backend (Flask)

A lightweight Flask API to support authentication and core endpoints for the SustainAlign hackathon app.

## Features
- JWT authentication (signup, login, forgot-password stub)
- SQLAlchemy models with SQLite by default
- CORS enabled for local frontend
- Health check endpoint

## Quick start

1. Create a virtual environment and install deps

```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell
pip install -r requirements.txt
```

2. Configure environment

Create a `.env` file with:

```
FLASK_ENV=development
SECRET_KEY=change-this-secret
CORS_ORIGIN=http://localhost:5173
PORT=5000
DATABASE_URL=sqlite:///sustainalign.db
PASSWORD_SALT=please-change-salt
```

3. Run the server

```bash
python app.py
```

API will be available at `http://localhost:5000`.

## Endpoints

- `GET /api/health` – health check
- `POST /api/auth/signup` – body: `{ email, password, role }`
- `POST /api/auth/login` – body: `{ email, password }`
- `POST /api/auth/forgot-password` – body: `{ email }` (stub only)

## Project structure
```
backend/
  app.py            # app factory and blueprint registration
  models.py         # SQLAlchemy models
  utils.py          # hashing, JWT helpers
  routes/
    auth.py
    projects.py
    profile.py
    reports.py
  requirements.txt
```

## Development notes
- The DB file `sustainalign.db` will be created automatically on first run.
- Do not use static salts or dev secrets in production.
- Extend models and routes as needed for additional features (projects, reports, etc.).
