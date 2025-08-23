import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectAddForm from './components/ProjectAddForm.jsx'
import ProjectAddHeader from './components/ProjectAddHeader.jsx'
import ProjectAddSuccess from './components/ProjectAddSuccess.jsx'
import useProjectAdd from './hooks/useProjectAdd.js'

export default function ProjectAddPage() {
  const [step, setStep] = useState('form') // 'form' | 'success'
  const { addProject, isSubmitting } = useProjectAdd()

  const handleSubmit = async (projectData) => {
    try {
      await addProject(projectData)
      setStep('success')
    } catch (error) {
      console.error('Failed to add project:', error)
    }
  }

  const handleBackToForm = () => {
    setStep('form')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-emerald-300/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-teal-300/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-300/50 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Wavy Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent transform -skew-y-6"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectAddHeader />
              <ProjectAddForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </motion.div>
          )}
          
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectAddSuccess onBackToForm={handleBackToForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
