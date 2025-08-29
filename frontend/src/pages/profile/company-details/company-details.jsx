import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCompanyWizard from './hooks/useCompanyWizard.js'
import { apiPost, apiGet } from '../../../lib/api'
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
  const isNewUserMode = location.pathname === '/profile/company-details' && localStorage.getItem('newCorporateUser') === 'true'
  const [showForm, setShowForm] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companies, setCompanies] = useState([])
  const w = useCompanyWizard()

  // Check if new corporate user is trying to access showcase mode - redirect them back to form
  useEffect(() => {
    if (isShowcaseMode && localStorage.getItem('newCorporateUser') === 'true') {
      window.location.href = '/profile/company-details'
      return
    }
  }, [isShowcaseMode])

  // load companies from API on mount (dev allows unauthenticated)
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet('/api/profile/companies')
        const mapped = (data.companies || []).map(mapCompanyFromApi)
        setCompanies(mapped)
      } catch (e) {
        console.warn('Failed to load companies', e)
      }
    })()
  }, [])

  function mapCompanyFromApi(api) {
    // backend returns company.to_dict() with nested structures
    return {
      id: api.id,
      companyName: api.company_name,
      industry: api.industry,
      hqCity: api.hq_city,
      hqState: api.hq_state,
      hqCountry: api.hq_country,
      website: api.website,
      // csr contact
      csrContactName: api.csr_contact?.contact_name,
      csrContactRole: api.csr_contact?.contact_role,
      csrEmail: api.csr_contact?.email,
      csrPhone: api.csr_contact?.phone,
      // budget
      budget: api.budget?.amount,
      currency: api.budget?.currency,
      projectSize: api.budget?.project_size,
      splits: api.budget?.splits || {},
      // focus
      prioritySdgs: api.focus_area?.priority_sdgs || [],
      esgGoals: api.focus_area?.esg_goals,
      themes: api.focus_area?.themes,
      targetYear: api.focus_area?.target_year,
      reportingStandard: api.focus_area?.reporting_standard,
      // ngo prefs
      ngoSize: api.ngo_preferences?.ngo_size,
      partnershipModel: api.ngo_preferences?.partnership_model,
      regions: api.ngo_preferences?.regions || [],
      // ai config
      optimizeFor: api.ai_config?.optimize_for || [],
      riskAppetite: api.ai_config?.risk_appetite,
      alignmentMode: api.ai_config?.alignment_mode,
      integrations: api.ai_config?.integrations || [],
      // roles
      roles: (api.user_roles || []).map(r => ({ email: r.email, role: r.role })),
      // branches
      branches: (api.branches || []).map(b => ({ country: b.country, state: b.state, city: b.city })),
      // docs
      policyFiles: (api.compliance_documents || []).filter(d => d.document_type === 'policy').map(d => ({ name: d.file_name })),
      reportFiles: (api.compliance_documents || []).filter(d => d.document_type === 'report').map(d => ({ name: d.file_name })),
      certFiles: (api.compliance_documents || []).filter(d => d.document_type === 'certificate').map(d => ({ name: d.file_name })),
    }
  }

  // Auto-show form when in form mode (not showcase mode) or for new users
  useEffect(() => {
    if ((!isShowcaseMode && !showForm) || isNewUserMode) {
      setShowForm(true)
    }
  }, [isShowcaseMode, showForm, isNewUserMode])

  const handleAddNew = useCallback(() => {
    console.log('handleAddNew called')
    setShowForm(false) // First hide the form
    setSelectedCompany(null) // Clear any selected company
    // Use a small delay to ensure state updates complete before showing form again
    setTimeout(() => {
      setShowForm(true)
      w.reset() // Reset wizard state for new company
    }, 100)
  }, [w])

  const handleBackToList = useCallback(() => {
    console.log('handleBackToList called')
    setShowForm(false)
    setSelectedCompany(null)
  }, [])

  const handleViewDetails = useCallback((company) => {
    console.log('handleViewDetails called with:', company)
    setSelectedCompany(company)
  }, [])

  const finish = useCallback(async () => {
    const payload = w.getPayload()
    console.log('Company Profile Payload', payload)
    try {
      const res = await apiPost('/api/profile/companies', payload)
      console.log('Company created:', res)
      const mapped = mapCompanyFromApi(res.company)
      setCompanies(prev => [...prev, mapped])
      
      // If this is a new corporate user, redirect to dashboard
      if (isNewUserMode) {
        localStorage.removeItem('newCorporateUser')
        
        // Show success message before redirect
        const successMessage = `
🎉 Welcome to SustainAlign!

Your company profile has been successfully created. You now have full access to all features including:

• Project Discovery & AI Matching
• Alignment & Evaluation Tools  
• Decision Support Systems
• Monitoring & Reporting
• Marketplace Access

Redirecting you to your dashboard...
        `
        
        alert(successMessage)
        
        // Redirect to main dashboard
        window.location.href = '/dashboard'
        return
      }
      
      alert('Company profile saved to database!')
      setShowForm(false)
    } catch (e) {
      console.error('Failed to save company profile', e)
      alert(`Failed to save company profile: ${e.message}`)
    }
  }, [w, isNewUserMode])

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
      <div className="min-h-screen bg-white relative overflow-hidden">
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
          {/* Back to List Button - Only show for existing users, not new users */}
          {!isNewUserMode && (
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
          )}

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
                  right={null}
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
                  right={null}
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
                  right={null}
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


