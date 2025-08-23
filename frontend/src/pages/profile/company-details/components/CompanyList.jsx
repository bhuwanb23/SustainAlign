import { useState } from 'react'

export default function CompanyList({ onAddNew, companies = [], isShowcaseMode = false, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')

  // Debug logging
  console.log('CompanyList rendering with:', { companies, onAddNew, isShowcaseMode })

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

  // Get company icon and color based on industry
  const getCompanyIcon = (industry) => {
    const icons = {
      'Technology': 'fas fa-rocket',
      'Finance': 'fas fa-chart-line',
      'Healthcare': 'fas fa-heart-pulse',
      'Energy': 'fas fa-leaf',
      'Education': 'fas fa-graduation-cap',
      'Cloud': 'fas fa-cloud'
    }
    return icons[industry] || 'fas fa-building'
  }

  const getCompanyGradient = (industry) => {
    const gradients = {
      'Technology': 'bg-gradient-to-br from-emerald-500 to-teal-600',
      'Finance': 'bg-gradient-to-br from-blue-500 to-purple-600',
      'Healthcare': 'bg-gradient-to-br from-red-500 to-pink-500',
      'Energy': 'bg-gradient-to-br from-green-500 to-teal-500',
      'Education': 'bg-gradient-to-br from-yellow-500 to-orange-500',
      'Cloud': 'bg-gradient-to-br from-indigo-500 to-blue-600'
    }
    return gradients[industry] || 'bg-gradient-to-br from-emerald-500 to-teal-600'
  }

  const getCompanyTagColor = (industry) => {
    const colors = {
      'Technology': 'bg-emerald-100 text-emerald-600',
      'Finance': 'bg-blue-100 text-blue-600',
      'Healthcare': 'bg-red-100 text-red-600',
      'Energy': 'bg-green-100 text-green-600',
      'Education': 'bg-yellow-100 text-yellow-600',
      'Cloud': 'bg-indigo-100 text-indigo-600'
    }
    return colors[industry] || 'bg-emerald-100 text-emerald-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-purple-800 shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float drop-shadow-lg">
              Discover Amazing
              <span className="block text-purple-200 drop-shadow-lg">Companies</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto font-medium drop-shadow-md">
              Explore innovative businesses that are shaping the future with cutting-edge solutions
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Search Section */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-lg shadow-lg"
              />
              <i className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl fas fa-search"></i>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">All</button>
              {industries.slice(0, 3).map(industry => (
                <button
                  key={industry}
                  onClick={() => setFilterIndustry(filterIndustry === industry ? '' : industry)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    filterIndustry === industry 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-emerald-400 hover:text-white'
                  }`}
                >
                  {industry}
                </button>
              ))}
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
                ? (isShowcaseMode 
                    ? "No company profiles available for showcase. Add companies through the form to see them here."
                    : "Get started by adding your first company profile to begin building your CSR/ESG strategy."
                  )
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {companies.length === 0 && !isShowcaseMode && (
              <button
                onClick={onAddNew}
                className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add Your First Company
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company, index) => (
              <div key={company.id || index} className="card-hover bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Company Card Header */}
                <div className={`relative h-48 ${getCompanyGradient(company.industry)}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {company.logoFile ? (
                      <img 
                        src={URL.createObjectURL(company.logoFile)} 
                        alt={`${company.companyName} logo`}
                        className="w-24 h-24 object-contain rounded-xl shadow-lg"
                      />
                    ) : (
                      <i className={`text-6xl text-white animate-bounce ${getCompanyIcon(company.industry)}`}></i>
                    )}
                  </div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-emerald-600 font-bold text-sm">
                      Featured
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-blue-600 font-bold text-sm">
                      New
                    </div>
                  )}
                </div>
                
                {/* Company Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {company.companyName || 'Unnamed Company'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {company.industry === 'Technology' && 'Revolutionary AI-powered software solutions for modern businesses'}
                    {company.industry === 'Finance' && 'Next-generation financial management and investment platforms'}
                    {company.industry === 'Healthcare' && 'Advanced healthcare solutions improving patient outcomes worldwide'}
                    {company.industry === 'Energy' && 'Sustainable energy solutions for a greener tomorrow'}
                    {company.industry === 'Education' && 'Transforming education through innovative learning technologies'}
                    {company.industry === 'Cloud' && 'Enterprise cloud solutions and data management services'}
                    {!['Technology', 'Finance', 'Healthcare', 'Energy', 'Education', 'Cloud'].includes(company.industry) && 
                      'Innovative solutions and cutting-edge technology for modern businesses'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${getCompanyTagColor(company.industry)} px-3 py-1 rounded-full text-sm font-medium`}>
                      {company.industry || 'Technology'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <i className="text-yellow-400 fas fa-star"></i>
                      <span className="text-gray-700 font-medium">4.{Math.floor(Math.random() * 5) + 5}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onViewDetails && onViewDetails(company)}
                    className="w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-16">
            <button className="bg-emerald-500 text-white px-12 py-4 rounded-2xl text-lg font-medium hover:bg-emerald-600 transition-colors shadow-lg">
              Load More Companies
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <i className="text-white text-xl fas fa-building"></i>
              </div>
              <span className="text-2xl font-bold">CompanyHub</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Connecting businesses and opportunities through innovative company discovery
            </p>
            <div className="flex justify-center space-x-6">
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer">
                <i className="text-2xl fab fa-twitter"></i>
              </span>
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer">
                <i className="text-2xl fab fa-linkedin"></i>
              </span>
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer">
                <i className="text-2xl fab fa-github"></i>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
