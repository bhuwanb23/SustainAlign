import { widthClassFromPercent } from '../../../lib/ui.js'

export default function AdminFooter({ compliancePct }) {
  return (
    <div className="px-6 pb-8">
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-gray-700">Need help? Contact support@sustainalign.com</div>
          <div className="w-full md:w-72">
            <div className="text-sm text-gray-600">Compliance Progress</div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              {(() => {
                const w = widthClassFromPercent(compliancePct)
                return <div className={`bg-emerald-600 h-2 rounded-full ${w}`}></div>
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


