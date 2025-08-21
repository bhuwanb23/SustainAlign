import { useCallback, useMemo, useRef, useState } from 'react'

export default function useCsrHistory() {
  const [files, setFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFileName, setUploadingFileName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const timeoutsRef = useRef([])

  const clearTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
  }

  const onDrop = (selected) => {
    const list = Array.isArray(selected) ? selected : []
    if (!list.length) return
    setFiles((prev) => [...prev, ...list])
    startUpload(list[0])
  }

  const onSelectFiles = (list) => {
    const arr = Array.from(list || [])
    if (!arr.length) return
    setFiles((prev) => [...prev, ...arr])
    startUpload(arr[0])
  }

  const startUpload = useCallback((file) => {
    if (!file) return
    clearTimers()
    setUploadingFileName(file.name)
    setIsUploading(true)
    setUploadProgress(10)
    timeoutsRef.current.push(
      setTimeout(() => setUploadProgress(50), 600),
      setTimeout(() => setUploadProgress(75), 1200),
      setTimeout(() => {
        setUploadProgress(100)
        setIsUploading(false)
        setShowSuccess(true)
        timeoutsRef.current.push(
          setTimeout(() => setShowSuccess(false), 3000)
        )
      }, 2000)
    )
  }, [])

  const parseFile = (file) => {
    alert(`AI preview for: ${file.name}`)
  }

  const parsedCards = useMemo(
    () => [
      {
        id: 'education',
        badge: 'Education',
        title: 'Education Spend',
        value: '$2.4M',
        description: 'Scholarships, training programs, and educational infrastructure',
        color: 'blue',
        icon: '🎓',
      },
      {
        id: 'environment',
        badge: 'Environment',
        title: 'Carbon Offset',
        value: '15,000',
        description: 'Tons of CO2 offset through renewable energy projects',
        color: 'green',
        icon: '🌿',
      },
      {
        id: 'health',
        badge: 'Healthcare',
        title: 'Healthcare Projects',
        value: '142',
        description: 'Medical camps, hospital equipment, and health awareness programs',
        color: 'red',
        icon: '❤️',
      },
    ], []
  )

  const closeSuccess = () => setShowSuccess(false)

  return {
    files,
    isUploading,
    uploadProgress,
    uploadingFileName,
    showSuccess,
    parsedCards,
    onDrop,
    onSelectFiles,
    startUpload,
    parseFile,
    closeSuccess,
  }
}


