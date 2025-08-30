import { useState, useEffect } from 'react'
import { getRationales, getRationale, createRationale, updateRationale, addRationaleNote } from '../../../../lib/projectApi'

export default function useRationale() {
  const [rationales, setRationales] = useState([])
  const [currentRationale, setCurrentRationale] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRationales = async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getRationales(filters)
      setRationales(data)
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
      const data = await getRationale(rationaleId)
      setCurrentRationale(data)
    } catch (err) {
      console.error('Failed to fetch rationale:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createNewRationale = async (rationaleData) => {
    try {
      setLoading(true)
      setError(null)
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

  useEffect(() => {
    fetchRationales()
  }, [])

  return {
    rationales,
    currentRationale,
    loading,
    error,
    fetchRationales,
    fetchRationale,
    createNewRationale,
    updateExistingRationale,
    addNote
  }
}
