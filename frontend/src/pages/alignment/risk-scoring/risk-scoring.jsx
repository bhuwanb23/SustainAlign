import { useState } from 'react'
import useRiskScoring from './hooks/useRiskScoring.js'
import { 
  Sidebar, 
  HeadlineMetrics, 
  UnusualActivitiesPanel, 
  ProjectRiskTable 
} from './components/RiskPanel.jsx'
import { exportRiskReport } from '../../../lib/riskApiNew.js'
import AlertsGrid from '../../monitoring/alerts/components/AlertsGrid.jsx'
import RiskMeter from '../../monitoring/alerts/components/RiskMeter.jsx'

export default function RiskScoringPage() {
  const {
    loading,
    error,
    query,
    setQuery,
    riskFilter,
    setRiskFilter,
    companies,
    selectedCompany,
    setSelectedCompanyId,
    corporateSummary,
    recentUnusualActivities,
    dailyAnalysis,
    unusualActivities,
    dailyMetrics,
    projectRiskDistribution,
    refreshData,
    riskAlerts,
    overallRiskScore
  } = useRiskScoring()

  const [activeTab, setActiveTab] = useState('overview')

  const handleExportReport = async () => {
    try {
      await exportRiskReport('pdf')
    } catch (error) {
      console.error('Error exporting report:', error)
      alert('Failed to export report. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading risk analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Risk Analysis</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={refreshData}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="flex min-h-screen">
        <Sidebar
          query={query}
          setQuery={setQuery}
          riskFilter={riskFilter}
          setRiskFilter={setRiskFilter}
          companies={companies}
          onSelect={setSelectedCompanyId}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Corporate Risk Analysis Dashboard</h2>
                <p className="text-gray-600 mt-1">Comprehensive monitoring of corporate collaboration projects and risk assessment</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleExportReport}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  ⬇ Export Report
                </button>
                <button 
                  onClick={refreshData}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Risk Meter - Overall System Risk */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Overall System Risk Level</h3>
                  <span className="text-sm text-gray-500">Based on all corporate projects</span>
                </div>
                <RiskMeter percent={overallRiskScore} />
              </div>
            </div>

            {/* Headline Metrics and Daily Analysis */}
            <HeadlineMetrics 
              summary={corporateSummary} 
              dailyAnalysis={dailyAnalysis} 
            />

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview', icon: '📊' },
                    { id: 'projects', label: 'Project Analysis', icon: '📋' },
                    { id: 'alerts', label: 'Risk Alerts', icon: '⚠️' },
                    { id: 'recent', label: 'Recent Activities', icon: '🕒' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                      {tab.id === 'alerts' && riskAlerts.length > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] flex items-center justify-center">
                          {riskAlerts.length}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Selected Company Overview */}
                {selectedCompany && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedCompany.company_name} - Risk Overview
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Overall risk score: {selectedCompany.risk_score}% | 
                        Total investment: ₹{(selectedCompany.total_investment / 100000).toFixed(1)}L | 
                        Projects: {selectedCompany.projects?.length || 0}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-green-600 text-xl">✅</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Active Projects</p>
                          <p className="text-2xl font-bold text-gray-900">{dailyMetrics.projects_active || 0}</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-blue-600 text-xl">📈</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Completed</p>
                          <p className="text-2xl font-bold text-gray-900">{dailyMetrics.projects_completed || 0}</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-red-600 text-xl">⚠️</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Delayed</p>
                          <p className="text-2xl font-bold text-gray-900">{dailyMetrics.projects_delayed || 0}</p>
                        </div>
                      </div>

                      {/* Risk Distribution Chart */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Project Risk Distribution</h4>
                        <div className="flex items-center space-x-4">
                          {projectRiskDistribution.map((item) => (
                            <div key={item.label} className="flex-1 text-center">
                              <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                              <div className="text-xs text-gray-600">{item.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Unusual Activities */}
                <UnusualActivitiesPanel activities={recentUnusualActivities} />

                {/* High Priority Alerts Preview */}
                {riskAlerts.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        High Priority Alerts ({riskAlerts.filter(a => a.severity === 'critical').length})
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Critical alerts requiring immediate attention</p>
                    </div>
                    <div className="p-6">
                      <AlertsGrid alerts={riskAlerts.filter(a => a.severity === 'critical').slice(0, 3)} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && selectedCompany && (
              <ProjectRiskTable projects={selectedCompany.projects || []} />
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                {/* Alerts Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Risk Alerts Overview</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Total Alerts: {riskAlerts.length}</span>
                      <span className="text-red-600">Critical: {riskAlerts.filter(a => a.severity === 'critical').length}</span>
                      <span className="text-orange-600">Medium: {riskAlerts.filter(a => a.severity === 'medium').length}</span>
                      <span className="text-green-600">Low: {riskAlerts.filter(a => a.severity === 'low').length}</span>
                    </div>
                  </div>
                  
                  {/* Alert Filters */}
                  <div className="flex items-center gap-4 mb-6">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Severities</option>
                      <option>Critical Only</option>
                      <option>Medium & Critical</option>
                      <option>Low Priority</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Companies</option>
                      {companies.map(company => (
                        <option key={company.company_id}>{company.company_name}</option>
                      ))}
                    </select>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">
                      Export Alerts
                    </button>
                  </div>
                </div>

                {/* Alerts Grid */}
                {riskAlerts.length > 0 ? (
                  <AlertsGrid alerts={riskAlerts} />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Alerts</h3>
                    <p className="text-gray-600">All projects are currently within acceptable risk parameters.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recent' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Risk Activities</h3>
                  <p className="text-sm text-gray-600 mt-1">Latest updates and monitoring events</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUnusualActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          activity.severity === 'high' ? 'bg-red-500' :
                          activity.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{activity.project_title}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{activity.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


