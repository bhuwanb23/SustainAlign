# 🌿 SustainAlign Frontend (React + Vite + Tailwind)

Beautiful, fast, and data-rich CSR/ESG management UI – built for hackathons and production-ready refinement.

> Eco-green + corporate blue theme, smooth charts, modular widgets, and polished auth flows.

---

## ✨ Highlights
- ⚡️ Vite-powered dev experience (HMR)
- 🎨 Tailwind with subtle animations and gradients
- 📈 Highcharts dashboards and widgets
- 🧭 React Router app shell with global TopNav
- 🔐 Auth-ready (login, signup, forgot password)

---

## 📦 Tech Stack
- React 18 + Vite
- Tailwind (via `@tailwindcss/vite`)
- Highcharts (+ `highcharts-react-official`)
- React Router v6

---

## 🚀 Quick Start
Requirements: Node 18+

```bash
# from sustainalign/frontend
npm install
npm run dev
```

- App: `http://localhost:5173`
- Backend (Flask): `http://localhost:5000` (CORS enabled)

---

## 🧱 App Structure (Essentials)
```
src/
  components/
    TopNav.jsx              # Global navbar
  layouts/
    AppLayout.jsx           # App shell (TopNav + content)
  lib/
    api.js                  # apiPost helper
  pages/
    auth/                   # Auth screens (use AuthLayout)
    dashboard/              # Admin dashboard (composed widgets)
      components/           # Modular widgets
      hooks/
    discovery/ profile/ alignment/ decision/
    monitoring/ reporting/ marketplace/ settings/ support/
```

---

## 🗺️ Routing
Defined in `src/App.jsx`.

- Auth (no app shell): `/login`, `/signup`, `/forgot-password`, `/profile-setup`
- App (with shell): `/dashboard`, `/discovery/*`, `/alignment/*`, `/monitoring/*`, `/reporting/*`, `/marketplace/*`, `/settings/*`, `/support/*`

---

## 🔑 Authentication
- UI: `pages/auth/*` use `AuthLayout` (animated, themed)
- API: `lib/api.js` → `apiPost('/api/auth/...')`
- Token: stored in `localStorage` as `token`

---

## 📊 Admin Dashboard (Widgets)
Composed in `pages/dashboard/dashboard.jsx` using modular components in `pages/dashboard/components/`:

- 👋 `AdminHeader` – Welcome + date + KPI bar
- 💵 `FinancialsSection` – Allocation vs Utilization (chart), 12‑month trend (chart), breakdown table with spark-bars
- 🌍 `EsgSdgSection` – ESG breakdown (chart), SDG heatmap, Company vs Industry (chart)
- 🧩 `ActiveProjectsSnapshot` – Project cards + sector distribution (chart) + impact KPIs
- ⚠️ `ComplianceRiskSection` – Alerts list + risk meter gauge
- 🤖 `InsightsSection` – AI suggestions, Top 3 projects, impact forecast
- 🛠️ `QuickActionsPanel` – Find Projects, Generate Report, Monitoring, Settings
- 📈 `AdminFooter` – Compliance progress bar + support

> Charts use Highcharts; demo data included. Replace with live API responses when backend is ready.

---

## 🎨 Styling & Animations
- Tailwind utilities + subtle drop-shadows and rounded cards
- Auth pages include animated ambient gradients (`src/index.css`)
- Eco-green 🌿 + corporate blue 💼 palette for a trusted feel

---

## 🔗 Backend Integration
- Frontend calls `/api/*` (proxied to Flask at `http://localhost:5000`)
- Configure backend `CORS_ORIGIN` if frontend origin differs

---

## 🛠️ Scripts
- `npm run dev` – Start dev server
- `npm run build` – Production build to `dist/`
- `npm run preview` – Preview built app

---

## 🖼️ Screenshots (add yours)
- Dashboard: `docs/screenshots/dashboard.png`
- Auth (Login): `docs/screenshots/login.png`

---

## 📦 Build & Deploy
```bash
npm run build
# serve dist/ with SPA fallback to index.html
```

Deploy to Netlify/Vercel/Nginx with SPA routing enabled.

---

## 🙌 Contributing (optional)
PRs welcome – keep components modular, accessible, and chart configs data-driven.
