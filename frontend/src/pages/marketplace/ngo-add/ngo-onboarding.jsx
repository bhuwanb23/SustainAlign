import { useState } from 'react'
import { apiPost } from '../../../lib/api'

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function Input({ label, value, onChange, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-300"
        {...props}
      />
    </label>
  )
}

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

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await apiPost('/api/profile/ngo-onboarding', form)
      console.log('NGO Onboarding saved:', response)
      localStorage.setItem('ngoOnboardingComplete', 'true')
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Failed to save NGO onboarding:', error)
      alert('Failed to save NGO onboarding. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">NGO Onboarding – Project Basics</h1>
          <p className="text-sm text-gray-600">Fill these details to activate your profile. You can edit later.</p>
          
          {/* Special message for new NGO users */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <span className="text-lg">🔒</span>
              <span className="font-medium">Complete this form to unlock access to SustainAlign</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Your account is ready, but you need to set up your NGO profile first.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <Section title="1. Project Basics">
            <Input label="Project Title" value={form.title} onChange={(v) => update('title', v)} placeholder="e.g., Clean Water Initiative" />
            <Input label="NGO / Implementing Partner" value={form.ngo} onChange={(v) => update('ngo', v)} placeholder="Your NGO name" />
            <Input label="Sector" value={form.sector} onChange={(v) => update('sector', v)} placeholder="e.g., Water & Sanitation" />
            <Input label="SDG(s) linked" value={form.sdgs} onChange={(v) => update('sdgs', v)} placeholder="e.g., Clean Water; Good Health" />
            <Input label="Location / Region" value={form.region} onChange={(v) => update('region', v)} placeholder="City, State / Country" />
          </Section>

          <Section title="2. Timeline & Milestones">
            <Input label="Start Date" value={form.start} onChange={(v) => update('start', v)} type="date" />
            <Input label="End Date" value={form.end} onChange={(v) => update('end', v)} type="date" />
            <Input label="Current Phase" value={form.phase} onChange={(v) => update('phase', v)} placeholder="Planning / Execution / Reporting" />
            <Input label="Completed Milestones" value={form.completed} onChange={(v) => update('completed', v)} type="number" min="0" />
            <Input label="Total Milestones" value={form.total} onChange={(v) => update('total', v)} type="number" min="0" />
            <Input label="Next Milestone" value={form.nextMilestone} onChange={(v) => update('nextMilestone', v)} placeholder="What’s next" />
            <Input label="Next Due Date" value={form.nextDue} onChange={(v) => update('nextDue', v)} type="date" />
          </Section>

          <Section title="3. Budget & Financials">
            <Input label="Allocated Budget" value={form.allocated} onChange={(v) => update('allocated', v)} placeholder="$" />
            <Input label="Amount Spent" value={form.spent} onChange={(v) => update('spent', v)} placeholder="$" />
            <Input label="Remaining Budget" value={form.remaining} onChange={(v) => update('remaining', v)} placeholder="$" />
            <Input label="% Utilized" value={form.utilizedPct} onChange={(v) => update('utilizedPct', v)} type="number" min="0" max="100" placeholder="0-100" />
          </Section>

          <Section title="4. Impact Metrics (Dynamic KPIs)">
            <Input label="KPI 1" value={form.kpi1} onChange={(v) => update('kpi1', v)} placeholder="Students Educated / Households Benefited" />
            <Input label="KPI 2" value={form.kpi2} onChange={(v) => update('kpi2', v)} placeholder="CO₂ Reduced / Trees Planted" />
            <Input label="KPI 3" value={form.kpi3} onChange={(v) => update('kpi3', v)} placeholder="Liters of Water Conserved" />
            <Input label="KPI 4" value={form.kpi4} onChange={(v) => update('kpi4', v)} placeholder="Employment Generated" />
          </Section>

          <Section title="5. Status & Alerts">
            <Input label="Current Status" value={form.statusText} onChange={(v) => update('statusText', v)} placeholder="On Track / Delayed / At Risk" />
            <Input label="Issues Raised" value={form.issues} onChange={(v) => update('issues', v)} placeholder="fund delays, low impact reports" />
            <Input label="AI Suggestions (optional)" value={form.ai} onChange={(v) => update('ai', v)} placeholder="auto-generated flags or notes" />
          </Section>

          <Section title="6. Supporting Data">
            <Input label="Latest NGO Report" value={form.report} onChange={(v) => update('report', v)} placeholder="filename or link" />
            <Input label="Evidence Links" value={form.evidence} onChange={(v) => update('evidence', v)} placeholder="comma-separated links" />
            <Input label="Verification Status" value={form.verification} onChange={(v) => update('verification', v)} placeholder="corporate / third-party verified" />
          </Section>

          <div className="flex items-center justify-end gap-2">
            <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}


