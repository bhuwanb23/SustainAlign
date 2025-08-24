import { motion } from 'framer-motion'

export default function ProjectAddSuccess({ onBackToForm }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="text-center max-w-3xl mx-auto"
    >
      {/* Enhanced Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl mb-8 shadow-2xl relative overflow-hidden"
      >
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl" />
        
        {/* Success Checkmark */}
        <motion.svg 
          className="w-12 h-12 text-white relative z-10"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </motion.svg>
        
        {/* Floating Success Particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-2 w-1 h-1 bg-blue-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      {/* Enhanced Title */}
      <motion.h1
        initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4"
      >
        Project Submitted Successfully! 🎉
      </motion.h1>

      {/* Enhanced Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="text-xl text-slate-600 mb-8 leading-relaxed"
      >
        Thank you for sharing your sustainable impact project with the community. 
        <span className="font-medium text-emerald-600"> Your project is now visible to potential partners and funders.</span>
      </motion.p>

      {/* Enhanced Next Steps Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8 mb-8"
      >
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center justify-center">
          <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
          What happens next?
        </h3>
        <ul className="text-left space-y-4 text-slate-600 max-w-lg mx-auto">
          {[
            'Your project will be reviewed within 24-48 hours',
            'You\'ll receive an email confirmation',
            'Potential partners can contact you directly',
            'Track your project\'s visibility in your dashboard'
          ].map((item, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-lg">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Enhanced Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col sm:flex-row gap-6 justify-center"
      >
        <motion.button
          onClick={onBackToForm}
          className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">➕</span>
          Add Another Project
        </motion.button>

        <motion.button
          onClick={() => window.location.href = '/discovery/cards'}
          className="px-10 py-4 bg-white text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:shadow-lg transition-all duration-200 border border-slate-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">👁️</span>
          View All Projects
        </motion.button>
      </motion.div>
      
      {/* Decorative Success Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-40 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-8"
      />
    </motion.div>
  )
}
