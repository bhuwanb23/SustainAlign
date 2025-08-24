export default function Step7AiInputs({ 
  optimizeFor = [], setOptimizeFor, 
  riskAppetite = 'Medium', setRiskAppetite, 
  alignmentMode = 'Strict compliance', setAlignmentMode,
  roles = [], setRoles,
  integrations = [], setIntegrations,
  right 
}) {
  const METRICS = ['Impact', 'Budget efficiency', 'Long-term sustainability', 'Employee volunteering']
  const toggle = (m) => setOptimizeFor((optimizeFor || []).includes(m) ? (optimizeFor || []).filter((x) => x !== m) : [...(optimizeFor || []), m])
  
  const addUser = () => setRoles([...(roles || []), { email: '', role: 'CSR Manager' }])
  const updateUser = (i, key, val) => setRoles((roles || []).map((r, idx) => (idx === i ? { ...r, [key]: val } : r)))
  const removeUser = (i) => setRoles((roles || []).filter((_, idx) => idx !== i))

  const INTEGRATIONS = ['SAP', 'Workday', 'Microsoft Sustainability Cloud']
  const toggleIntegration = (x) => setIntegrations((integrations || []).includes(x) ? (integrations || []).filter((i) => i !== x) : [...(integrations || []), x])

  return (
    <div className="space-y-8">
      {/* AI Personalization Section - Two Column Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Risk Appetite Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <i className="text-white text-lg">📊</i>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Risk Appetite</h3>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-600 mb-3">Investment Risk Level</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={riskAppetite === 'Low' ? 25 : riskAppetite === 'Medium' ? 65 : 85}
                className="w-full h-2 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (val < 40) setRiskAppetite('Low')
                  else if (val < 75) setRiskAppetite('Medium')
                  else setRiskAppetite('High')
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Conservative</span>
                <span className="font-medium text-emerald-600">Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">
                  {riskAppetite === 'Low' ? '25%' : riskAppetite === 'Medium' ? '65%' : '85%'}
                </div>
                <div className="text-xs text-slate-600">Current Level</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {riskAppetite === 'Low' ? '$1.2M' : riskAppetite === 'Medium' ? '$2.4M' : '$3.8M'}
                </div>
                <div className="text-xs text-slate-600">Max Exposure</div>
              </div>
              <div className="text-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="text-2xl font-bold text-teal-600">
                  {riskAppetite === 'Low' ? '5.2%' : riskAppetite === 'Medium' ? '8.2%' : '12.5%'}
                </div>
                <div className="text-xs text-slate-600">Expected ROI</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alignment Mode Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <i className="text-white text-lg">🎯</i>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Alignment Mode</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3">
                <i className="text-emerald-500 text-lg">🌱</i>
                <span className="font-medium text-slate-700">Environmental Focus</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={alignmentMode === 'Strict compliance'} 
                  onChange={() => setAlignmentMode(alignmentMode === 'Strict compliance' ? 'Flexible innovation' : 'Strict compliance')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500">
                </div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <i className="text-blue-500 text-lg">👥</i>
                <span className="font-medium text-slate-700">Social Impact</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={true} 
                  className="sr-only peer"
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
                </div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <i className="text-purple-500 text-lg">⚖️</i>
                <span className="font-medium text-slate-700">Governance Standards</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={false} 
                  className="sr-only peer"
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500">
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Priority Section - Full Width */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <i className="text-white text-lg">📈</i>
          </div>
          <h3 className="text-xl font-semibold text-slate-800">Key Metrics Priority</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {METRICS.map((metric, index) => (
            <div 
              key={metric}
              className={`text-center p-6 rounded-xl border float-animation ${
                index === 0 ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200' :
                index === 1 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' :
                index === 2 ? 'bg-gradient-to-br from-teal-50 to-green-50 border-teal-200' :
                'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
              }`}
              style={{ animationDelay: `${index * 2}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                index === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                index === 2 ? 'bg-gradient-to-r from-teal-500 to-green-500' :
                'bg-gradient-to-r from-orange-500 to-red-500'
              }`}>
                <i className="text-white text-xl">
                  {index === 0 ? '❤️' : index === 1 ? '💰' : index === 2 ? '♻️' : '🤝'}
                </i>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{metric}</h4>
              <div className={`text-3xl font-bold mb-2 ${
                index === 0 ? 'text-emerald-600' :
                index === 1 ? 'text-blue-600' :
                index === 2 ? 'text-teal-600' :
                'text-orange-600'
              }`}>
                {index === 0 ? '8.7' : index === 1 ? '92%' : index === 2 ? '75%' : '68%'}
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={index === 0 ? 87 : index === 1 ? 92 : index === 2 ? 75 : 68}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer mb-3 ${
                  index === 0 ? 'bg-emerald-200' :
                  index === 1 ? 'bg-blue-200' :
                  index === 2 ? 'bg-teal-200' :
                  'bg-orange-200'
                }`}
              />
              <p className="text-sm text-slate-600">
                {index === 0 ? 'Social & Environmental Impact' :
                 index === 1 ? 'Cost-Effectiveness Ratio' :
                 index === 2 ? 'Long-term Viability' :
                 'Community Engagement'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Role Assignment & Access Control Section - Two Column Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Role Assignment Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <i className="text-white text-lg">👥</i>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Role Assignment</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Team Members</span>
              <button 
                type="button" 
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-sm" 
                onClick={addUser}
              >
                + Invite Member
              </button>
            </div>
            
            <div className="space-y-3">
              {(roles || []).map((r, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <input 
                    placeholder="Email" 
                    className="rounded-lg border border-slate-200 px-4 py-3 bg-white/60 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" 
                    value={r.email || ''} 
                    onChange={(e) => updateUser(i, 'email', e.target.value)} 
                  />
                  <select 
                    className="rounded-lg border border-slate-200 px-4 py-3 bg-white/60 backdrop-blur-sm focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" 
                    value={r.role || 'CSR Manager'} 
                    onChange={(e) => updateUser(i, 'role', e.target.value)}
                  >
                    <option>Admin</option>
                    <option>CSR Manager</option>
                    <option>Finance Officer</option>
                  </select>
                  <button 
                    type="button" 
                    className="px-3 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300" 
                    onClick={() => removeUser(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Integration Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <i className="text-white text-lg">🔌</i>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">API Integration Preferences</h3>
          </div>
          
          <div className="space-y-4">
            {INTEGRATIONS.map((integration, index) => (
              <div 
                key={integration}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  (integrations || []).includes(integration)
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-sm'
                    : 'bg-white/60 border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => toggleIntegration(integration)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-blue-600' :
                      index === 1 ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}>
                      <i className="text-white text-sm">
                        {index === 0 ? 'S' : index === 1 ? 'W' : 'M'}
                      </i>
                    </div>
                    <span className="font-medium text-slate-700">{integration}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    (integrations || []).includes(integration)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {(integrations || []).includes(integration) && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Content - Removed */}
    </div>
  )
}


