export default function FeedbackPage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-6">Share Feedback</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2">
            <form className="bg-white/95 backdrop-blur rounded-2xl shadow-sm p-6 border border-emerald-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="w-full border border-gray-200 rounded-xl px-3 py-3" placeholder="Name" />
                <input className="w-full border border-gray-200 rounded-xl px-3 py-3" placeholder="Email" />
              </div>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-3 text-gray-700">
                <option>General feedback</option>
                <option>Bug report</option>
                <option>Feature request</option>
                <option>Design suggestion</option>
              </select>
              <textarea className="w-full border border-gray-200 rounded-xl p-3" rows="6" placeholder="Your feedback"></textarea>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600 flex items-center gap-2"><input type="checkbox" className="accent-emerald-600" /> Contact me for follow-up</label>
                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Submit</button>
              </div>
            </form>
          </section>
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">We read every message</h3>
              <p className="text-sm text-gray-600">Thanks for helping us improve SustainAlign. We typically respond within 2 business days.</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-emerald-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Resources</h3>
              <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                <li>Design guidelines</li>
                <li>Changelog</li>
                <li>Feature roadmap</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}


