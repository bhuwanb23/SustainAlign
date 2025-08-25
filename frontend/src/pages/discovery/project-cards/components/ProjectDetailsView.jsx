import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectDetailsView({ project, onBack, onEdit }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!project) return null

  // Define the tabs array
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-home' },
    { id: 'thematic', label: 'Thematic Info', icon: 'fas fa-bullseye' },
    { id: 'financials', label: 'Financials', icon: 'fas fa-coins' },
    { id: 'timeline', label: 'Timeline', icon: 'fas fa-calendar' },
    { id: 'impact', label: 'Impact', icon: 'fas fa-chart-line' },
    { id: 'ngo', label: 'NGO Details', icon: 'fas fa-building' },
    { id: 'media', label: 'Media & Files', icon: 'fas fa-file-alt' }
  ]

  // Helper function to get SDG color
  const getSdgColor = (index) => {
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500',
      'bg-cyan-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-emerald-500', 'bg-lime-500', 'bg-rose-500', 'bg-sky-500', 'bg-violet-500',
      'bg-amber-500', 'bg-fuchsia-500'
    ]
    return colors[index % colors.length] || 'bg-gray-500'
  }

  // Helper function to get SDG icon
  const getSdgIcon = (sdgName) => {
    const iconMap = {
      'No Poverty': '🏠',
      'Zero Hunger': '🍽️',
      'Good Health': '🏥',
      'Quality Education': '🎓',
      'Gender Equality': '⚖️',
      'Clean Water': '💧',
      'Affordable Energy': '⚡',
      'Decent Work': '💼',
      'Industry & Innovation': '🏭',
      'Reduced Inequalities': '🤝',
      'Sustainable Cities': '🏙️',
      'Responsible Consumption': '🔄',
      'Climate Action': '🌍',
      'Life Below Water': '🐠',
      'Life On Land': '🌳',
      'Peace & Justice': '⚖️',
      'Partnerships': '🤝'
    }
    return iconMap[sdgName] || '🎯'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="group px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-md transform hover:-translate-y-0.5"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
            Back to Projects
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => onEdit && onEdit(project)}
              className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-edit"></i>
              Edit Project
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5">
              <i className="fas fa-download"></i>
              Export
            </button>
          </div>
        </div>

        {/* Project Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Add a solid fallback color to ensure contrast even if gradients are purged */}
          <div className="bg-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-white text-4xl font-bold backdrop-blur-sm border border-white/30 shadow-lg">
                {project.projectTitle?.charAt(0) || 'P'}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">{project.projectTitle || 'Project Title'}</h1>
                <div className="flex items-center gap-6 text-emerald-100">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-building text-emerald-200"></i>
                    <span className="font-medium">{project.ngoName || 'NGO not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-map-marker-alt text-emerald-200"></i>
                    <span className="font-medium">{[project.location?.city, project.location?.region, project.location?.country].filter(Boolean).join(', ') || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-calendar text-emerald-200"></i>
                    <span className="font-medium">{project.startDate ? new Date(project.startDate).getFullYear() : 'Year not set'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                  {project.totalProjectCost ? `$${(project.totalProjectCost / 1000).toFixed(1)}K` : 'Cost not set'}
                </div>
                <div className="text-emerald-100 font-medium">Total Project Cost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className={tab.icon}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Project Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-project-diagram text-emerald-600 text-lg"></i>
                    </div>
                    Project Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-file-alt text-emerald-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Short Description</div>
                        <div className="font-medium">{project.shortDescription || 'No description provided'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-building text-emerald-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Implementing NGO</div>
                        <div className="font-medium">{project.ngoName || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-map-marker-alt text-emerald-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{[project.location?.city, project.location?.region, project.location?.country].filter(Boolean).join(', ') || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-line text-blue-600 text-lg"></i>
                    </div>
                    Project Status
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-toggle-on text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-medium capitalize">{project.status || 'Draft'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-eye text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Visibility</div>
                        <div className="font-medium capitalize">{project.visibility || 'Public'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-calendar text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{project.duration || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-emerald-600 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-bullseye text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">{project.sdgGoals?.length || 0}</div>
                  <div className="text-emerald-100">SDGs Covered</div>
                </div>

                <div className="bg-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-coins text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {project.fundingRequired ? `$${(project.fundingRequired / 1000).toFixed(1)}K` : '—'}
                  </div>
                  <div className="text-blue-100">Funding Needed</div>
                </div>

                <div className="bg-purple-600 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">{project.targetBeneficiaries?.length || 0}</div>
                  <div className="text-purple-100">Target Groups</div>
                </div>

                <div className="bg-orange-600 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check-circle text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {project.csrEligibility === 'Yes' ? 'Eligible' : 'Review'}
                  </div>
                  <div className="text-orange-100">CSR Status</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'thematic' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-bullseye text-green-600 text-lg"></i>
                </div>
                Thematic Information & Focus Areas
              </h3>

              {/* SDG Goals */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Sustainable Development Goals</h4>
                  {project.sdgGoals && project.sdgGoals.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                      {project.sdgGoals.map((sdg, index) => {
                        const sdgIndex = index + 1
                        const colorClass = getSdgColor(sdgIndex - 1)
                        return (
                          <div key={sdg} className={`${colorClass} w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white shadow-lg`}>
                            <span className="text-white text-xs font-bold">{sdgIndex}</span>
                            <span className="text-white text-xs">{getSdgIcon(sdg)}</span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <i className="fas fa-bullseye text-4xl text-gray-400 mb-4"></i>
                      <p className="text-gray-600">No SDGs selected yet</p>
                    </div>
                  )}
                </div>

                {/* CSR Focus Areas */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">CSR Focus Areas</h4>
                  {project.csrFocusAreas && project.csrFocusAreas.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.csrFocusAreas.map((area, index) => (
                        <div key={area} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center font-medium">
                          {area}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No CSR focus areas specified</p>
                  )}
                </div>

                {/* Target Beneficiaries */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Target Beneficiaries</h4>
                  {project.targetBeneficiaries && project.targetBeneficiaries.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.targetBeneficiaries.map((beneficiary, index) => (
                        <div key={beneficiary} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-center font-medium">
                          {beneficiary}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No target beneficiaries specified</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-coins text-yellow-600 text-lg"></i>
                </div>
                Financial Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Overview */}
                <div className="space-y-6">
                  <div className="bg-emerald-600 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-4">Project Cost Overview</h4>
                    <div className="text-4xl font-bold mb-2">
                      {project.totalProjectCost ? `$${(project.totalProjectCost / 1000).toFixed(1)}K` : 'Not set'}
                    </div>
                    <div className="text-emerald-100">Total Project Cost</div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Funding Requirements</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-medium">${project.totalProjectCost || '0'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Funding Required:</span>
                        <span className="font-medium">${project.fundingRequired || '0'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{project.currency || 'USD'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Financial Details */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">CSR Eligibility</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">CSR Eligible:</span>
                        <span className={`font-medium ${project.csrEligibility === 'Yes' ? 'text-green-600' : 'text-orange-600'}`}>
                          {project.csrEligibility || 'Not specified'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Contribution Type:</span>
                        <span className="font-medium">{project.preferredContributionType || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar text-blue-600 text-lg"></i>
                </div>
                Timeline & Milestones
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline */}
                <div className="space-y-6">
                  <div className="bg-blue-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-4">Project Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">Start Date:</span>
                        <span className="font-medium">{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">End Date:</span>
                        <span className="font-medium">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">Duration:</span>
                        <span className="font-medium">{project.duration || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Milestones</h4>
                    {project.milestones ? (
                      <div className="space-y-3">
                        {project.milestones.split('\n').map((milestone, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No milestones specified</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-purple-600 text-lg"></i>
                </div>
                Impact Metrics & Outcomes
              </h3>

              <div className="space-y-6">
                {/* Expected Outcomes */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-bullseye text-white text-sm"></i>
                    </div>
                    Expected Outcomes
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{project.expectedOutcomes || 'No expected outcomes specified'}</p>
                </div>

                {/* KPIs */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-bar text-white text-sm"></i>
                    </div>
                    Key Performance Indicators (KPIs)
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{project.kpis || 'No KPIs specified'}</p>
                </div>

                {/* Past Impact */}
                {project.pastImpact && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-history text-white text-sm"></i>
                      </div>
                      Past Impact (if recurring project)
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{project.pastImpact}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ngo' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-building text-red-600 text-lg"></i>
                </div>
                NGO Credibility & Details
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* NGO Information */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">NGO Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Registration Number:</span>
                        <span className="font-medium">{project.registrationNumber || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">80G Status:</span>
                        <span className="font-medium">{project.g80Status || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">FCRA Status:</span>
                        <span className="font-medium">{project.fcraStatus || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Past Projects:</span>
                        <span className="font-medium">{project.pastProjectsCompleted || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating & Verification */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating & Verification</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">NGO Rating:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{project.ngoRating || 'Not rated'}</span>
                          {project.ngoRating && (
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < project.ngoRating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Verification Badge:</span>
                        <span className={`font-medium ${project.ngoVerificationBadge === 'Verified' ? 'text-green-600' : 'text-orange-600'}`}>
                          {project.ngoVerificationBadge || 'Not verified'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-alt text-indigo-600 text-lg"></i>
                </div>
                Media & Supporting Files
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Images */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-images text-green-600"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Project Images</h4>
                  </div>
                  <div className="space-y-2">
                    {project.projectImages && project.projectImages.length > 0 ? (
                      project.projectImages.map((image, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded-lg">
                          <i className="fas fa-image text-green-500"></i>
                          <span>{image.name || `Image ${index + 1}`}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No project images uploaded</p>
                    )}
                  </div>
                </div>

                {/* Documents & Links */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-pdf text-blue-600"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Documents & Links</h4>
                  </div>
                  <div className="space-y-3">
                    {project.proposalDocument && (
                      <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                        <i className="fas fa-file-pdf text-blue-500"></i>
                        <span>Proposal Document</span>
                      </div>
                    )}
                    {project.videoLink && (
                      <div className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                        <i className="fas fa-video text-purple-500"></i>
                        <a href={project.videoLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                          Pitch Video
                        </a>
                      </div>
                    )}
                    {!project.proposalDocument && !project.videoLink && (
                      <p className="text-gray-500 text-sm">No documents or links provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-sm"></i>
                  </div>
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-envelope text-teal-500 w-5"></i>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{project.contactEmail || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-globe text-teal-500 w-5"></i>
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <div className="font-medium">
                        {project.website ? (
                          <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                            {project.website}
                          </a>
                        ) : (
                          'Not specified'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
