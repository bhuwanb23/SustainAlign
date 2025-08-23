import { motion } from 'framer-motion'
import ProjectCard from './components/ProjectCard.jsx'
import useProjectCards from './hooks/useProjectCards.js'

export default function ProjectCardsPage() {
  const { projects, loading } = useProjectCards()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    )
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-6 shadow-lg"
          >
            <span className="text-3xl">🌍</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Sustainable Impact Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover verified NGO projects making a real difference in communities around the world
          </motion.p>
        </motion.div>

        {/* Add Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={() => window.location.href = '/discovery/add'}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">+</span>
            Add Your Project
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No projects found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              Be the first to add a sustainable impact project to our community!
            </p>
            <motion.button
              onClick={() => window.location.href = '/discovery/add'}
              className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Your First Project
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}


