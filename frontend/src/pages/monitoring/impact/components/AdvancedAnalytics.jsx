import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AdvancedAnalytics({ analysisResults, loading }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!analysisResults || Object.keys(analysisResults).length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-500 text-center">No analysis data available</p>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'statistics', label: 'Statistics', icon: '📈' },
    { id: 'trends', label: 'Trends', icon: '📉' },
    { id: 'anomalies', label: 'Anomalies', icon: '⚠️' },
    { id: 'predictions', label: 'Predictions', icon: '🔮' },
    { id: 'risk', label: 'Risk Assessment', icon: '🛡️' },
    { id: 'benchmarks', label: 'Benchmarks', icon: '🏆' }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Impact Score */}
      {analysisResults.impactScore && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Impact Score</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: analysisResults.impactScore.grade.color }}>
                {analysisResults.impactScore.total}
              </div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: analysisResults.impactScore.grade.color }}>
                {analysisResults.impactScore.grade.grade}
              </div>
              <div className="text-sm text-gray-600">{analysisResults.impactScore.grade.label}</div>
            </div>
          </div>
          
          {/* Score Breakdown */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysisResults.impactScore.breakdown).map(([category, score]) => (
              <div key={category} className="text-center">
                <div className="text-lg font-semibold text-gray-900">{Math.round(score * 100)}%</div>
                <div className="text-xs text-gray-600 capitalize">{category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Trend Analysis</h4>
          {Object.entries(analysisResults.trends || {}).slice(0, 3).map(([metric, trend]) => (
            <div key={metric} className="mb-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {metric.replace(/_/g, ' ')}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trend.trendDirection === 'increasing' ? 'bg-green-100 text-green-800' :
                  trend.trendDirection === 'decreasing' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trend.trendDirection}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Confidence: {trend.confidence} • R²: {trend.rSquared}
              </div>
            </div>
          ))}
        </div>

        {/* Risk Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Risk Assessment</h4>
          {analysisResults.riskAssessment && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Risk Level</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  analysisResults.riskAssessment.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                  analysisResults.riskAssessment.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {analysisResults.riskAssessment.riskLevel}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Score: {analysisResults.riskAssessment.riskScore}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStatistics = () => (
    <div className="space-y-6">
      {Object.entries(analysisResults.statistics || {}).map(([metric, stats]) => (
        <div key={metric} className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">
            {metric.replace(/_/g, ' ')} Statistics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{stats.mean}</div>
              <div className="text-xs text-gray-500">Mean</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{stats.median}</div>
              <div className="text-xs text-gray-500">Median</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{stats.stdDev}</div>
              <div className="text-xs text-gray-500">Std Dev</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{stats.range}</div>
              <div className="text-xs text-gray-500">Range</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTrends = () => (
    <div className="space-y-6">
      {Object.entries(analysisResults.trends || {}).map(([metric, trend]) => (
        <div key={metric} className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">
            {metric.replace(/_/g, ' ')} Trend Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Direction</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trend.trendDirection === 'increasing' ? 'bg-green-100 text-green-800' :
                  trend.trendDirection === 'decreasing' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trend.trendDirection}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Strength</span>
                <span className="text-xs text-gray-600">{trend.trendStrength}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Confidence</span>
                <span className="text-xs text-gray-600">{trend.confidence}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Slope</span>
                <span className="text-xs text-gray-600">{trend.slope}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">R²</span>
                <span className="text-xs text-gray-600">{trend.rSquared}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Next Prediction</span>
                <span className="text-xs text-gray-600">{trend.prediction}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAnomalies = () => (
    <div className="space-y-6">
      {Object.entries(analysisResults.anomalies || {}).map(([metric, anomalies]) => (
        <div key={metric} className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">
            {metric.replace(/_/g, ' ')} Anomalies ({anomalies.length})
          </h4>
          {anomalies.length === 0 ? (
            <p className="text-gray-500 text-sm">No anomalies detected</p>
          ) : (
            <div className="space-y-2">
              {anomalies.slice(0, 5).map((anomaly, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Period {anomaly.index + 1}</span>
                    <span className="text-xs text-gray-500 ml-2">Value: {anomaly.value}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      anomaly.severity === 'high' ? 'bg-red-100 text-red-800' :
                      anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-xs text-gray-500">Z: {anomaly.zScore}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderPredictions = () => (
    <div className="space-y-6">
      {Object.entries(analysisResults.predictions || {}).map(([metric, prediction]) => (
        <div key={metric} className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">
            {metric.replace(/_/g, ' ')} Predictions
          </h4>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Accuracy (R²)</span>
              <span className="text-xs text-gray-600">{prediction.accuracy}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min(prediction.accuracy * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {prediction.predictions.slice(0, 6).map((pred, index) => (
              <div key={index} className="text-center p-2 bg-blue-50 rounded">
                <div className="text-sm font-semibold text-gray-900">{pred.value}</div>
                <div className="text-xs text-gray-500">Period {pred.period}</div>
                <div className="text-xs text-gray-400">Conf: {Math.round(pred.confidence * 100)}%</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderRiskAssessment = () => (
    <div className="space-y-6">
      {analysisResults.riskAssessment && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Risk Assessment Overview</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Risk Score</span>
                <span className={`text-2xl font-bold ${
                  analysisResults.riskAssessment.riskLevel === 'low' ? 'text-green-600' :
                  analysisResults.riskAssessment.riskLevel === 'medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {analysisResults.riskAssessment.riskScore}
                </span>
              </div>
              
              <div className="space-y-3">
                {Object.entries(analysisResults.riskAssessment.riskFactors).map(([factor, level]) => (
                  <div key={factor} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {factor.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      level === 'high' ? 'bg-red-100 text-red-800' :
                      level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-3">Recommendations</h5>
              <ul className="space-y-2">
                {analysisResults.riskAssessment.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderBenchmarks = () => (
    <div className="space-y-6">
      {analysisResults.benchmarks && Object.entries(analysisResults.benchmarks).map(([metric, benchmark]) => (
        <div key={metric} className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">
            {metric.replace(/_/g, ' ')} Benchmark
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{benchmark.current}</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{benchmark.average}</div>
              <div className="text-xs text-gray-500">Industry Avg</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${
                benchmark.performance === 'excellent' ? 'text-green-600' :
                benchmark.performance === 'above_average' ? 'text-blue-600' :
                benchmark.performance === 'average' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {benchmark.ratio}x
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {benchmark.performance.replace('_', ' ')}
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className={`text-xs px-2 py-1 rounded-full ${
              benchmark.improvement > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {benchmark.improvement > 0 ? '+' : ''}{benchmark.improvement}% vs Industry
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'statistics': return renderStatistics()
      case 'trends': return renderTrends()
      case 'anomalies': return renderAnomalies()
      case 'predictions': return renderPredictions()
      case 'risk': return renderRiskAssessment()
      case 'benchmarks': return renderBenchmarks()
      default: return renderOverview()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </motion.div>
  )
}
