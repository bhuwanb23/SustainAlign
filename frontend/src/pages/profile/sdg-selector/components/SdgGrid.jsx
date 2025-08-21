const SDG_HEX_BY_ID = {
  1: '#E5243B',
  2: '#DDA63A',
  3: '#4C9F38',
  4: '#C5192D',
  5: '#FF3A21',
  6: '#26BDE2',
  7: '#FCC30B',
  8: '#A21942',
  9: '#FD6925',
  10: '#DD1367',
  11: '#FD9D24',
  12: '#BF8B2E',
  13: '#3F7E44',
  14: '#0A97D9',
  15: '#56C02B',
  16: '#00689D',
  17: '#19486A',
}

export default function SdgGrid({ sdgs, selectedSdgs, toggleSdg }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {sdgs.map((sdg) => {
        const isSelected = selectedSdgs.includes(sdg.id)
        const bg = SDG_HEX_BY_ID[sdg.id] || '#e2e8f0'
        const textClass = sdg.text || 'text-white'
        return (
          <button
            key={sdg.id}
            type="button"
            onClick={() => toggleSdg(sdg.id)}
            className={`sdg-tile ${textClass} bg-[var(--sdg)] rounded-xl p-4 cursor-pointer relative transition-all shadow-lg hover:shadow-xl ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{ '--sdg': bg }}
            aria-pressed={isSelected}
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">{sdg.id}</div>
              <div className="text-xs font-medium">{sdg.label}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}


