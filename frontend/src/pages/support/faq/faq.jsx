export default function FaqPage() {
  const faqs = [
    { q: 'What is CSR in India?', a: 'Corporate Social Responsibility under the Companies Act, 2013 with Schedule VII focus areas.' },
    { q: 'How do I verify 80G/12A?', a: 'Check NGO documents and registration on official portals; maintain copies for audits.' },
    { q: 'What are ESG basics?', a: 'Environmental, Social, and Governance reporting with materiality, KPIs, and assurance.' },
    { q: 'How do I start impact measurement?', a: 'Define a logic model, select KPIs, set baselines, and track monthly.' },
  ]
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-6">Help & FAQ</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Popular Topics</h3>
              <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                <li>CSR & Schedule VII</li>
                <li>ESG Reporting</li>
                <li>Impact KPIs</li>
                <li>Audit Readiness</li>
              </ul>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-sm text-gray-600">support@sustainalign.example</p>
              <p className="text-sm text-gray-600">Mon–Fri, 9am–6pm IST</p>
            </div>
          </aside>
          <section className="md:col-span-2 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white/95 backdrop-blur rounded-2xl shadow-sm p-4 border border-emerald-100">
                <summary className="cursor-pointer font-medium text-gray-900">{f.q}</summary>
                <p className="mt-2 text-gray-700">{f.a}</p>
              </details>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}


