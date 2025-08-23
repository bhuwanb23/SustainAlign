import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

export default function ProjectAddForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    projectName: '',
    organization: '',
    description: '',
    impactArea: '',
    location: '',
    budget: '',
    timeline: '',
    sdgs: [],
    contactEmail: '',
    website: '',
    images: []
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSdgToggle = (sdg) => {
    setFormData(prev => ({
      ...prev,
      sdgs: prev.sdgs.includes(sdg)
        ? prev.sdgs.filter(s => s !== sdg)
        : [...prev.sdgs, sdg]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const sdgOptions = [
    { id: 1, name: 'No Poverty', color: 'bg-red-500' },
    { id: 2, name: 'Zero Hunger', color: 'bg-orange-500' },
    { id: 3, name: 'Good Health', color: 'bg-green-500' },
    { id: 4, name: 'Quality Education', color: 'bg-blue-500' },
    { id: 5, name: 'Gender Equality', color: 'bg-pink-500' },
    { id: 6, name: 'Clean Water', color: 'bg-cyan-500' },
    { id: 7, name: 'Clean Energy', color: 'bg-yellow-500' },
    { id: 8, name: 'Decent Work', color: 'bg-purple-500' },
    { id: 13, name: 'Climate Action', color: 'bg-emerald-500' },
    { id: 15, name: 'Life on Land', color: 'bg-teal-500' }
  ]

  const impactAreas = [
    'Education', 'Healthcare', 'Environment', 'Poverty Alleviation',
    'Women Empowerment', 'Clean Energy', 'Water & Sanitation', 'Agriculture'
  ]

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter project name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization *
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Your organization name"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Describe your project and its impact..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impact Area *
          </label>
          <select
            name="impactArea"
            value={formData.impactArea}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          >
            <option value="">Select impact area</option>
            {impactAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="City, State, Country"
            required
          />
        </div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget (USD) *
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter budget amount"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline *
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          >
            <option value="">Select timeline</option>
            <option value="1-6 months">1-6 months</option>
            <option value="6-12 months">6-12 months</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2+ years">2+ years</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Sustainable Development Goals (SDGs) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {sdgOptions.map(sdg => (
              <motion.button
                key={sdg.id}
                type="button"
                onClick={() => handleSdgToggle(sdg.name)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.sdgs.includes(sdg.name)
                    ? `${sdg.color} border-${sdg.color} text-white`
                    : 'border-gray-300 bg-white hover:border-emerald-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-xs font-medium">{sdg.id}</div>
                <div className="text-xs">{sdg.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="https://your-website.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>Click to upload or drag and drop</p>
              <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
          >
            Previous
          </motion.button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Project'
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  )
}
