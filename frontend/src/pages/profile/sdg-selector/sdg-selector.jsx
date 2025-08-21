import useSdgSelector from './hooks/useSdgSelector.js'
import Header from './components/Header.jsx'
import EsgCards from './components/EsgCards.jsx'
import SdgGrid from './components/SdgGrid.jsx'
import Sidebar from './components/Sidebar.jsx'
import CsrFocusBar from './components/CsrFocusBar.jsx'
import ConfirmationModal from './components/ConfirmationModal.jsx'

export default function SdgSelectorPage() {
  const {
    esgCategories,
    sdgs,
    sdgById,
    selectedEsg,
    selectedSdgs,
    esgPercent,
    isConfirmEnabled,
    isModalOpen,
    toggleEsg,
    toggleSdg,
    openModal,
    closeModal,
  } = useSdgSelector()

  const renderSdgPill = (id) => {
    const sdg = sdgById.get(id)
    if (!sdg) return null
    const isDarkText = sdg.text === 'text-black'
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow ${
          isDarkText ? 'text-black' : 'text-white'
        } bg-[var(--sdg)]`}
        style={{ '--sdg': getSdgHex(id) }}
      >
        <span className="mr-1">{id}</span>
        {sdg.label}
      </span>
    )
  }

  const getSdgHex = (id) => {
    const map = {
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
    return map[id] || '#e2e8f0'
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <Header isConfirmEnabled={isConfirmEnabled} onConfirm={openModal} />
      <CsrFocusBar sdgSelected={selectedSdgs} renderSdgPill={renderSdgPill} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-9">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">ESG Framework</h2>
              <p className="text-slate-600 mb-8">Select your Environmental, Social, and Governance priorities</p>
              <EsgCards categories={esgCategories} selectedKeys={selectedEsg} onToggle={toggleEsg} />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">UN Sustainable Development Goals</h2>
              <p className="text-slate-600 mb-8">Choose your priority SDGs to align with global sustainability targets</p>
              <SdgGrid sdgs={sdgs} selectedSdgs={selectedSdgs} toggleSdg={toggleSdg} />
            </section>
          </div>

          <div className="col-span-3">
            <Sidebar
              esgSelected={selectedEsg}
              esgPercent={esgPercent}
              sdgSelected={selectedSdgs}
              renderSdgPill={renderSdgPill}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal open={isModalOpen} onClose={closeModal} />
    </div>
  )
}


