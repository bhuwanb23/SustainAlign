function Tip({ icon, title, subtitle }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-emerald-600 text-xs">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{subtitle}</p>
      </div>
    </div>
  )
}

export default function TipsSidebar() {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-emerald-600 mr-2">💡</span>
          Upload Tips
        </h3>
        <div className="space-y-4">
          <Tip icon="✓" title="Supported Formats" subtitle="PDF, Excel (.xlsx), Word (.docx)" />
          <Tip icon="📄" title="Include Key Data" subtitle="Environmental metrics, social impact, governance data" />
          <Tip icon="⏱️" title="Processing Time" subtitle="AI analysis takes 2-5 minutes" />
          <Tip icon="🛡️" title="Data Security" subtitle="Enterprise-grade encryption" />
        </div>
      </div>
    </aside>
  )
}


