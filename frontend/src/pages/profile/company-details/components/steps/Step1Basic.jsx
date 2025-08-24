export default function Step1Basic({
  companyName = '', setCompanyName,
  logoFile = null, setLogoFile,
  registrationId = '', setRegistrationId,
  industry = '', setIndustry,
  hqCountry = '', setHqCountry,
  hqState = '', setHqState,
  hqCity = '', setHqCity,
  branches = [], setBranches,
  csrContactName = '', setCsrContactName,
  csrContactRole = '', setCsrContactRole,
  csrEmail = '', setCsrEmail,
  csrPhone = '', setCsrPhone,
  website = '', setWebsite,
  right,
}) {
  const addBranch = () => setBranches([...branches, { country: '', state: '', city: '' }])
  const updateBranch = (i, key, val) => setBranches(branches.map((b, idx) => idx === i ? { ...b, [key]: val } : b))
  const removeBranch = (i) => setBranches(branches.filter((_, idx) => idx !== i))

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
      {/* Company Logo Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-green-500 mr-3">🏢</span>
          Company Logo & Branding (upload)
        </h2>
        <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300">
          <div className="flex flex-col items-center">
            <span className="text-4xl text-green-500 mb-4">📁</span>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Drag & Drop your logo here</h3>
            <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="hidden"
              id="logo-upload"
            />
            <label 
              htmlFor="logo-upload"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-green-500 mr-3">🏢</span>
          Company Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={companyName || ''} 
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            {/* Corporate ID / Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Corporate ID / Registration Number
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={registrationId || ''} 
                onChange={(e) => setRegistrationId(e.target.value)}
                placeholder="Enter registration number"
              />
            </div>

            {/* Industry / Sector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry / Sector
              </label>
              <select 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white appearance-none"
                value={industry || ''} 
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select Industry / Sector</option>
                <option value="technology">IT / Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="energy">Energy & Utilities</option>
                <option value="agriculture">Agriculture</option>
                <option value="telecom">Telecommunications</option>
                <option value="automotive">Automotive</option>
                <option value="construction">Construction</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Website / CSR Microsite */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website / CSR Microsite
              </label>
              <input 
                type="url" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={website || ''} 
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          {right}
        </div>

        {/* HQ Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">HQ Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqCountry || ''} 
                onChange={(e) => setHqCountry(e.target.value)}
                placeholder="Enter country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqState || ''} 
                onChange={(e) => setHqState(e.target.value)}
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqCity || ''} 
                onChange={(e) => setHqCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>
          </div>
        </div>

        {/* Branch Locations (optional) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Branch Locations (optional)</h3>
            <button 
              type="button" 
              className="text-emerald-700 text-sm hover:text-emerald-800 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-50" 
              onClick={addBranch}
            >
              + Add Branch
            </button>
          </div>
          <div className="space-y-4">
            {(branches || []).map((b, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <input 
                    placeholder="Country" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
                    value={b.country || ''} 
                    onChange={(e) => updateBranch(i, 'country', e.target.value)} 
                  />
                </div>
                <div>
                  <input 
                    placeholder="State" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
                    value={b.state || ''} 
                    onChange={(e) => updateBranch(i, 'state', e.target.value)} 
                  />
                </div>
                <div>
                  <input 
                    placeholder="City" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
                    value={b.city || ''} 
                    onChange={(e) => updateBranch(i, 'city', e.target.value)} 
                  />
                </div>
                <button 
                  type="button" 
                  className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50" 
                  onClick={() => removeBranch(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSR Contact Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="text-green-500 mr-3">👤</span>
          CSR Contact Person
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* CSR Contact Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrContactName || ''} 
              onChange={(e) => setCsrContactName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          {/* CSR Contact Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrContactRole || ''} 
              onChange={(e) => setCsrContactRole(e.target.value)}
              placeholder="Enter designation"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Official CSR Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Official CSR Email
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrEmail || ''} 
              onChange={(e) => setCsrEmail(e.target.value)}
              placeholder="email@company.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrPhone || ''} 
              onChange={(e) => setCsrPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


