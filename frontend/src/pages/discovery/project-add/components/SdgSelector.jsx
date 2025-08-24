import { motion } from 'framer-motion'

export default function SdgSelector({ selectedSdgs, onSdgToggle, delay = 0 }) {
  const sdgOptions = [
    { id: 1, name: 'No Poverty', color: 'bg-red-500', icon: '🏠' },
    { id: 2, name: 'Zero Hunger', color: 'bg-orange-500', icon: '🍽️' },
    { id: 3, name: 'Good Health', color: 'bg-green-500', icon: '🏥' },
    { id: 4, name: 'Quality Education', color: 'bg-blue-500', icon: '📚' },
    { id: 5, name: 'Gender Equality', color: 'bg-pink-500', icon: '⚖️' },
    { id: 6, name: 'Clean Water', color: 'bg-cyan-500', icon: '💧' },
    { id: 7, name: 'Clean Energy', color: 'bg-yellow-500', icon: '⚡' },
    { id: 8, name: 'Decent Work', color: 'bg-purple-500', icon: '💼' },
    { id: 13, name: 'Climate Action', color: 'bg-emerald-500', icon: '🌍' },
    { id: 15, name: 'Life on Land', color: 'bg-teal-500', icon: '🌲' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:col-span-2"
    >
      <label className="block text-sm font-medium text-slate-700 mb-6">
        Sustainable Development Goals (SDGs) <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sdgOptions.map((sdg, index) => (
          <motion.button
            key={sdg.id}
            type="button"
            onClick={() => onSdgToggle(sdg.name)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + index * 0.05, duration: 0.3 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedSdgs.includes(sdg.name)
                ? `${sdg.color} border-${sdg.color} text-white shadow-lg`
                : 'border-slate-300 bg-white text-slate-700 hover:border-green-500 hover:bg-green-50 hover:shadow-md'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xl mb-2">{sdg.icon}</div>
            <div className="text-xs font-medium">{sdg.id}</div>
            <div className="text-xs opacity-90">{sdg.name}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
