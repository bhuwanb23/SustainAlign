<div align="center">

## 🌱 SustainAlign

Design-first CSR/ESG platform aligning projects, stakeholders, and outcomes.

[![Status](https://img.shields.io/badge/Status-Active-2ea44f)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](#)
[![Flask](https://img.shields.io/badge/Flask-3-000000?logo=flask&logoColor=white)](#)
[![Highcharts](https://img.shields.io/badge/Highcharts-12-2E5EAA)](#)

</div>


> [!TIP]
> SustainAlign pairs a polished React dashboard with a secure Flask backend to help corporates, NGOs, and regulators collaborate with confidence.


### ✨ Highlights
- **Elegant UI**: React 19 + Tailwind CSS v4 with soft gradients and clean components
- **Role-aware flows**: Corporates, NGOs, and regulators supported
- **Actionable insights**: Highcharts-powered visualizations
- **Fast DX**: Vite 7 dev server, path aliases, instant HMR
- **API-ready backend**: Flask with CORS and env-driven config


### 🔗 Table of Contents
- [Highlights](#-highlights)
- [Project Structure](#-project-structure)
- [Screens and Routes](#-key-screens-and-routes)
- [Tech Stack](#-tech-stack)
- [Quickstart](#-quickstart)
- [Configuration](#-configuration-backend)
- [Frontend Details](#-frontend-details)
- [Backend Details](#-backend-details)
- [Deploy Notes](#-deploy-notes)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap-ideas)


### 🧭 Project Structure
<details>
<summary><b>Click to view the structure</b></summary>

```text
sustainalign/
├─ backend/
│  ├─ app.py                  # Flask app factory + CORS + health endpoint
│  ├─ requirements.txt        # Flask + CORS + dotenv + PyJWT + report/export libs
│  └─ routes/                 # (Blueprints wired in app; stubs in this snapshot)
│
├─ frontend/
│  ├─ src/
│  │  ├─ layouts/
│  │  │  └─ AppLayout.jsx
│  │  ├─ pages/
│  │  │  ├─ dashboard/        # Dashboard page + components, hooks, constants
│  │  │  ├─ auth/             # Login, Signup, Forgot Password, Profile Setup
│  │  │  ├─ discovery/        # Project search, cards
│  │  │  ├─ marketplace/      # Matching, NGO, collaboration
│  │  │  ├─ alignment/        # AI matching, comparison, risk scoring
│  │  │  ├─ monitoring/       # Alerts, impact, tracker
│  │  │  ├─ decision/         # Approval, rationale
│  │  │  ├─ reporting/        # Reports: generator, audit trail
│  │  │  ├─ settings/         # Users, agents, APIs, integrations
│  │  │  ├─ profile/          # Company details, CSR history, SDG selector
│  │  │  └─ support/          # Chat, FAQ, feedback
│  │  ├─ App.jsx              # Routes for auth, dashboard, and modules
│  │  └─ main.jsx             # App bootstrap + BrowserRouter
│  ├─ vite.config.js          # Tailwind v4 plugin + path aliases (@pages, @components, @constants)
│  └─ package.json            # Scripts and deps (React 19, Router 6, Tailwind 4, Highcharts)
│
└─ html/                      # Static prototypes (reference designs)
```
</details>


### 🖼️ Key Screens and Routes
> [!NOTE]
> Explore the app via these friendly, role-aware routes.

| Area | Routes |
|---|---|
| **Auth** | `/login`, `/signup`, `/forgot-password`, `/profile-setup` |
| **Dashboard** | `/dashboard` |
| **Discovery** | `/discovery/project-search`, `/discovery/project-cards` |
| **Marketplace** | `/marketplace/matching`, `/marketplace/ngo`, `/marketplace/collaboration` |
| **Alignment** | `/alignment/ai-matching`, `/alignment/comparison-matrix`, `/alignment/risk-scoring` |
| **Monitoring** | `/monitoring/alerts`, `/monitoring/impact`, `/monitoring/tracker` |
| **Decision** | `/decision/approval`, `/decision/rationale` |
| **Reporting** | `/reporting/generator`, `/reporting/audit-trail` |
| **Settings** | `/settings/users`, `/settings/agents`, `/settings/apis`, `/settings/integrations` |
| **Profile** | `/profile/company-details`, `/profile/csr-history`, `/profile/sdg-selector` |
| **Support** | `/support/chat`, `/support/faq`, `/support/feedback` |

Tip: See the `html/` directory for high-fidelity prototypes like `dashboard.html` and `project-discovery.html`.


### 🛠️ Tech Stack
- **Frontend**: React 19, Vite 7, Tailwind CSS v4 (`@tailwindcss/vite`), React Router 6, Highcharts
- **Backend**: Flask 3, Flask-CORS, python-dotenv, PyJWT, ReportLab, XlsxWriter


### 🚀 Quickstart
<details>
<summary><b>Frontend (Vite + React)</b></summary>

```bash
cd frontend
npm install
npm run dev
# Dev server: http://localhost:5173
```
</details>

<details>
<summary><b>Backend (Flask)</b></summary>

```bash
cd backend
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
# Environment variables (examples)
# PowerShell
$env:SECRET_KEY = "dev-secret"
$env:CORS_ORIGIN = "http://localhost:5173"
$env:FLASK_ENV = "development"
python app.py
# Server: http://localhost:5000
```
Health check: `GET /api/health` → `{ "status": "ok" }`
</details>


### 🔧 Configuration (Backend)
- **SECRET_KEY**: Flask session/crypto secret
- **CORS_ORIGIN**: Allowed origin for `/api/*` (e.g., dev frontend)
- **FLASK_ENV**: `development` enables debug mode
- **PORT**: Defaults to `5000`


### 🧩 Frontend Details
> [!TIP]
> DX niceties to stay productive and consistent.

- **Routing**: Defined in `src/App.jsx` (wrapped by `BrowserRouter` in `src/main.jsx`)
- **Aliases** (see `vite.config.js`): `@pages`, `@components`, `@constants`
- **Styling**: Tailwind v4 via the Vite plugin (`@tailwindcss/vite`)
- **Charts**: Highcharts + `highcharts-react-official`

Common scripts (run in `frontend/`):

```bash
npm run dev       # Start dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Lint the codebase
```


### 🗄️ Backend Details
- **App factory**: `create_app()` in `backend/app.py`
- **CORS**: enabled for `/api/*` using `CORS_ORIGIN`
- **Blueprints**: `auth`, `profile`, `projects`, `reports` are registered (routes are stubbed in this snapshot)

Suggested production entry:

```bash
# WSGI target: backend.app:create_app
# Example (gunicorn):
# gunicorn -w 2 -b 0.0.0.0:5000 "backend.app:create_app()"
```


### 📦 Deploy Notes
- **Frontend**: build with `npm run build` → serve `frontend/dist/`
- **Backend**: run behind a WSGI server; set `CORS_ORIGIN` to the deployed frontend URL


### 🤝 Contributing
- **Small PRs** with clear, descriptive commit messages
- **Readable code**: match existing style and naming conventions
- **Accessible components**: prefer composition over complexity


### 💡 Roadmap Ideas
- **Auth**: Full JWT flows and persisted sessions
- **Data**: Models + DB integration
- **Dashboards**: KPIs, compliance, impact
- **Exports**: PDF/XLSX reporting enhancements
- **UX**: Accessibility pass and dark theme

---

<div align="center">
Made with care for sustainability-minded teams 🌍
</div>
