import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      'Technology': '🚀',
      'Finance': '📈',
      'Healthcare': '🏥',
      'Energy': '⚡',
      'Education': '🎓',
      'Cloud': '☁️',
      'Renewable Energy': '🌱'
    }
    return icons[industry] || '🏢'
  }

  const getCompanyGradient = (industry) => {
    const gradients = {
      'Technology': 'bg-gradient-to-br from-emerald-500 to-teal-600',
      'Finance': 'bg-gradient-to-br from-blue-500 to-purple-600',
      'Healthcare': 'bg-gradient-to-br from-red-500 to-pink-500',
      'Energy': 'bg-gradient-to-br from-green-500 to-teal-500',
      'Education': 'bg-gradient-to-br from-yellow-500 to-orange-500',
      'Cloud': 'bg-gradient-to-br from-indigo-500 to-blue-600',
      'Renewable Energy': 'bg-gradient-to-br from-green-400 to-emerald-600'
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
      'Cloud': 'bg-indigo-100 text-indigo-600',
      'Renewable Energy': 'bg-green-100 text-green-600'
    }
    return colors[industry] || 'bg-emerald-100 text-emerald-600'
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <motion.header 
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-12">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Amazing
              <span className="block text-purple-200 drop-shadow-lg">Companies</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto font-medium drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore innovative businesses that are shaping the future with cutting-edge solutions
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                className="w-3 h-3 bg-white rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-3 h-3 bg-white rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.div 
                className="w-3 h-3 bg-white rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Enhanced Search Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input 
                type="text" 
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none text-lg shadow-lg bg-white/90 backdrop-blur-sm"
              />
              <i className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl fas fa-search"></i>
            </motion.div>
            <motion.div 
              className="flex justify-center mt-6 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button 
                className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              {industries.slice(0, 3).map((industry, index) => (
                <motion.button
                  key={industry}
                  onClick={() => setFilterIndustry(filterIndustry === industry ? '' : industry)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    filterIndustry === industry 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 text-slate-700 hover:bg-emerald-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  {industry}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Company Grid */}
        <AnimatePresence mode="wait">
          {filteredCompanies.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-3xl">🏢</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">No companies found</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                {companies.length === 0 
                  ? (isShowcaseMode 
                      ? "No company profiles available for showcase. Add companies through the form to see them here."
                      : "Get started by adding your first company profile to begin building your CSR/ESG strategy."
                    )
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {companies.length === 0 && !isShowcaseMode && (
                <motion.button
                  onClick={onAddNew}
                  className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Your First Company
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id || index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30 hover:shadow-3xl transition-all duration-300"
                >
                  {/* Company Card Header */}
                  <div className={`relative h-48 ${getCompanyGradient(company.industry)}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {company.logoFile ? (
                        <motion.img 
                          src={URL.createObjectURL(company.logoFile)} 
                          alt={`${company.companyName} logo`}
                          className="w-24 h-24 object-contain rounded-xl shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <motion.span 
                          className="text-6xl"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {getCompanyIcon(company.industry)}
                        </motion.span>
                      )}
                    </div>
                    {index === 0 && (
                      <motion.div 
                        className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-emerald-600 font-bold text-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        Featured
                      </motion.div>
                    )}
                    {index === 1 && (
                      <motion.div 
                        className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-blue-600 font-bold text-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        New
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Company Card Content */}
                  <div className="p-6">
                    <motion.h3 
                      className="text-2xl font-bold text-slate-800 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {company.companyName || 'Unnamed Company'}
                    </motion.h3>
                    <motion.p 
                      className="text-slate-600 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {company.industry === 'Technology' && 'Revolutionary AI-powered software solutions for modern businesses'}
                      {company.industry === 'Finance' && 'Next-generation financial management and investment platforms'}
                      {company.industry === 'Healthcare' && 'Advanced healthcare solutions improving patient outcomes worldwide'}
                      {company.industry === 'Energy' && 'Sustainable energy solutions for a greener tomorrow'}
                      {company.industry === 'Education' && 'Transforming education through innovative learning technologies'}
                      {company.industry === 'Cloud' && 'Enterprise cloud solutions and data management services'}
                      {company.industry === 'Renewable Energy' && 'Clean energy solutions for a sustainable future'}
                      {!['Technology', 'Finance', 'Healthcare', 'Energy', 'Education', 'Cloud', 'Renewable Energy'].includes(company.industry) && 
                        'Innovative solutions and cutting-edge technology for modern businesses'}
                    </motion.p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <motion.span 
                        className={`${getCompanyTagColor(company.industry)} px-3 py-1 rounded-full text-sm font-medium`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {company.industry || 'Technology'}
                      </motion.span>
                      <motion.div 
                        className="flex items-center space-x-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <i className="text-yellow-400 fas fa-star"></i>
                        <span className="text-slate-700 font-medium">4.{Math.floor(Math.random() * 5) + 5}</span>
                      </motion.div>
                    </div>
                    
                    <motion.button
                      onClick={() => onViewDetails && onViewDetails(company)}
                      className="w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {filteredCompanies.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button 
              className="bg-emerald-500 text-white px-12 py-4 rounded-2xl text-lg font-medium hover:bg-emerald-600 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Companies
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-slate-900 text-white py-16 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div 
                className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white text-xl">🏢</span>
              </motion.div>
              <span className="text-2xl font-bold">CompanyHub</span>
            </motion.div>
            <motion.p 
              className="text-slate-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Connecting businesses and opportunities through innovative company discovery
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.span 
                className="text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <i className="fab fa-twitter"></i>
              </motion.span>
              <motion.span 
                className="text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.span>
              <motion.span 
                className="text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer text-2xl"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <i className="fab fa-github"></i>
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
