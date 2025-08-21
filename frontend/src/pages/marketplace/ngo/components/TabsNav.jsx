export default function TabsNav({ activeTab, setActiveTab }) {
  const Tab = ({ id, children }) => {
    const isActive = activeTab === id
    const base = 'flex items-center px-4 py-3 rounded-lg font-medium'
    if (isActive) return <button className={`${base} bg-emerald-400 text-white`} onClick={() => setActiveTab(id)}>{children}</button>
    return <button className={`${base} text-gray-600 hover:bg-gray-50`} onClick={() => setActiveTab(id)}>{children}</button>
  }
  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex flex-wrap gap-2">
          <Tab id="impact">📈 Impact Timeline</Tab>
          <Tab id="documents">📄 Documents</Tab>
          <Tab id="audits">🧮 Financial Audits</Tab>
          <Tab id="certificates">🎖️ Certificates</Tab>
          <Tab id="testimonials">💬 Testimonials</Tab>
        </div>
      </div>
    </section>
  )
}


