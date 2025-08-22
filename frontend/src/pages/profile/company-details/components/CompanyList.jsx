import { useState } from 'react'

export default function CompanyList({ onAddNew, companies = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')

  // Debug logging
  console.log('CompanyList rendering with:', { companies, onAddNew })

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.hqCity?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = !filterIndustry || company.industry === filterIndustry
    return matchesSearch && matchesIndustry
  })

  const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))]

  // Fallback if component fails to render properly
  if (!onAddNew) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Component Error</h1>
        <p className="text-gray-600">CompanyList component is missing required props</p>
      </div>
    )
  }

  return (
    <div className="sa-company-list space-y-8 text-gray-900">
      {/* Hero Header */}
      <div className="text-center py-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Company Profiles
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Manage your CSR/ESG company profiles and build sustainable strategies
          </p>
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-emerald-400"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-plus text-sm"></i>
            </div>
            Add New Company
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Search Companies</label>
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by company name, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="lg:w-56">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Industry</label>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 text-gray-700"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Company Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-building text-3xl text-emerald-500"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No companies found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {companies.length === 0 
              ? "Get started by adding your first company profile to begin building your CSR/ESG strategy."
              : "Try adjusting your search or filter criteria."
            }
          </p>
          {companies.length === 0 && (
            <button
              onClick={onAddNew}
              className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add Your First Company
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <div key={company.id || index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {company.companyName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {company.companyName || 'Unnamed Company'}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {company.industry || 'Industry not specified'}
                    </p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg">
                  <i className="fas fa-edit"></i>
                </button>
              </div>

              {/* Company Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt w-4 text-emerald-500"></i>
                  <span>{[company.hqCity, company.hqState, company.hqCountry].filter(Boolean).join(', ') || 'Location not specified'}</span>
                </div>
                {company.csrContactName && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fas fa-user w-4 text-emerald-500"></i>
                    <span>{company.csrContactName} ({company.csrContactRole || 'CSR Contact'})</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="fas fa-coins w-4 text-emerald-500"></i>
                  <span className="font-semibold text-emerald-600">
                    {company.budget ? `${company.currency || '₹'}${company.budget.toLocaleString()}` : 'Budget not set'}
                  </span>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Profile Completion</span>
                  <span className="font-medium text-gray-700">
                    {company.companyName ? '100%' : '0%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: company.companyName ? '100%' : '0%' }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">SDGs Selected</span>
                  <span className="font-medium text-gray-700">
                    {company.prioritySdgs?.length || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((company.prioritySdgs?.length || 0) * 6.25, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 py-2 px-4 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors duration-200 text-sm">
                  <i className="fas fa-eye mr-2"></i>
                  View Details
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm">
                  <i className="fas fa-chart-line mr-2"></i>
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Dashboard */}
      {companies.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 border-2 border-emerald-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Overview Statistics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-emerald-400">
                <i className="fas fa-building text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">{companies.length}</div>
              <div className="text-sm text-gray-600 font-medium">Total Companies</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-blue-400">
                <i className="fas fa-coins text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {companies.filter(c => c.budget).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Budget Set</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-purple-400">
                <i className="fas fa-globe text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {companies.filter(c => c.prioritySdgs?.length > 0).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">SDGs Configured</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-orange-400">
                <i className="fas fa-file-alt text-2xl text-white"></i>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {companies.filter(c => c.policyFiles?.length > 0 || c.reportFiles?.length > 0).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Documents Uploaded</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
