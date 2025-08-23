import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

  // Debug logging
  console.log('CompanyDetailsPage rendering:', { showForm, companiesCount: companies.length, isShowcaseMode })

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-teal-300/40 rounded-full animate-float-slow blur-sm"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-300/30 rounded-full animate-float-medium blur-sm"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/50 to-emerald-300/50 rounded-full animate-float-fast blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-teal-200/40 to-blue-300/40 rounded-full animate-float-slow blur-sm"></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-cyan-400/20 rotate-12 animate-bounce"></div>
          
          {/* Wavy Lines */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent transform -skew-y-6 animate-slide-right"></div>
          <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-l from-transparent via-teal-100/30 to-transparent transform skew-y-6 animate-slide-left"></div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-radial from-emerald-200/20 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-teal-200/20 via-transparent to-transparent animate-pulse delay-1000"></div>
        </div>
        
        <div id="main-container" className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <CompanyList onAddNew={handleAddNew} companies={companies} isShowcaseMode={true} onViewDetails={handleViewDetails} />
        </div>
      </div>
    )
  }

  // Form mode - show form directly (skip company list)
  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Animated Background Shapes for Form View */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Elements */}
          <div className="absolute top-16 left-8 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-full animate-float-medium blur-sm"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-gradient-to-br from-blue-200/25 to-cyan-300/25 rounded-full animate-float-fast blur-sm"></div>
          <div className="absolute bottom-24 left-16 w-24 h-24 bg-gradient-to-br from-green-200/35 to-emerald-300/35 rounded-full animate-float-slow blur-sm"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(34,197,94,0.1)_100%)] bg-[length:20px_20px] animate-slide-up"></div>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(20,184,166,0.1)_100%)] bg-[length:20px_20px] animate-slide-right"></div>
          </div>
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-200/20 to-transparent rounded-tl-full"></div>
        </div>

        <Stepper step={w.step} goTo={w.goTo} mode="form" />

        <div id="main-container" className="max-w-5xl mx-auto px-4 py-8 space-y-6 relative z-10">
          {/* Back to List Button */}
          <div className="flex justify-start">
            <button
              onClick={handleBackToList}
              className="group px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
              Back to Company List
            </button>
          </div>

          {w.step === 1 && (
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
              right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Preview</div><div className="mt-2 text-gray-800"><div className="font-semibold">{w.companyName || 'Company Name'}</div><div className="text-sm">{w.industry || 'Industry'}</div><div className="text-xs text-gray-500">HQ: {[w.hqCity,w.hqState,w.hqCountry].filter(Boolean).join(', ') || '—'}</div><div className="mt-2 text-xs text-gray-600">Contact: {w.csrContactName || '—'} ({w.csrContactRole || '—'})</div></div></div>}
            />
          )}
          {w.step === 2 && (
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
          )}
          {w.step === 3 && (
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
              right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Summary</div><div className="mt-2 space-y-2"><div className="text-xs text-gray-600">Selected SDGs: {w.prioritySdgs.length || 0}</div><div className="text-xs text-gray-600">Files: {w.policyFiles.length + w.reportFiles.length + w.certFiles.length}</div><div className="text-xs text-gray-600">NGO: {w.ngoSize} • {w.partnershipModel}</div></div></div>}
            />
          )}
          {w.step === 4 && (
            <Step7AiInputs
              optimizeFor={w.optimizeFor} setOptimizeFor={w.setOptimizeFor}
              riskAppetite={w.riskAppetite} setRiskAppetite={w.setRiskAppetite}
              alignmentMode={w.alignmentMode} setAlignmentMode={w.setAlignmentMode}
              roles={w.roles} setRoles={w.setRoles}
              integrations={w.integrations} setIntegrations={w.setIntegrations}
              right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Summary</div><div className="mt-2 space-y-2"><div className="text-xs text-gray-600">AI Metrics: {w.optimizeFor.length || 0}</div><div className="text-xs text-gray-600">Risk: {w.riskAppetite}</div><div className="text-xs text-gray-600">Users: {w.roles.length}</div><div className="text-xs text-gray-600">Integrations: {w.integrations.length || 0}</div></div></div>}
            />
          )}

          <WizardActions step={w.step} back={w.back} next={w.next} canProceed={w.canProceed} onFinish={finish} />
        </div>
      </div>
    )
  }

  // Fallback - should not reach here in form mode, but just in case
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-teal-300/40 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-300/30 rounded-full animate-float-medium blur-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/50 to-emerald-300/50 rounded-full animate-float-fast blur-sm"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-teal-200/40 to-blue-300/40 rounded-full animate-float-slow blur-sm"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-cyan-400/20 rotate-12 animate-bounce"></div>
        
        {/* Wavy Lines */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent transform -skew-y-6 animate-slide-right"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-l from-transparent via-teal-100/30 to-transparent transform skew-y-6 animate-slide-left"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-radial from-emerald-200/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-radial from-teal-200/20 via-transparent to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Debug test div */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
        Debug: showForm={showForm.toString()}, companies={companies.length}
      </div>
      
      <div id="main-container" className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <CompanyList onAddNew={handleAddNew} companies={companies} isShowcaseMode={false} />
      </div>
    </div>
  )
}


