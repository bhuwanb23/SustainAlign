import Icon from './Icon.jsx'

const colorText = {
  red: 'text-red-500',
  yellow: 'text-yellow-500',
}

const colorBg = {
  red: 'bg-red-50',
  yellow: 'bg-yellow-50',
}

export default function ComplianceAlerts({ alerts }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Alerts</h3>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.title} className={`flex items-start space-x-3 p-3 ${colorBg[a.color]} rounded-lg`}>
            <Icon name={a.icon} className={`${colorText[a.color]} mt-1`} />
            <div>
              <p className="text-sm font-medium text-gray-800">{a.title}</p>
              <p className="text-xs text-gray-600">{a.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


