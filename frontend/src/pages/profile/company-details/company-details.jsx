import { useState } from 'react'
import useCompanyWizard from './hooks/useCompanyWizard.js'
import Stepper from './components/Stepper.jsx'
import CompanyList from './components/CompanyList.jsx'
import Step1Basic from './components/steps/Step1Basic.jsx'
import Step3Budget from './components/steps/Step3Budget.jsx'
import Step4Focus from './components/steps/Step4Focus.jsx'
import Step7AiInputs from './components/steps/Step7AiInputs.jsx'
import WizardActions from './components/WizardActions.jsx'
import AllocationPreview from './components/AllocationPreview.jsx'

export default function CompanyDetailsPage() {
  const [showForm, setShowForm] = useState(false)
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

  // Debug logging
  console.log('CompanyDetailsPage rendering:', { showForm, companiesCount: companies.length })

  const handleAddNew = () => {
    console.log('handleAddNew called')
    setShowForm(true)
    w.reset() // Reset wizard state for new company
  }

  const handleBackToList = () => {
    console.log('handleBackToList called')
    setShowForm(false)
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

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Debug test div */}
        <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
          Debug: showForm={showForm.toString()}, companies={companies.length}
        </div>
        <div id="main-container" className="max-w-7xl mx-auto px-4 py-8">
          <CompanyList onAddNew={handleAddNew} companies={companies} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Stepper step={w.step} goTo={w.goTo} />

      <div id="main-container" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Back to List Button */}
        <div className="flex justify-start">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
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


