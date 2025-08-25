import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectAddForm from './components/ProjectAddForm.jsx'
import ProjectAddHeader from './components/ProjectAddHeader.jsx'
import ProjectAddSuccess from './components/ProjectAddSuccess.jsx'
import AuthStatus from './components/AuthStatus.jsx'
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Authentication Status Component */}
      <AuthStatus />
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-16 left-8 w-3 h-3 bg-green-400/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-4 h-4 bg-emerald-400/50 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, -20, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 w-2 h-2 bg-teal-400/60 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 25, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400/50 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400/40 rounded-full"
          animate={{
            y: [0, -35, 0],
            x: [0, -25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Rotating Geometric Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rotate-45 rounded-lg"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-teal-300/40 to-cyan-400/40 rotate-12 rounded-lg"
          animate={{
            rotate: [12, 372],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        
        {/* Subtle Wave Patterns */}
        <motion.div
          className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-transparent via-green-100/20 to-transparent transform -skew-y-3"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-transparent via-emerald-100/15 to-transparent transform -skew-y-6"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-green-200/40 to-emerald-300/40 rounded-full blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 left-8 w-12 h-12 bg-gradient-to-br from-teal-200/30 to-cyan-300/30 rounded-full blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, green 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="space-y-8"
            >
              <ProjectAddHeader />
              <ProjectAddForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </motion.div>
          )}
          
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: 15 }}
              transition={{ 
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <ProjectAddSuccess onBackToForm={handleBackToForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
