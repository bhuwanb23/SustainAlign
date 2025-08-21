import { useMemo, useState } from 'react'

const ESG_CATEGORIES = [
  {
    key: 'environment',
    label: 'Environmental',
    description: 'Climate action, resource efficiency, biodiversity',
    hoverBorderClass: 'hover:border-green-400',
    icon: '🌍',
  },
  {
    key: 'social',
    label: 'Social',
    description: 'Human rights, community development, diversity',
    hoverBorderClass: 'hover:border-blue-400',
    icon: '👥',
  },
  {
    key: 'governance',
    label: 'Governance',
    description: 'Ethics, transparency, accountability',
    hoverBorderClass: 'hover:border-purple-400',
    icon: '💼',
  },
]

const SDG_LIST = [
  { id: 1,  label: 'No Poverty',                          bg: 'bg-sdg-red',          text: 'text-white' },
  { id: 2,  label: 'Zero Hunger',                         bg: 'bg-sdg-orange',       text: 'text-white' },
  { id: 3,  label: 'Good Health',                         bg: 'bg-sdg-green',        text: 'text-white' },
  { id: 4,  label: 'Quality Education',                   bg: 'bg-sdg-blue',         text: 'text-white' },
  { id: 5,  label: 'Gender Equality',                     bg: 'bg-sdg-teal',         text: 'text-white' },
  { id: 6,  label: 'Clean Water',                         bg: 'bg-sdg-cyan',         text: 'text-white' },
  { id: 7,  label: 'Clean Energy',                        bg: 'bg-sdg-yellow',       text: 'text-black' },
  { id: 8,  label: 'Decent Work',                         bg: 'bg-sdg-pink',         text: 'text-white' },
  { id: 9,  label: 'Innovation',                          bg: 'bg-sdg-purple',       text: 'text-white' },
  { id: 10, label: 'Reduced Inequalities',                bg: 'bg-sdg-magenta',      text: 'text-white' },
  { id: 11, label: 'Sustainable Cities',                  bg: 'bg-sdg-lime',         text: 'text-black' },
  { id: 12, label: 'Responsible Consumption',             bg: 'bg-sdg-navy',         text: 'text-white' },
  { id: 13, label: 'Climate Action',                      bg: 'bg-sdg-forest',       text: 'text-white' },
  { id: 14, label: 'Life Below Water',                    bg: 'bg-sdg-ocean',        text: 'text-white' },
  { id: 15, label: 'Life on Land',                        bg: 'bg-sdg-earth',        text: 'text-white' },
  { id: 16, label: 'Peace & Justice',                     bg: 'bg-sdg-peace',        text: 'text-white' },
  { id: 17, label: 'Partnerships',                        bg: 'bg-sdg-partnership',  text: 'text-white' },
]

export default function useSdgSelector() {
  const [selectedEsg, setSelectedEsg] = useState([])
  const [selectedSdgs, setSelectedSdgs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleEsg = (key) => {
    setSelectedEsg((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const toggleSdg = (id) => {
    setSelectedSdgs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const isConfirmEnabled = selectedEsg.length > 0 || selectedSdgs.length > 0

  const esgPercent = selectedEsg.length > 0 ? Math.floor(100 / selectedEsg.length) : 0

  const sdgById = useMemo(() => {
    const map = new Map()
    SDG_LIST.forEach((s) => map.set(s.id, s))
    return map
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return {
    // data
    esgCategories: ESG_CATEGORIES,
    sdgs: SDG_LIST,
    sdgById,
    // selection state
    selectedEsg,
    selectedSdgs,
    // derived
    esgPercent,
    isConfirmEnabled,
    isModalOpen,
    // actions
    toggleEsg,
    toggleSdg,
    openModal,
    closeModal,
  }
}


