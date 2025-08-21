import { useMemo, useState } from 'react'

const emptyPercents = { education: 0, healthcare: 0, environment: 0, rural: 0, women: 0, technology: 0, other: 0 }

export default function useCompanyWizard() {
  const [step, setStep] = useState(1)

  // 1. Basic Info
  const [companyName, setCompanyName] = useState('')
  const [logoFile, setLogoFile] = useState(null)
  const [registrationId, setRegistrationId] = useState('')
  const [industry, setIndustry] = useState('')
  const [hqCountry, setHqCountry] = useState('')
  const [hqState, setHqState] = useState('')
  const [hqCity, setHqCity] = useState('')
  const [branches, setBranches] = useState([])

  // 2. Contact
  const [csrContactName, setCsrContactName] = useState('')
  const [csrContactRole, setCsrContactRole] = useState('')
  const [csrEmail, setCsrEmail] = useState('')
  const [csrPhone, setCsrPhone] = useState('')
  const [website, setWebsite] = useState('')

  // 3. Budget
  const [budget, setBudget] = useState(0)
  const [currency, setCurrency] = useState('INR')
  const [splits, setSplits] = useState(emptyPercents)
  const [projectSize, setProjectSize] = useState('Medium')

  // 4. Focus
  const [prioritySdgs, setPrioritySdgs] = useState([])
  const [esgGoals, setEsgGoals] = useState('')
  const [themes, setThemes] = useState('')
  const [targetYear, setTargetYear] = useState('')
  const [reportingStandard, setReportingStandard] = useState('')

  // 5. Compliance
  const [policyFiles, setPolicyFiles] = useState([])
  const [reportFiles, setReportFiles] = useState([])
  const [certFiles, setCertFiles] = useState([])
  const [spendHistory, setSpendHistory] = useState('')

  // 6. NGO Prefs
  const [ngoSize, setNgoSize] = useState('Mid-level')
  const [partnershipModel, setPartnershipModel] = useState('Funding + Execution')
  const [regions, setRegions] = useState([])

  // 7. AI Inputs
  const [optimizeFor, setOptimizeFor] = useState([]) // ['Impact','Budget','Sustainability','Volunteering']
  const [riskAppetite, setRiskAppetite] = useState('Medium')
  const [alignmentMode, setAlignmentMode] = useState('Strict compliance')

  // 8. Access
  const [roles, setRoles] = useState([{ email: '', role: 'Admin' }])
  const [integrations, setIntegrations] = useState([]) // ['SAP','Workday','MSC']

  const totalSplit = useMemo(() => Object.values(splits).reduce((a, b) => a + Number(b || 0), 0), [splits])
  const climatePercent = Number(splits.environment || 0)
  const educationPercent = Number(splits.education || 0)
  const healthcarePercent = Number(splits.healthcare || 0)
  const climateAmount = Math.round((Number(budget || 0) * climatePercent) / 100)
  const educationAmount = Math.round((Number(budget || 0) * educationPercent) / 100)
  const healthcareAmount = Math.round((Number(budget || 0) * healthcarePercent) / 100)
  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return companyName && industry && hqCountry
      case 2:
        return csrContactName && csrEmail
      case 3:
        return budget > 0 && totalSplit === 100
      default:
        return true
    }
  }, [step, companyName, industry, hqCountry, csrContactName, csrEmail, budget, totalSplit])

  const next = () => setStep((s) => Math.min(8, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))
  const goTo = (s) => setStep(Math.max(1, Math.min(8, s)))

  const getPayload = () => ({
    company: { companyName, logoFile, registrationId, industry, hq: { country: hqCountry, state: hqState, city: hqCity }, branches },
    contact: { csrContactName, csrContactRole, csrEmail, csrPhone, website },
    budget: { amount: budget, currency, splits, projectSize },
    focus: { prioritySdgs, esgGoals, themes, targetYear, reportingStandard },
    compliance: { policyFiles, reportFiles, certFiles, spendHistory },
    ngoPrefs: { ngoSize, partnershipModel, regions },
    ai: { optimizeFor, riskAppetite, alignmentMode },
    access: { roles, integrations },
  })

  return {
    step,
    next,
    back,
    goTo,
    canProceed,
    getPayload,
    // exports of fields & setters
    companyName, setCompanyName, logoFile, setLogoFile, registrationId, setRegistrationId, industry, setIndustry,
    hqCountry, setHqCountry, hqState, setHqState, hqCity, setHqCity, branches, setBranches,
    csrContactName, setCsrContactName, csrContactRole, setCsrContactRole, csrEmail, setCsrEmail, csrPhone, setCsrPhone, website, setWebsite,
    budget, setBudget, currency, setCurrency, splits, setSplits, projectSize, setProjectSize,
    prioritySdgs, setPrioritySdgs, esgGoals, setEsgGoals, themes, setThemes,
    targetYear, setTargetYear, reportingStandard, setReportingStandard,
    policyFiles, setPolicyFiles, reportFiles, setReportFiles, certFiles, setCertFiles, spendHistory, setSpendHistory,
    ngoSize, setNgoSize, partnershipModel, setPartnershipModel, regions, setRegions,
    optimizeFor, setOptimizeFor, riskAppetite, setRiskAppetite, alignmentMode, setAlignmentMode,
    roles, setRoles, integrations, setIntegrations,
    climatePercent, educationPercent, healthcarePercent, climateAmount, educationAmount, healthcareAmount,
  }
}


