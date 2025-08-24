import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { 
  allSdgGoals, 
  csrFocusAreas, 
  targetBeneficiaries, 
  contributionTypes, 
  ngoRatings 
} from '../constants/index.js'

export default function ProjectAddForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    // Basic Info
    projectTitle: '',
    shortDescription: '',
    ngoName: '',
    location: '',
    
    // Thematic Info
    sdgGoals: [],
    csrFocusAreas: [],
    targetBeneficiaries: [],
    
    // Financials
    totalProjectCost: '',
    fundingRequired: '',
    csrEligibility: '',
    preferredContributionType: '',
    
    // Timeline
    startDate: '',
    endDate: '',
    duration: '',
    milestones: '',
    
    // Impact Metrics
    expectedOutcomes: '',
    kpis: '',
    pastImpact: '',
    
    // NGO Credibility
    registrationNumber: '',
    g80Status: '',
    fcraStatus: '',
    pastProjectsCompleted: '',
    ngoRating: '',
    
    // Media & Supporting Files
    projectImages: [],
    proposalDocument: null,
    videoLink: '',
    
    // Contact Info
    contactEmail: '',
    website: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayChange = (field, value, action = 'toggle') => {
    setFormData(prev => ({
      ...prev,
      [field]: action === 'toggle' 
        ? prev[field].includes(value)
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value]
        : action === 'add'
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      [field]: file
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



  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-sm font-semibold">1</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Basic Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Enter project title"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Short Description (2-3 lines) *
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            placeholder="Brief description of your project and its impact..."
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            NGO/Implementing Partner Name *
          </label>
          <input
            type="text"
            name="ngoName"
            value={formData.ngoName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Your organization name"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Location (City/Region/Country) *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="City, State, Country"
            required
          />
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 text-sm font-semibold">2</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Thematic Information</h3>
      </div>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-4">
            SDG Goals (Select all that apply) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allSdgGoals.map((sdg, index) => (
              <motion.button
                key={sdg.id}
                type="button"
                onClick={() => handleArrayChange('sdgGoals', sdg.name)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  formData.sdgGoals.includes(sdg.name)
                    ? `${sdg.color} border-${sdg.color} text-white shadow-lg`
                    : 'border-slate-200 bg-white/80 hover:border-blue-400 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-lg mb-1">{sdg.icon}</div>
                <div className="text-xs font-medium">{sdg.id}</div>
                <div className="text-xs opacity-90">{sdg.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-4">
            CSR Focus Areas (Select all that apply) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {csrFocusAreas.map((area, index) => (
              <motion.button
                key={area}
                type="button"
                onClick={() => handleArrayChange('csrFocusAreas', area)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  formData.csrFocusAreas.includes(area)
                    ? 'bg-green-500 border-green-500 text-white shadow-lg'
                    : 'border-slate-200 bg-white/80 hover:border-green-400 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {area}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-4">
            Target Beneficiaries (Select all that apply) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {targetBeneficiaries.map((beneficiary, index) => (
              <motion.button
                key={beneficiary}
                type="button"
                onClick={() => handleArrayChange('targetBeneficiaries', beneficiary)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  formData.targetBeneficiaries.includes(beneficiary)
                    ? 'bg-purple-500 border-purple-500 text-white shadow-lg'
                    : 'border-slate-200 bg-white/80 hover:border-purple-400 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {beneficiary}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-sm font-semibold">3</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Financial Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total Project Cost (USD) *
          </label>
          <input
            type="number"
            name="totalProjectCost"
            value={formData.totalProjectCost}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Enter total cost"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Funding Required (Remaining Gap) *
          </label>
          <input
            type="number"
            name="fundingRequired"
            value={formData.fundingRequired}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Enter funding needed"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            CSR Eligibility (Schedule VII in India) *
          </label>
          <select
            name="csrEligibility"
            value={formData.csrEligibility}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            required
          >
            <option value="">Select eligibility</option>
            <option value="Yes">Yes - Eligible under Schedule VII</option>
            <option value="No">No - Not eligible under Schedule VII</option>
            <option value="Under Review">Under Review</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Preferred Contribution Type *
          </label>
          <select
            name="preferredContributionType"
            value={formData.preferredContributionType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            required
          >
            <option value="">Select contribution type</option>
            {contributionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-yellow-600 text-sm font-semibold">4</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Timeline & Milestones</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="e.g., 6 months, 1 year"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2"
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Key Milestones (Optional)
          </label>
          <textarea
            name="milestones"
            value={formData.milestones}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            placeholder="List key milestones for tracking progress..."
          />
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep5 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 text-sm font-semibold">5</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Impact Metrics</h3>
      </div>
      
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Expected Outcomes *
          </label>
          <textarea
            name="expectedOutcomes"
            value={formData.expectedOutcomes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            placeholder="e.g., '500 students enrolled in digital literacy', '1000 trees planted'"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Key Performance Indicators (KPIs) *
          </label>
          <textarea
            name="kpis"
            value={formData.kpis}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            placeholder="e.g., 'Carbon reduced by X tons', 'People reached: X', 'Trees planted: X'"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Past Impact (if recurring project)
          </label>
          <textarea
            name="pastImpact"
            value={formData.pastImpact}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            placeholder="Describe previous impact if this is a recurring project..."
          />
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep6 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-600 text-sm font-semibold">6</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">NGO Credibility</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Registration Number *
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="NGO registration number"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            80G Status
          </label>
          <select
            name="g80Status"
            value={formData.g80Status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="">Select 80G status</option>
            <option value="Registered">Registered</option>
            <option value="Not Registered">Not Registered</option>
            <option value="Under Process">Under Process</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            FCRA Status
          </label>
          <select
            name="fcraStatus"
            value={formData.fcraStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="">Select FCRA status</option>
            <option value="Registered">Registered</option>
            <option value="Not Registered">Not Registered</option>
            <option value="Under Process">Under Process</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Past Projects Completed
          </label>
          <input
            type="number"
            name="pastProjectsCompleted"
            value={formData.pastProjectsCompleted}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Number of projects"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2"
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            NGO Rating/Verification Badge
          </label>
          <select
            name="ngoRating"
            value={formData.ngoRating}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="">Select rating</option>
            {ngoRatings.map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderStep7 = () => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-teal-600 text-sm font-semibold">7</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Media & Contact Information</h3>
      </div>
      
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Project Images (Preview Card Visuals)
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="text-slate-500">
              <svg className="mx-auto h-10 w-10 mb-3 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm opacity-75">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Proposal Document (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'proposalDocument')}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Video Link (Optional Pitch Video)
          </label>
          <input
            type="url"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="https://youtube.com/watch?v=..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="your@email.com"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="https://your-website.com"
          />
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 max-w-5xl mx-auto"
    >
      {/* Enhanced Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-slate-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}
        </AnimatePresence>

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-slate-200">
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:shadow-md'
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.05, y: -1 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
          >
            Previous
          </motion.button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={nextStep}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05, y: -1 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <motion.div 
                    className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
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
