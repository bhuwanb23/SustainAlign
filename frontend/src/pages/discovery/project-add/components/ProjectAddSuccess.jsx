import { motion } from 'framer-motion'

export default function ProjectAddSuccess({ onBackToForm }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-8 shadow-lg"
      >
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Project Submitted Successfully! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
      >
        Thank you for sharing your sustainable impact project with the community. 
        Your project is now visible to potential partners and funders.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
        <ul className="text-left space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Your project will be reviewed within 24-48 hours</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>You'll receive an email confirmation</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Potential partners can contact you directly</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>Track your project's visibility in your dashboard</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          onClick={onBackToForm}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Another Project
        </motion.button>

        <motion.button
          onClick={() => window.location.href = '/discovery/cards'}
          className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
