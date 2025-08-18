export default function FeedbackPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4">Feedback</h1>
      <form className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-4">
        <input className="w-full border border-gray-200 rounded-xl p-3" placeholder="Name" />
        <input className="w-full border border-gray-200 rounded-xl p-3" placeholder="Email" />
        <textarea className="w-full border border-gray-200 rounded-xl p-3" rows="5" placeholder="Your feedback"></textarea>
        <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white">Submit</button>
      </form>
    </div>
  )
}


