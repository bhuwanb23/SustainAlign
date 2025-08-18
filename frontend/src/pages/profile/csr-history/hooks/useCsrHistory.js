import { useState } from 'react'

export default function useCsrHistory() {
  const [files, setFiles] = useState([])

  const onDrop = (selected) => {
    setFiles((prev) => [...prev, ...selected])
  }

  const parseFile = (file) => {
    alert(`AI preview for: ${file.name}`)
  }

  return { files, onDrop, parseFile }
}


