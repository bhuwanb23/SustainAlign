import EsgTargetsCard from '../EsgTargetsCard.jsx'

export default function Step4Focus({ 
  prioritySdgs = [], setPrioritySdgs, 
  esgGoals = '', setEsgGoals, 
  themes = '', setThemes, 
  targetYear = '', setTargetYear, 
  reportingStandard = '', setReportingStandard,
  policyFiles = [], setPolicyFiles,
  reportFiles = [], setReportFiles,
  certFiles = [], setCertFiles,
  spendHistory = '', setSpendHistory,
  ngoSize = 'Mid-level', setNgoSize,
  partnershipModel = 'Funding + Execution', setPartnershipModel,
  regions = [], setRegions,
  right 
}) {
  const SDG_OPTIONS = ['No Poverty','Zero Hunger','Good Health','Quality Education','Clean Water','Affordable Energy','Decent Work','Industry & Innovation','Reduced Inequalities','Sustainable Cities','Responsible Consumption','Climate Action','Life Below Water','Life On Land','Peace & Justice','Partnerships']
  
  // Enhanced SDG icons mapping
  const SDG_ICONS = ['🌱', '🍽️', '🏥', '📚', '💧', '⚡', '💼', '🏭', '⚖️', '🏙️', '♻️', '🌍', '🐠', '🌳', '🕊️', '🤝']
  
  const toggle = (s) => setPrioritySdgs((prioritySdgs || []).includes(s) ? (prioritySdgs || []).filter((x) => x !== s) : [...(prioritySdgs || []), s])
  
  const onUpload = (setter) => (e) => setter(Array.from(e.target.files || []))
  const REGION_OPTIONS = ['Local','National','Global']
  const toggleRegion = (r) => setRegions((regions || []).includes(r) ? (regions || []).filter((x) => x !== r) : [...(regions || []), r])

  return (
    <div className="space-y-8">
      {/* Focus Areas Section */}
      <section className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">CSR/ESG Strategy & Focus Areas</h3>
          <button className="text-eco-blue hover:text-eco-teal transition-colors">
            <i className="fas fa-chevron-down text-lg"></i>
          </button>
        </div>
        
        <div className="space-y-8">
          {/* SDG Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Priority Sustainable Development Goals (Multi-select)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {SDG_OPTIONS.map((s, index) => {
                const colors = [
                  'bg-red-500 hover:bg-red-600',
                  'bg-yellow-500 hover:bg-yellow-600', 
                  'bg-green-500 hover:bg-green-600',
                  'bg-red-600 hover:bg-red-700',
                  'bg-orange-500 hover:bg-orange-600',
                  'bg-blue-400 hover:bg-blue-500',
                  'bg-yellow-400 hover:bg-yellow-500',
                  'bg-purple-600 hover:bg-purple-700',
                  'bg-orange-600 hover:bg-orange-700',
                  'bg-green-600 hover:bg-green-700',
                  'bg-blue-500 hover:bg-blue-600',
                  'bg-teal-500 hover:bg-teal-600',
                  'bg-indigo-500 hover:bg-indigo-600',
                  'bg-pink-500 hover:bg-pink-600',
                  'bg-gray-600 hover:bg-gray-700',
                  'bg-cyan-500 hover:bg-cyan-600'
                ];
                
                return (
                  <label key={s} className={`${colors[index % colors.length]} w-16 h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md ${
                    (prioritySdgs || []).includes(s) 
                      ? 'ring-4 ring-emerald-400 ring-offset-2' 
                      : ''
                  }`}>
                    <input type="checkbox" className="hidden" checked={(prioritySdgs || []).includes(s)} onChange={() => toggle(s)} />
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                    <span className="text-white text-xs">{SDG_ICONS[index]}</span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3">Click on SDG numbers to select your priority areas. Each SDG has a unique eco-icon.</p>
          </div>
          
          {/* ESG Goals Input */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-bullseye text-white text-lg"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">ESG Goals & Thematic Areas</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ESG Goals & Targets (free text)</label>
                <textarea 
                  rows={3} 
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors resize-none" 
                  value={esgGoals || ''} 
                  onChange={(e) => setEsgGoals(e.target.value)} 
                  placeholder="e.g., Net Zero by 2035, Women in Leadership 40% by 2030, 100% Renewable Energy by 2040, Carbon Neutral by 2035" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Thematic Areas</label>
                <textarea 
                  rows={2} 
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors resize-none" 
                  value={themes || ''} 
                  onChange={(e) => setThemes(e.target.value)} 
                  placeholder="Renewable energy, skilling, poverty reduction, healthcare, education, rural development, women empowerment" 
                />
              </div>
            </div>
          </div>
          
          {/* Selected SDGs Summary */}
          {(prioritySdgs || []).length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center mb-3">
                <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                <span className="text-sm font-medium text-blue-800">Selected Priority Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prioritySdgs.map((sdg, index) => (
                  <span key={sdg} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
                    {index + 1}. {sdg} {SDG_ICONS[SDG_OPTIONS.indexOf(sdg)]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ESG Targets Section */}
      <section className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">ESG Targets & Standards</h3>
        <EsgTargetsCard
          targetYear={targetYear || ''}
          setTargetYear={setTargetYear}
          reportingStandard={reportingStandard || ''}
          setReportingStandard={setReportingStandard}
        />
      </section>

      {/* Compliance Section */}
      <section className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">CSR/ESG Compliance & History</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <i className="text-red-600 text-2xl">📋</i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">CSR/ESG Policy Documents</h4>
            <p className="text-sm text-gray-600 mb-4">Upload policy documents (DOC, PDF)</p>
            <input type="file" multiple accept=".doc,.docx,.pdf" onChange={onUpload(setPolicyFiles)} className="hidden" id="policy-upload" />
            <label htmlFor="policy-upload" className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
              + Upload Policy
            </label>
            {policyFiles.length > 0 && (
              <p className="text-xs text-emerald-600 mt-2">{policyFiles.length} file(s) selected</p>
            )}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <i className="text-blue-600 text-2xl">📊</i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Past CSR Reports</h4>
            <p className="text-sm text-gray-600 mb-4">Upload sustainability reports (PDF, Word, Excel)</p>
            <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={onUpload(setReportFiles)} className="hidden" id="report-upload" />
            <label htmlFor="report-upload" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              + Upload Reports
            </label>
            {reportFiles.length > 0 && (
              <p className="text-xs text-blue-600 mt-2">{reportFiles.length} file(s) selected</p>
            )}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <i className="text-green-600 text-2xl">🏆</i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Compliance Certificates</h4>
            <p className="text-sm text-gray-600 mb-4">Upload certificates (ISO, GRI, SEBI, etc.)</p>
            <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={onUpload(setCertFiles)} className="hidden" id="cert-upload" />
            <label htmlFor="cert-upload" className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
              + Upload Certificates
            </label>
            {certFiles.length > 0 && (
              <p className="text-xs text-teal-600 mt-2">{certFiles.length} file(s) selected</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">CSR Spend History</label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 mb-3">Enter your CSR spending history manually or upload reports for automatic extraction</p>
            <textarea 
              rows={3} 
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors" 
              value={spendHistory || ''} 
              onChange={(e) => setSpendHistory(e.target.value)} 
              placeholder="e.g., 2024: ₹2.5 Cr - Education & Healthcare initiatives&#10;2023: ₹1.8 Cr - Environmental conservation projects&#10;2022: ₹1.2 Cr - Rural development programs" 
            />
          </div>
        </div>
      </section>

      {/* NGO Preferences Section */}
      <section className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">NGO Collaboration Preferences</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:border-emerald-400 hover:bg-emerald-50">
            <div className="text-4xl mb-4">🌿</div>
            <h4 className="font-semibold text-gray-900 mb-2">Grassroot</h4>
            <p className="text-sm text-gray-600 mb-4">Community-based organizations</p>
            <select 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors" 
              value={ngoSize === 'Grassroot' ? 'Grassroot' : ''} 
              onChange={(e) => setNgoSize(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Grassroot">Grassroot</option>
            </select>
          </div>
          
          <div className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:border-blue-400 hover:bg-blue-50">
            <div className="text-4xl mb-4">🏛️</div>
            <h4 className="font-semibold text-gray-900 mb-2">Mid-level</h4>
            <p className="text-sm text-gray-600 mb-4">Regional organizations</p>
            <select 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors" 
              value={ngoSize === 'Mid-level' ? 'Mid-level' : ''} 
              onChange={(e) => setNgoSize(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Mid-level">Mid-level</option>
            </select>
          </div>
          
          <div className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:border-teal-400 hover:bg-teal-50">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="font-semibold text-gray-900 mb-2">Large International</h4>
            <p className="text-sm text-gray-600 mb-4">International NGOs</p>
            <select 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors" 
              value={ngoSize === 'Large International' ? 'Large International' : ''} 
              onChange={(e) => setNgoSize(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Large International">Large International</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Partnership Model</label>
            <select 
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors" 
              value={partnershipModel || 'Funding + Execution'} 
              onChange={(e) => setPartnershipModel(e.target.value)}
            >
              <option>Funding only</option>
              <option>Funding + Execution</option>
              <option>Joint execution</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Regions</label>
            <div className="flex items-center gap-3 flex-wrap">
              {REGION_OPTIONS.map((r) => (
                <label key={r} className={`px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all hover:scale-105 ${
                  (regions || []).includes(r) 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700 ring-2 ring-emerald-400' 
                    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
                }`}>
                  <input type="checkbox" className="hidden" checked={(regions || []).includes(r)} onChange={() => toggleRegion(r)} />
                  {r}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right Sidebar */}
      {right && (
        <div className="lg:col-span-1">
          {right}
        </div>
      )}
    </div>
  )
}


