import { useState } from 'react'

export default function CompanyDetailsView({ company, onBack, onEdit }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!company) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="group px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-md transform hover:-translate-y-0.5"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
            Back to Companies
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(company)}
              className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5">
              <i className="fas fa-download"></i>
              Export
            </button>
          </div>
        </div>

        {/* Company Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-purple-700 p-8 text-white shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-white text-4xl font-bold backdrop-blur-sm border border-white/30 shadow-lg">
                {company.companyName?.charAt(0) || 'C'}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">{company.companyName || 'Company Name'}</h1>
                <div className="flex items-center gap-6 text-purple-100">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-industry text-purple-200"></i>
                    <span className="font-medium">{company.industry || 'Industry not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-map-marker-alt text-purple-200"></i>
                    <span className="font-medium">{[company.hqCity, company.hqState, company.hqCountry].filter(Boolean).join(', ') || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <i className="fas fa-globe text-purple-200"></i>
                    <span className="font-medium">{company.website || 'Website not specified'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1 text-white drop-shadow-lg">
                  {company.budget ? `${company.currency || '₹'}${(company.budget / 100000).toFixed(1)}L` : 'Budget not set'}
                </div>
                <div className="text-purple-100 font-medium">CSR Budget</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
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
              {/* Company Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-building text-emerald-600 text-lg"></i>
                    </div>
                    Company Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-id-card text-emerald-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Registration ID</div>
                        <div className="font-medium">{company.registrationId || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-map-marker-alt text-emerald-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Headquarters</div>
                        <div className="font-medium">{[company.hqCity, company.hqState, company.hqCountry].filter(Boolean).join(', ') || 'Not specified'}</div>
                      </div>
                    </div>

                    {company.branches && company.branches.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500">Branch Locations</div>
                        {company.branches.map((branch, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                            <i className="fas fa-code-branch text-blue-500"></i>
                            <span>{[branch.country, branch.state, branch.city].filter(Boolean).join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-user-tie text-blue-600 text-lg"></i>
                    </div>
                    CSR Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-user text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Contact Person</div>
                        <div className="font-medium">{company.csrContactName || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-briefcase text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Role</div>
                        <div className="font-medium">{company.csrContactRole || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-envelope text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{company.csrEmail || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <i className="fas fa-phone text-blue-500 w-5"></i>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{company.csrPhone || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-globe text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">{company.prioritySdgs?.length || 0}</div>
                  <div className="text-emerald-100">SDGs Selected</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-coins text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {company.budget ? `${company.currency || '₹'}${(company.budget / 100000).toFixed(1)}L` : '—'}
                  </div>
                  <div className="text-blue-100">CSR Budget</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-alt text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {(company.policyFiles?.length || 0) + (company.reportFiles?.length || 0) + (company.certFiles?.length || 0)}
                  </div>
                  <div className="text-purple-100">Documents</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-line text-2xl"></i>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {company.projectSize || 'Medium'}
                  </div>
                  <div className="text-orange-100">Project Size</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-bullseye text-green-600 text-lg"></i>
                </div>
                CSR/ESG Strategy & Focus Areas
              </h3>

              {/* SDG Selection */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Priority Sustainable Development Goals</h4>
                  {company.prioritySdgs && company.prioritySdgs.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                      {company.prioritySdgs.map((sdg, index) => {
                        const sdgIndex = SDG_NAMES.findIndex(name => name === sdg)
                        const colorClass = getSdgColor(sdgIndex)
                        return (
                          <div key={sdg} className={`${colorClass} w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white shadow-lg`}>
                            <span className="text-white text-xs font-bold">{sdgIndex + 1}</span>
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

                {/* ESG Goals */}
                {company.esgGoals && (
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-bullseye text-white text-sm"></i>
                      </div>
                      ESG Goals & Targets
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{company.esgGoals}</p>
                  </div>
                )}

                {/* NGO Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-hands-helping text-white text-sm"></i>
                      </div>
                      NGO Partnership Preferences
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Preferred NGO Size:</span>
                        <span className="font-medium">{company.ngoSize || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Partnership Model:</span>
                        <span className="font-medium">{company.partnershipModel || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-globe text-white text-sm"></i>
                      </div>
                      Geographic Focus
                    </h4>
                    <div className="space-y-2">
                      {company.regions && company.regions.length > 0 ? (
                        company.regions.map((region, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                            <i className="fas fa-map-marker-alt text-purple-500"></i>
                            <span>{region}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No regions specified</p>
                      )}
                    </div>
                  </div>
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
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl">
                    <h4 className="text-xl font-bold mb-4">CSR Budget Overview</h4>
                    <div className="text-4xl font-bold mb-2">
                      {company.budget ? `${company.currency || '₹'}${(company.budget / 100000).toFixed(1)}L` : 'Not set'}
                    </div>
                    <div className="text-emerald-100">Total Annual CSR Budget</div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Climate & Environment:</span>
                        <span className="font-medium">{company.splits?.environment || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${company.splits?.environment || 0}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Education:</span>
                        <span className="font-medium">{company.splits?.education || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${company.splits?.education || 0}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Healthcare:</span>
                        <span className="font-medium">{company.splits?.healthcare || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${company.splits?.healthcare || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Financial Details */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{company.currency || 'INR'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Project Size:</span>
                        <span className="font-medium">{company.projectSize || 'Medium'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Risk Appetite:</span>
                        <span className="font-medium">{company.riskAppetite || 'Medium'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Optimization</h4>
                    <div className="space-y-3">
                      {company.optimizeFor && company.optimizeFor.length > 0 ? (
                        company.optimizeFor.map((metric, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                            <i className="fas fa-chart-line text-blue-500"></i>
                            <span>{metric}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No optimization metrics set</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-alt text-indigo-600 text-lg"></i>
                </div>
                Documents & Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Policy Documents */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-contract text-green-600"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Policy Documents</h4>
                  </div>
                  <div className="space-y-2">
                    {company.policyFiles && company.policyFiles.length > 0 ? (
                      company.policyFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded-lg">
                          <i className="fas fa-file-pdf text-green-500"></i>
                          <span>{file.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No policy documents uploaded</p>
                    )}
                  </div>
                </div>

                {/* Annual Reports */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-bar text-blue-600"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Annual Reports</h4>
                  </div>
                  <div className="space-y-2">
                    {company.reportFiles && company.reportFiles.length > 0 ? (
                      company.reportFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                          <i className="fas fa-file-pdf text-blue-500"></i>
                          <span>{file.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No annual reports uploaded</p>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-certificate text-purple-600"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Certifications</h4>
                  </div>
                  <div className="space-y-2">
                    {company.certFiles && company.certFiles.length > 0 ? (
                      company.certFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-2 rounded-lg">
                          <i className="fas fa-certificate text-purple-500"></i>
                          <span>{file.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No certifications uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-pink-600 text-lg"></i>
                </div>
                Team & Access Management
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Team Members */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Team Members</h4>
                  <div className="space-y-3">
                    {company.roles && company.roles.length > 0 ? (
                      company.roles.map((role, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-user text-emerald-600"></i>
                            </div>
                            <div>
                              <div className="font-medium">{role.email || 'Email not specified'}</div>
                              <div className="text-sm text-gray-500">{role.role || 'Role not specified'}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <i className="fas fa-users text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600">No team members added yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Integrations */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">System Integrations</h4>
                  <div className="space-y-3">
                    {company.integrations && company.integrations.length > 0 ? (
                      company.integrations.map((integration, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-plug text-blue-600"></i>
                          </div>
                          <div>
                            <div className="font-medium">{integration}</div>
                            <div className="text-sm text-gray-500">Connected</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <i className="fas fa-plug text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600">No integrations configured</p>
                      </div>
                    )}
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
