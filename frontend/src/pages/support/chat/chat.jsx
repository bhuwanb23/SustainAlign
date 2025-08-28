export default function AiChatAssistantPage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-6">AI Chat Assistant</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick Prompts</h3>
              <div className="flex flex-wrap gap-2">
                {['CSR rules for FY2024','80G/12A basics','Draft ESG summary','Create audit checklist','Best KPIs for waste mgmt'].map(t => (
                  <button key={t} className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">{t}</button>
                ))}
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Assistant Status</h3>
              <p className="text-sm text-gray-600">Model: SustainAlign-Guided • Latency: ~800ms • Uptime: 99.9%</p>
            </div>
          </aside>
          <section className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-sm border border-emerald-100 h-[560px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="text-sm text-gray-500">No messages yet. Try a quick prompt on the left ↖</div>
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 text-white flex items-center justify-center">🤖</div>
                  <div className="max-w-[90%] bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-sm text-gray-800">Hi! I can help with CSR/ESG, audits, and impact reports. Ask me anything.</div>
                </div>
              </div>
              <div className="p-4 border-t border-emerald-100">
                <div className="flex gap-2">
                  <input className="flex-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Ask about CSR rules…" />
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Send</button>
                </div>
                <div className="mt-2 text-[11px] text-gray-500">Tip: Shift + Enter for newline • Your data stays on this device</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


