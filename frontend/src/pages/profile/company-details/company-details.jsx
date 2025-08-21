import useCompanyWizard from './hooks/useCompanyWizard.js'
import Stepper from './components/Stepper.jsx'
import Step1Basic from './components/steps/Step1Basic.jsx'
import Step2Contact from './components/steps/Step2Contact.jsx'
import Step3Budget from './components/steps/Step3Budget.jsx'
import Step4Focus from './components/steps/Step4Focus.jsx'
import Step5Compliance from './components/steps/Step5Compliance.jsx'
import Step6NgoPrefs from './components/steps/Step6NgoPrefs.jsx'
import Step7AiInputs from './components/steps/Step7AiInputs.jsx'
import Step8Access from './components/steps/Step8Access.jsx'
import WizardActions from './components/WizardActions.jsx'
import AllocationPreview from './components/AllocationPreview.jsx'

export default function CompanyDetailsPage() {
  const w = useCompanyWizard()

  const finish = () => {
    const payload = w.getPayload()
    console.log('Company Profile Payload', payload)
    alert('Company profile saved!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Stepper step={w.step} goTo={w.goTo} />

      <div id="main-container" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
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
            right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Preview</div><div className="mt-2 text-gray-800"><div className="font-semibold">{w.companyName || 'Company Name'}</div><div className="text-sm">{w.industry || 'Industry'}</div><div className="text-xs text-gray-500">HQ: {[w.hqCity,w.hqState,w.hqCountry].filter(Boolean).join(', ') || '—'}</div></div></div>}
          />
        )}
        {w.step === 2 && (
          <Step2Contact
            csrContactName={w.csrContactName} setCsrContactName={w.setCsrContactName}
            csrContactRole={w.csrContactRole} setCsrContactRole={w.setCsrContactRole}
            csrEmail={w.csrEmail} setCsrEmail={w.setCsrEmail}
            csrPhone={w.csrPhone} setCsrPhone={w.setCsrPhone}
            website={w.website} setWebsite={w.setWebsite}
            right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Preview</div><div className="mt-2 text-gray-800"><div className="font-semibold">{w.csrContactName || 'CSR Contact'}</div><div className="text-sm">{w.csrContactRole || 'Designation'}</div><div className="text-xs text-gray-500">{w.csrEmail || 'email@company.com'} · {w.csrPhone || '—'}</div><div className="text-xs text-gray-500">{w.website || 'website'}</div></div></div>}
          />
        )}
        {w.step === 3 && (
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
        {w.step === 4 && (
          <Step4Focus
            prioritySdgs={w.prioritySdgs} setPrioritySdgs={w.setPrioritySdgs}
            esgGoals={w.esgGoals} setEsgGoals={w.setEsgGoals}
            themes={w.themes} setThemes={w.setThemes}
            targetYear={w.targetYear} setTargetYear={w.setTargetYear}
            reportingStandard={w.reportingStandard} setReportingStandard={w.setReportingStandard}
            right={<div className="bg-gray-50 rounded-2xl p-4 border border-gray-200"><div className="text-sm text-gray-600">Selected SDGs</div><div className="mt-2 flex flex-wrap gap-2">{w.prioritySdgs.length ? w.prioritySdgs.map((s) => <span key={s} className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{s}</span>) : <span className="text-xs text-gray-500">None</span>}</div></div>}
          />
        )}
        {w.step === 5 && (
          <Step5Compliance
            policyFiles={w.policyFiles} setPolicyFiles={w.setPolicyFiles}
            reportFiles={w.reportFiles} setReportFiles={w.setReportFiles}
            certFiles={w.certFiles} setCertFiles={w.setCertFiles}
            spendHistory={w.spendHistory} setSpendHistory={w.setSpendHistory}
          />
        )}
        {w.step === 6 && (
          <Step6NgoPrefs
            ngoSize={w.ngoSize} setNgoSize={w.setNgoSize}
            partnershipModel={w.partnershipModel} setPartnershipModel={w.setPartnershipModel}
            regions={w.regions} setRegions={w.setRegions}
          />
        )}
        {w.step === 7 && (
          <Step7AiInputs
            optimizeFor={w.optimizeFor} setOptimizeFor={w.setOptimizeFor}
            riskAppetite={w.riskAppetite} setRiskAppetite={w.setRiskAppetite}
            alignmentMode={w.alignmentMode} setAlignmentMode={w.setAlignmentMode}
          />
        )}
        {w.step === 8 && (
          <Step8Access
            roles={w.roles} setRoles={w.setRoles}
            integrations={w.integrations} setIntegrations={w.setIntegrations}
          />
        )}

        <WizardActions step={w.step} back={w.back} next={w.next} canProceed={w.canProceed} onFinish={finish} />
      </div>
    </div>
  )
}


