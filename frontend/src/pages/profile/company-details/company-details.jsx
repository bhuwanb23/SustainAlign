import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCompanyWizard from './hooks/useCompanyWizard.js'
import Stepper from './components/Stepper.jsx'
import CompanyList from './components/CompanyList.jsx'
import CompanyDetailsView from './components/CompanyDetailsView.jsx'
import Step1Basic from './components/steps/Step1Basic.jsx'
import Step3Budget from './components/steps/Step3Budget.jsx'
import Step4Focus from './components/steps/Step4Focus.jsx'
import Step7AiInputs from './components/steps/Step7AiInputs.jsx'
import WizardActions from './components/WizardActions.jsx'
import AllocationPreview from './components/AllocationPreview.jsx'

export default function CompanyDetailsPage() {
  const location = useLocation()
  const isShowcaseMode = location.pathname === '/profile/company-showcase'
  const [showForm, setShowForm] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      industry: 'Technology',
      hqCity: 'Bangalore',
      hqState: 'Karnataka',
      hqCountry: 'India',
      csrContactName: 'Priya Sharma',
      csrContactRole: 'CSR Manager',
      budget: 5000000,
      currency: 'INR',
      prioritySdgs: ['Quality Education', 'Climate Action', 'Industry & Innovation'],
      policyFiles: ['policy1.pdf'],
      reportFiles: ['report2023.pdf', 'report2022.pdf']
    },
    {
      id: 2,
      companyName: 'GreenEnergy Ltd',
      industry: 'Renewable Energy',
      hqCity: 'Mumbai',
      hqState: 'Maharashtra',
      hqCountry: 'India',
      csrContactName: 'Rajesh Patel',
      csrContactRole: 'Sustainability Director',
      budget: 8000000,
      currency: 'INR',
      prioritySdgs: ['Affordable Energy', 'Climate Action', 'Life On Land'],
      policyFiles: ['green-policy.pdf'],
      reportFiles: ['sustainability-report.pdf']
    }
  ])
  const w = useCompanyWizard()

  // Auto-show form when in form mode (not showcase mode)
  useEffect(() => {
    if (!isShowcaseMode) {
      setShowForm(true)
      w.reset() // Reset wizard state for new company
    }
  }, [isShowcaseMode, w])

  const handleAddNew = () => {
    console.log('handleAddNew called')
    setShowForm(true)
    w.reset() // Reset wizard state for new company
  }

  const handleBackToList = () => {
    console.log('handleBackToList called')
    setShowForm(false)
    setSelectedCompany(null)
  }

  const handleViewDetails = (company) => {
    console.log('handleViewDetails called with:', company)
    setSelectedCompany(company)
  }

  const finish = () => {
    const payload = w.getPayload()
    console.log('Company Profile Payload', payload)
    
    // Add the new company to the list
    const newCompany = {
      id: Date.now(), // Simple ID generation
      ...payload
    }
    setCompanies(prev => [...prev, newCompany])
    
    alert('Company profile saved!')
    setShowForm(false)
  }

  // Show selected company details
  if (selectedCompany) {
    return (
      <CompanyDetailsView 
        company={selectedCompany} 
        onBack={() => setSelectedCompany(null)} 
        onEdit={(company) => {
          setSelectedCompany(null)
          setShowForm(true)
        }}
      />
    )
  }

  // If in showcase mode, always show the company list
  if (isShowcaseMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-16 left-8 w-3 h-3 bg-purple-400/40 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 right-16 w-4 h-4 bg-indigo-400/50 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, -20, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-24 left-1/3 w-2 h-2 bg-slate-400/60 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 25, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Additional Floating Elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400/50 rounded-full"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-pink-400/40 rounded-full"
            animate={{
              y: [0, -35, 0],
              x: [0, -25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Rotating Geometric Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-300/30 to-indigo-400/30 rotate-45 rounded-lg"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-indigo-300/40 to-purple-400/40 rotate-12 rounded-lg"
            animate={{
              rotate: [12, 372],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Subtle Wave Patterns */}
          <motion.div
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent transform -skew-y-3"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-transparent via-indigo-100/15 to-transparent transform -skew-y-6"
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          />
          
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-purple-200/40 to-indigo-300/40 rounded-full blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/3 left-8 w-12 h-12 bg-gradient-to-br from-indigo-200/30 to-purple-300/30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Animated Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, purple 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <CompanyList onAddNew={handleAddNew} companies={companies} isShowcaseMode={true} onViewDetails={handleViewDetails} />
        </div>
      </div>
    )
  }

  // Form mode - show form directly (skip company list)
  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-16 left-8 w-3 h-3 bg-green-400/40 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 right-16 w-4 h-4 bg-emerald-400/50 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, -20, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-24 left-1/3 w-2 h-2 bg-teal-400/60 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 25, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Additional Floating Elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400/50 rounded-full"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400/40 rounded-full"
            animate={{
              y: [0, -35, 0],
              x: [0, -25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Rotating Geometric Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rotate-45 rounded-lg"
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-teal-300/40 to-cyan-400/40 rotate-12 rounded-lg"
            animate={{
              rotate: [12, 372],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Subtle Wave Patterns */}
          <motion.div
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-transparent via-green-100/20 to-transparent transform -skew-y-3"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-transparent via-emerald-100/15 to-transparent transform -skew-y-6"
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          />
          
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-green-200/40 to-emerald-300/40 rounded-full blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/3 left-8 w-12 h-12 bg-gradient-to-br from-teal-200/30 to-cyan-300/30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Animated Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, green 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <Stepper step={w.step} goTo={w.goTo} mode="form" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-8">
          {/* Back to List Button */}
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={handleBackToList}
              className="group px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-white/80 rounded-xl transition-all duration-300 flex items-center gap-3 hover:shadow-lg backdrop-blur-sm"
            >
              <motion.i 
                className="fas fa-arrow-left"
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              />
              Back to Company List
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {w.step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <Step1Basic
                  companyName={w.companyName} setCompanyName={w.setCompanyName}
                  logoFile={w.logoFile} setLogoFile={w.setLogoFile}
                  registrationId={w.registrationId} setRegistrationId={w.setRegistrationId}
                  industry={w.industry} setIndustry={w.setIndustry}
                  hqCountry={w.hqCountry} setHqCountry={w.setHqCountry}
                  hqState={w.hqState} setHqState={w.setHqState}
                  hqCity={w.hqCity} setHqCity={w.setHqCity}
                  branches={w.branches} setBranches={w.setBranches}
                  csrContactName={w.csrContactName} setCsrContactName={w.setCsrContactName}
                  csrContactRole={w.csrContactRole} setCsrContactRole={w.setCsrContactRole}
                  csrEmail={w.csrEmail} setCsrEmail={w.setCsrEmail}
                  csrPhone={w.csrPhone} setCsrPhone={w.setCsrPhone}
                  website={w.website} setWebsite={w.setWebsite}
                  right={<div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"><div className="text-sm text-slate-600 mb-3">Preview</div><div className="space-y-2 text-slate-800"><div className="font-semibold">{w.companyName || 'Company Name'}</div><div className="text-sm">{w.industry || 'Industry'}</div><div className="text-xs text-slate-500">HQ: {[w.hqCity,w.hqState,w.hqCountry].filter(Boolean).join(', ') || '—'}</div><div className="text-xs text-slate-600">Contact: {w.csrContactName || '—'} ({w.csrContactRole || '—'})</div></div></div>}
                />
              </motion.div>
            )}
            {w.step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <Step3Budget
                  budget={w.budget} setBudget={w.setBudget}
                  currency={w.currency} setCurrency={w.setCurrency}
                  splits={w.splits} setSplits={w.setSplits}
                  projectSize={w.projectSize} setProjectSize={w.setProjectSize}
                  climatePercent={w.climatePercent}
                  educationPercent={w.educationPercent}
                  healthcarePercent={w.healthcarePercent}
                  right={<AllocationPreview totalBudget={w.budget} climatePercent={w.climatePercent} educationPercent={w.educationPercent} healthcarePercent={w.healthcarePercent} climateAmount={w.climateAmount} educationAmount={w.educationAmount} healthcareAmount={w.healthcareAmount} />}
                />
              </motion.div>
            )}
            {w.step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <Step4Focus
                  prioritySdgs={w.prioritySdgs} setPrioritySdgs={w.setPrioritySdgs}
                  esgGoals={w.esgGoals} setEsgGoals={w.setEsgGoals}
                  themes={w.themes} setThemes={w.setThemes}
                  targetYear={w.targetYear} setTargetYear={w.setTargetYear}
                  reportingStandard={w.reportingStandard} setReportingStandard={w.setReportingStandard}
                  policyFiles={w.policyFiles} setPolicyFiles={w.setPolicyFiles}
                  reportFiles={w.reportFiles} setReportFiles={w.setReportFiles}
                  certFiles={w.certFiles} setCertFiles={w.setCertFiles}
                  spendHistory={w.spendHistory} setSpendHistory={w.setSpendHistory}
                  ngoSize={w.ngoSize} setNgoSize={w.setNgoSize}
                  partnershipModel={w.partnershipModel} setPartnershipModel={w.setPartnershipModel}
                  regions={w.regions} setRegions={w.setRegions}
                  right={<div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"><div className="text-sm text-slate-600 mb-3">Summary</div><div className="space-y-2"><div className="text-xs text-slate-600">Selected SDGs: {w.prioritySdgs.length || 0}</div><div className="text-xs text-slate-600">Files: {w.policyFiles.length + w.reportFiles.length + w.certFiles.length}</div><div className="text-xs text-slate-600">NGO: {w.ngoSize} • {w.partnershipModel}</div></div></div>}
                />
              </motion.div>
            )}
            {w.step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <Step7AiInputs
                  optimizeFor={w.optimizeFor} setOptimizeFor={w.setOptimizeFor}
                  riskAppetite={w.riskAppetite} setRiskAppetite={w.setRiskAppetite}
                  alignmentMode={w.alignmentMode} setAlignmentMode={w.setAlignmentMode}
                  roles={w.roles} setRoles={w.setRoles}
                  integrations={w.integrations} setIntegrations={w.setIntegrations}
                  right={<div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"><div className="text-sm text-slate-600 mb-3">Summary</div><div className="space-y-2"><div className="text-xs text-slate-600">AI Metrics: {w.optimizeFor.length || 0}</div><div className="text-xs text-slate-600">Risk: {w.riskAppetite}</div><div className="text-xs text-slate-600">Users: {w.roles.length}</div><div className="text-xs text-slate-600">Integrations: {w.integrations.length || 0}</div></div></div>}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <WizardActions step={w.step} back={w.back} next={w.next} canProceed={w.canProceed} onFinish={finish} />
        </div>
      </div>
    )
  }

  // Fallback - should not reach here in form mode, but just in case
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-16 left-8 w-3 h-3 bg-green-400/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-4 h-4 bg-emerald-400/50 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, -20, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 w-2 h-2 bg-teal-400/60 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 25, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400/50 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400/40 rounded-full"
          animate={{
            y: [0, -35, 0],
            x: [0, -25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Rotating Geometric Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rotate-45 rounded-lg"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-teal-300/40 to-cyan-400/40 rotate-12 rounded-lg"
          animate={{
            rotate: [12, 372],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        
        {/* Subtle Wave Patterns */}
        <motion.div
          className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-transparent via-green-100/20 to-transparent transform -skew-y-3"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-transparent via-emerald-100/15 to-transparent transform -skew-y-6"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-green-200/40 to-emerald-300/40 rounded-full blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 left-8 w-12 h-12 bg-gradient-to-br from-teal-200/30 to-cyan-300/30 rounded-full blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, green 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <CompanyList onAddNew={handleAddNew} companies={companies} isShowcaseMode={false} />
      </div>
    </div>
  )
}


