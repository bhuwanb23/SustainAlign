export default function FaqPage() {
  const faqs = [
    { q: 'What is CSR in India?', a: 'Corporate Social Responsibility under the Companies Act, 2013.' },
    { q: 'What are ESG basics?', a: 'Environmental, Social, and Governance reporting principles.' },
  ]
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">FAQ</h1>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <summary className="cursor-pointer font-medium text-gray-900">{f.q}</summary>
            <p className="mt-2 text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}


