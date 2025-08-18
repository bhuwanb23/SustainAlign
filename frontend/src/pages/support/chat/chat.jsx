export default function AiChatAssistantPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">AI Chat Assistant</h1>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto">Chat history…</div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border border-gray-200 rounded-xl p-2" placeholder="Ask about CSR rules…" />
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Send</button>
        </div>
      </div>
    </div>
  )
}


