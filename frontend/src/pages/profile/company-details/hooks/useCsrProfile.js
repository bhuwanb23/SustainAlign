import { useMemo, useState, useCallback } from 'react'

export default function useCsrProfile() {
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetYear, setTargetYear] = useState('')
  const [reportingStandard, setReportingStandard] = useState('')

  const [totalBudget, setTotalBudget] = useState(0)
  const [climatePercent, setClimatePercent] = useState(0)
  const [educationPercent, setEducationPercent] = useState(0)
  const [healthcarePercent, setHealthcarePercent] = useState(0)

  const [isCelebrating, setIsCelebrating] = useState(false)

  const normalizeNumber = (value) => {
    const n = Number(value)
    if (Number.isNaN(n)) return 0
    return Math.max(0, n)
  }

  const handleBudgetChange = useCallback((value) => {
    setTotalBudget(normalizeNumber(value))
  }, [])

  const amounts = useMemo(() => {
    const climateAmount = Math.round((totalBudget * climatePercent) / 100)
    const educationAmount = Math.round((totalBudget * educationPercent) / 100)
    const healthcareAmount = Math.round((totalBudget * healthcarePercent) / 100)
    return { climateAmount, educationAmount, healthcareAmount }
  }, [totalBudget, climatePercent, educationPercent, healthcarePercent])

  const openCelebration = useCallback(() => setIsCelebrating(true), [])
  const closeCelebration = useCallback(() => setIsCelebrating(false), [])

  return {
    // company basics
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    // esg targets
    targetYear,
    setTargetYear,
    reportingStandard,
    setReportingStandard,
    // budget & allocations
    totalBudget,
    setTotalBudget: handleBudgetChange,
    climatePercent,
    setClimatePercent,
    educationPercent,
    setEducationPercent,
    healthcarePercent,
    setHealthcarePercent,
    ...amounts,
    // modal controls
    isCelebrating,
    openCelebration,
    closeCelebration,
  }
}


