import { useState } from 'react'

export default function NgoOnboardingPage() {
  const [form, setForm] = useState({
    // 1. Basics
    title: '', ngo: '', sector: '', sdgs: '', region: '',
    // 2. Timeline
    start: '', end: '', phase: '', completed: 0, total: 0, nextMilestone: '', nextDue: '',
    // 3. Budget
    allocated: '', spent: '', remaining: '', utilizedPct: '',
    // 4. KPIs
    kpi1: '', kpi2: '', kpi3: '', kpi4: '',
    // 5. Status
    statusText: 'On Track', issues: '', ai: '',
    // 6. Supporting
    report: '', evidence: '', verification: 'Pending',
  })

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    // In a real app, POST to backend then route to marketplace/ngo
    window.location.href = '/marketplace/ngo'
  }

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )

  const Input = ({ label, k, ...props }) => (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <input value={form[k] || ''} onChange={(e) => update(k, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-300" {...props} />
    </label>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">NGO Onboarding – Project Basics</h1>
          <p className="text-sm text-gray-600">Fill these details to activate your profile. You can edit later.</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <Section title="1. Project Basics">
            <Input label="Project Title" k="title" placeholder="e.g., Clean Water Initiative" />
            <Input label="NGO / Implementing Partner" k="ngo" placeholder="Your NGO name" />
            <Input label="Sector" k="sector" placeholder="e.g., Water & Sanitation" />
            <Input label="SDG(s) linked" k="sdgs" placeholder="e.g., Clean Water; Good Health" />
            <Input label="Location / Region" k="region" placeholder="City, State / Country" />
          </Section>

          <Section title="2. Timeline & Milestones">
            <Input label="Start Date" k="start" type="date" />
            <Input label="End Date" k="end" type="date" />
            <Input label="Current Phase" k="phase" placeholder="Planning / Execution / Reporting" />
            <Input label="Completed Milestones" k="completed" type="number" min="0" />
            <Input label="Total Milestones" k="total" type="number" min="0" />
            <Input label="Next Milestone" k="nextMilestone" placeholder="What’s next" />
            <Input label="Next Due Date" k="nextDue" type="date" />
          </Section>

          <Section title="3. Budget & Financials">
            <Input label="Allocated Budget" k="allocated" placeholder="$" />
            <Input label="Amount Spent" k="spent" placeholder="$" />
            <Input label="Remaining Budget" k="remaining" placeholder="$" />
            <Input label="% Utilized" k="utilizedPct" type="number" min="0" max="100" placeholder="0-100" />
          </Section>

          <Section title="4. Impact Metrics (Dynamic KPIs)">
            <Input label="KPI 1" k="kpi1" placeholder="Students Educated / Households Benefited" />
            <Input label="KPI 2" k="kpi2" placeholder="CO₂ Reduced / Trees Planted" />
            <Input label="KPI 3" k="kpi3" placeholder="Liters of Water Conserved" />
            <Input label="KPI 4" k="kpi4" placeholder="Employment Generated" />
          </Section>

          <Section title="5. Status & Alerts">
            <Input label="Current Status" k="statusText" placeholder="On Track / Delayed / At Risk" />
            <Input label="Issues Raised" k="issues" placeholder="fund delays, low impact reports" />
            <Input label="AI Suggestions (optional)" k="ai" placeholder="auto-generated flags or notes" />
          </Section>

          <Section title="6. Supporting Data">
            <Input label="Latest NGO Report" k="report" placeholder="filename or link" />
            <Input label="Evidence Links" k="evidence" placeholder="comma-separated links" />
            <Input label="Verification Status" k="verification" placeholder="corporate / third-party verified" />
          </Section>

          <div className="flex items-center justify-end gap-2">
            <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}


