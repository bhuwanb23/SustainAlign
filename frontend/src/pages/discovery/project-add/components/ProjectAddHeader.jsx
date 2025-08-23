import { motion } from 'framer-motion'

export default function ProjectAddHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-6 shadow-lg"
      >
        <span className="text-3xl">🌱</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Add New Project
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
      >
        Share your sustainable impact project with the community. Help connect with potential partners and funders.
      </motion.p>
    </motion.div>
  )
}
