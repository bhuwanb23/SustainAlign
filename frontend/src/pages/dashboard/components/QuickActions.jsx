import { QUICK_ACTIONS } from '@constants'
import Icon from './Icon.jsx'

const colorBg = {
  green: 'bg-green-600 hover:bg-green-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
}

export default function QuickActions({ onNewProject, onGenerateReport, onScheduleReview }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className={`w-full ${colorBg['green']} text-white py-2.5 px-4 rounded-xl font-medium shadow-sm`} onClick={onNewProject}>
          <Icon name={'plus'} className="mr-2" />New Project
        </button>
        <button className={`w-full ${colorBg['blue']} text-white py-2.5 px-4 rounded-xl font-medium shadow-sm`} onClick={onGenerateReport}>
          <Icon name={'file-lines'} className="mr-2" />Generate Report
        </button>
        <button className={`w-full ${colorBg['purple']} text-white py-2.5 px-4 rounded-xl font-medium shadow-sm`} onClick={onScheduleReview}>
          <Icon name={'calendar'} className="mr-2" />Schedule Review
        </button>
      </div>
    </div>
  )
}


