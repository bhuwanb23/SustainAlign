import { useState } from 'react'

export default function CompanyList({ onAddNew, companies = [], isShowcaseMode = false, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('')

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.hqCity?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = !filterIndustry || company.industry === filterIndustry
    return matchesSearch && matchesIndustry
  })

  // Sample companies for showcase mode (matching the beautiful design)
  const sampleCompanies = [
    {
      id: 1,
      companyName: 'TechNova Solutions',
      industry: 'Technology',
      description: 'Revolutionary AI-powered software solutions for modern businesses',
      rating: '4.9',
      featured: true,
      icon: '🚀',
      gradient: 'from-emerald-500 to-teal-600',
      tagColor: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 2,
      companyName: 'FinanceFlow Corp',
      industry: 'Finance',
      description: 'Next-generation financial management and investment platforms',
      rating: '4.7',
      new: true,
      icon: '📈',
      gradient: 'from-blue-500 to-purple-600',
      tagColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      companyName: 'HealthTech Innovations',
      industry: 'Healthcare',
      description: 'Advanced healthcare solutions improving patient outcomes worldwide',
      rating: '4.8',
      icon: '🏥',
      gradient: 'from-red-500 to-pink-500',
      tagColor: 'bg-red-100 text-red-600'
    },
    {
      id: 4,
      companyName: 'EcoSmart Energy',
      industry: 'Energy',
      description: 'Sustainable energy solutions for a greener tomorrow',
      rating: '4.6',
      icon: '🌱',
      gradient: 'from-green-500 to-teal-500',
      tagColor: 'bg-green-100 text-green-600'
    },
    {
      id: 5,
      companyName: 'EduFuture Platform',
      industry: 'Education',
      description: 'Transforming education through innovative learning technologies',
      rating: '4.9',
      icon: '🎓',
      gradient: 'from-yellow-500 to-orange-500',
      tagColor: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 6,
      companyName: 'CloudSync Systems',
      industry: 'Cloud',
      description: 'Enterprise cloud solutions and data management services',
      rating: '4.5',
      icon: '☁️',
      gradient: 'from-indigo-500 to-blue-600',
      tagColor: 'bg-indigo-100 text-indigo-600'
    }
  ]

  const displayCompanies = isShowcaseMode ? sampleCompanies : filteredCompanies

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-6">
          {/* Hero Content */}
          <div className="text-center text-black">
            <h1 className="text-5xl md:text-7xl text-black font-bold mb-6 ">
              Discover Amazing
              <span className="block text-black">Companies</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 text-black max-w-3xl mx-auto">
              Explore innovative businesses that are shaping the future with cutting-edge solutions
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>

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
                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-lg shadow-lg bg-white"
              />
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => setFilterIndustry('')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  !filterIndustry 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-emerald-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterIndustry('Technology')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filterIndustry === 'Technology' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-emerald-400 hover:text-white'
                }`}
              >
                Tech
              </button>
              <button 
                onClick={() => setFilterIndustry('Finance')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filterIndustry === 'Finance' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-emerald-400 hover:text-white'
                }`}
              >
                Finance
              </button>
              <button 
                onClick={() => setFilterIndustry('Healthcare')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filterIndustry === 'Healthcare' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-emerald-400 hover:text-white'
                }`}
              >
                Healthcare
              </button>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCompanies.map((company, index) => (
            <div 
              key={company.id || index} 
              className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200"
            >
              {/* Company Card Header */}
              <div className={`relative h-48 bg-gradient-to-br ${company.gradient || 'from-emerald-500 to-teal-600'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {company.logoFile ? (
                    <img 
                      src={URL.createObjectURL(company.logoFile)} 
                      alt={`${company.companyName} logo`}
                      className="w-24 h-24 object-contain rounded-xl shadow-lg"
                    />
                  ) : (
                    <span className="text-6xl text-white animate-pulse">
                      {company.icon || '🏢'}
                    </span>
                  )}
                </div>
                {company.featured && (
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-emerald-600 font-bold text-sm shadow-lg">
                    Featured
                  </div>
                )}
                {company.new && (
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-blue-600 font-bold text-sm shadow-lg">
                    New
                  </div>
                )}
              </div>
              
              {/* Company Card Content */}
              <div className="p-6 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {company.companyName || 'Unnamed Company'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {company.description || 'Innovative solutions and cutting-edge technology for modern businesses'}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`${company.tagColor || 'bg-emerald-100 text-emerald-600'} px-3 py-1 rounded-full text-sm font-medium border border-gray-200`}>
                    {company.industry || 'Technology'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-700 font-medium">{company.rating || '4.5'}</span>
                  </div>
                </div>
                <button
                  onClick={() => onViewDetails && onViewDetails(company)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-emerald-600 text-white px-12 py-4 rounded-2xl text-lg font-medium hover:bg-emerald-700 transition-colors shadow-xl hover:shadow-2xl">
            Load More Companies
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🏢</span>
              </div>
              <span className="text-2xl font-bold">CompanyHub</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Connecting businesses and opportunities through innovative company discovery
            </p>
            <div className="flex justify-center space-x-6">
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl">
                <span className="text-2xl">🐦</span>
              </span>
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl">
                <span className="text-2xl">💼</span>
              </span>
              <span className="text-gray-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl">
                <span className="text-2xl">🐙</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
