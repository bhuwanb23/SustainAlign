export default function ReportPreview({ isGenerating, lastUpdated, currentJob, reportJobs, reportContent, reportType, period }) {
  return (
    <section className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>⏱️</span>
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
      <div className="p-6 h-[600px] overflow-y-auto">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">⏳</div>
              <p className="text-gray-600">Generating comprehensive report...</p>
              {currentJob && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">Job ID: {currentJob.id}</p>
                  <p className="text-sm text-blue-600">Status: {currentJob.status}</p>
                  <p className="text-sm text-blue-600">Type: {currentJob.reportType}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Job Status */}
            {currentJob && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Latest Report Job</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-600">Job ID:</span> {currentJob.id}
                  </div>
                  <div>
                    <span className="text-green-600">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      currentJob.status === 'completed' ? 'bg-green-100 text-green-800' :
                      currentJob.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      currentJob.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currentJob.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-600">Type:</span> {currentJob.reportType}
                  </div>
                  <div>
                    <span className="text-green-600">Period:</span> {currentJob.period}
                  </div>
                </div>
              </div>
            )}

            {/* Report Jobs List */}
            {reportJobs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Report Jobs</h4>
                <div className="space-y-3">
                  {reportJobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{job.reportType}</h5>
                          <p className="text-sm text-gray-600">{job.period}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.status === 'completed' ? 'bg-green-100 text-green-800' :
                            job.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                            job.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comprehensive Report Preview */}
            <div className="print-animation">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{reportType}</h1>
                    <p className="text-gray-600 mt-1">{period} Performance Summary</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Generated on</div>
                    <div className="font-medium">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-green-700 mb-4">Executive Summary</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700">{reportContent.executiveSummary}</p>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Key Performance Indicators</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{reportContent.keyMetrics.totalProjects || 0}</div>
                    <div className="text-sm text-gray-600">Total Projects</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">₹{reportContent.keyMetrics.totalBudget || 0}M</div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{reportContent.keyMetrics.completionRate || 0}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">{reportContent.keyMetrics.environmentalImpact || 0}</div>
                    <div className="text-sm text-gray-600">Impact Score</div>
                  </div>
                </div>
              </div>

              {/* Detailed Sections */}
              {reportContent.sections && reportContent.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">{section.title}</h2>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(section.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="text-lg font-semibold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* SDG Alignment */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">SDG Alignment</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Goal 7: Clean Energy</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Goal 13: Climate Action</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Goal 12: Responsible Consumption</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Goal 17: Partnerships</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-red-700 mb-4">Risk Assessment Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{reportContent.keyMetrics.averageRiskScore || 0}%</div>
                      <div className="text-sm text-red-600">Average Risk Score</div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">12</div>
                      <div className="text-sm text-yellow-600">Active Alerts</div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">96%</div>
                      <div className="text-sm text-green-600">Compliance Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Strategic Recommendations</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <span className="text-indigo-600 text-lg">💡</span>
                    <div>
                      <h4 className="font-medium text-indigo-800">Enhance Carbon Reduction Initiatives</h4>
                      <p className="text-sm text-indigo-700">Focus on renewable energy adoption and energy efficiency improvements to achieve carbon neutrality targets.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <span className="text-indigo-600 text-lg">🤝</span>
                    <div>
                      <h4 className="font-medium text-indigo-800">Strengthen Stakeholder Engagement</h4>
                      <p className="text-sm text-indigo-700">Increase community outreach programs and enhance transparency in sustainability reporting.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <span className="text-indigo-600 text-lg">📊</span>
                    <div>
                      <h4 className="font-medium text-indigo-800">Implement Advanced Analytics</h4>
                      <p className="text-sm text-indigo-700">Deploy AI-powered monitoring systems for real-time impact assessment and predictive analytics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


