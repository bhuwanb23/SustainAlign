import { useState, useEffect } from 'react'
import { getRationales, getRationale, createRationale, updateRationale, addRationaleNote } from '../../../../lib/projectApi'
import { 
  generateRationale as generateAIRationale, 
  getCompanyRationales, 
  getRationaleDetail,
  updateRationale as updateAIRationale,
  addRationaleNote as addAIRationaleNote,
  getMockRationale
} from '../../../../lib/aiMatchingApi'

export default function useRationale() {
  const [rationales, setRationales] = useState([])
  const [currentRationale, setCurrentRationale] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [companyId, setCompanyId] = useState(1) // Default company ID, should be set from user context

  const fetchRationales = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to fetch from AI matching service first
      try {
        const aiRationales = await getCompanyRationales(companyId)
        if (aiRationales && aiRationales.length > 0) {
          setRationales(aiRationales)
          setLoading(false)
          return
        }
      } catch (aiError) {
        console.warn('AI matching service not available, falling back to mock data:', aiError)
      }
      
      // Fallback to regular API or mock data
      try {
        const data = await getRationales(filters)
        setRationales(data)
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError)
        // Use mock data as fallback
        const mockRationale = getMockRationale()
        setRationales([mockRationale])
      }
    } catch (err) {
      console.error('Failed to fetch rationales:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchRationale = async (rationaleId) => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to fetch from AI matching service first
      try {
        const data = await getRationaleDetail(rationaleId)
        setCurrentRationale(data)
        setLoading(false)
        return
      } catch (aiError) {
        console.warn('AI matching service not available, falling back to mock data:', aiError)
      }
      
      // Fallback to regular API or mock data
      try {
        const data = await getRationale(rationaleId)
        setCurrentRationale(data)
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError)
        // Use mock data as fallback
        const mockRationale = getMockRationale()
        setCurrentRationale(mockRationale)
      }
    } catch (err) {
      console.error('Failed to fetch rationale:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateAIRationaleForCompany = async (filters = {}) => {
    try {
      setIsGenerating(true)
      setError(null)
      
      console.log('🤖 Generating AI-powered project matching rationale...')
      
      const rationaleData = await generateAIRationale(companyId, filters)
      
      if (rationaleData) {
        setCurrentRationale(rationaleData)
        setRationales(prev => [rationaleData, ...prev])
        
        console.log('✅ AI rationale generated successfully:', rationaleData)
        return rationaleData
      } else {
        throw new Error('Failed to generate AI rationale')
      }
    } catch (err) {
      console.error('Failed to generate AI rationale:', err)
      setError(err.message)
      
      // Fallback to mock data
      console.log('🔄 Falling back to mock data...')
      const mockRationale = getMockRationale()
      setCurrentRationale(mockRationale)
      setRationales(prev => [mockRationale, ...prev])
      
      return mockRationale
    } finally {
      setIsGenerating(false)
    }
  }

  const createNewRationale = async (rationaleData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Try AI matching service first
      try {
        const data = await generateAIRationale(companyId, rationaleData.filters || {})
        setRationales(prev => [data, ...prev])
        return data
      } catch (aiError) {
        console.warn('AI matching service not available, falling back to regular API:', aiError)
      }
      
      // Fallback to regular API
      const data = await createRationale(rationaleData)
      setRationales(prev => [...prev, data])
      return data
    } catch (err) {
      console.error('Failed to create rationale:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateExistingRationale = async (rationaleId, rationaleData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Try AI matching service first
      try {
        const success = await updateAIRationale(rationaleId, rationaleData)
        if (success) {
          // Refresh the rationale
          const updatedRationale = await getRationaleDetail(rationaleId)
          setRationales(prev => prev.map(r => r.id === rationaleId ? updatedRationale : r))
          if (currentRationale?.id === rationaleId) {
            setCurrentRationale(updatedRationale)
          }
          return updatedRationale
        }
      } catch (aiError) {
        console.warn('AI matching service not available, falling back to regular API:', aiError)
      }
      
      // Fallback to regular API
      const data = await updateRationale(rationaleId, rationaleData)
      setRationales(prev => prev.map(r => r.id === rationaleId ? data : r))
      if (currentRationale?.id === rationaleId) {
        setCurrentRationale(data)
      }
      return data
    } catch (err) {
      console.error('Failed to update rationale:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const addNote = async (rationaleId, noteData) => {
    try {
      setError(null)
      
      // Try AI matching service first
      try {
        const success = await addAIRationaleNote(rationaleId, noteData.author, noteData.content)
        if (success) {
          // Refresh the rationale to get updated notes
          const updatedRationale = await getRationaleDetail(rationaleId)
          if (currentRationale?.id === rationaleId) {
            setCurrentRationale(updatedRationale)
          }
          return { success: true }
        }
      } catch (aiError) {
        console.warn('AI matching service not available, falling back to regular API:', aiError)
      }
      
      // Fallback to regular API
      const data = await addRationaleNote(rationaleId, noteData)
      
      // Update current rationale if it's the one we're adding a note to
      if (currentRationale?.id === rationaleId) {
        setCurrentRationale(prev => ({
          ...prev,
          notes: [...(prev.notes || []), data]
        }))
      }
      
      return data
    } catch (err) {
      console.error('Failed to add note:', err)
      setError(err.message)
      throw err
    }
  }

  const setCompanyIdForAnalysis = (newCompanyId) => {
    setCompanyId(newCompanyId)
  }

  useEffect(() => {
    fetchRationales()
  }, [companyId])

  return {
    rationales,
    currentRationale,
    loading,
    error,
    isGenerating,
    companyId,
    fetchRationales,
    fetchRationale,
    createNewRationale,
    updateExistingRationale,
    addNote,
    generateAIRationaleForCompany,
    setCompanyIdForAnalysis
  }
}
