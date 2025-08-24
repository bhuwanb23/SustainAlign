import { motion } from 'framer-motion'

export default function ProjectAddHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="text-center mb-12"
    >
      {/* Enhanced Icon Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3, 
          type: "spring", 
          stiffness: 200,
          damping: 15
        }}
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl mb-8 shadow-2xl relative overflow-hidden"
      >
        {/* Inner Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
        
        {/* Animated Icon */}
        <motion.span 
          className="text-3xl relative z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌱
        </motion.span>
        
        {/* Floating Particles Around Icon */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -top-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </motion.div>
      
      {/* Enhanced Title */}
      <motion.h1
        initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="text-4xl font-bold bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4"
      >
        Add New Project
      </motion.h1>
      
      {/* Enhanced Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 0.8, 
          delay: 0.7,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6"
      >
        Share your sustainable impact project with the community. 
        <span className="font-medium text-green-600"> Connect with partners and funders.</span>
      </motion.p>
      
      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.9,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="w-32 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"
      />
    </motion.div>
  )
}
