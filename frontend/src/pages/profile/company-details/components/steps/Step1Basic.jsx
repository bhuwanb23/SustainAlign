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
          <i className="text-green-500 mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
              <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
            </svg>
          </i>
          Company Logo & Branding (upload)
        </h2>
        <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300">
          <div className="flex flex-col items-center">
            <i className="text-4xl text-green-500 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 640 512">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
              </svg>
            </i>
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
          <i className="text-green-500 mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
              <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
            </svg>
          </i>
          Company Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="relative">
              <input 
                type="text" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={companyName || ''} 
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                Company Name
              </label>
              <i className="absolute right-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
                </svg>
              </i>
            </div>

            {/* Corporate ID / Registration Number */}
            <div className="relative">
              <input 
                type="text" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={registrationId || ''} 
                onChange={(e) => setRegistrationId(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                Corporate ID / Registration Number
              </label>
              <i className="absolute right-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
                  <path d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/>
                </svg>
              </i>
            </div>

            {/* Industry / Sector */}
            <div className="relative">
              <select 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white appearance-none"
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
              <i className="absolute right-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
                  <path d="M64 32C46.3 32 32 46.3 32 64V304v48 80c0 26.5 21.5 48 48 48H496c26.5 0 48-21.5 48-48V304 152.2c0-18.2-19.4-29.7-35.4-21.1L352 215.4V152.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4V64c0-17.7-14.3-32-32-32H64z"/>
                </svg>
              </i>
            </div>

            {/* Website / CSR Microsite */}
            <div className="relative">
              <input 
                type="url" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={website || ''} 
                onChange={(e) => setWebsite(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                Website / CSR Microsite
              </label>
              <i className="absolute right-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50.2-50.2-129.8-56.5-189.3-18.9L344 111.8c-4.7-2.4-9.7-3.6-14.7-3.6c-18.2 0-33.1 14.9-33.1 33.1v381.8c0 18.2 14.9 33.1 33.1 33.1c5 0 10-1.2 14.7-3.6l46.5-23.3c59.5 37.7 139.1 31.4 189.3-18.9c56.5-56.5 56.5-148 0-204.5zM194.1 286.2L89.6 381.7c-25.4 25.4-66.8 25.4-92.2 0s-25.4-66.8 0-92.2L101.9 194c37.4-37.4 98.1-37.4 135.5 0s37.4 98.1 0 135.5z"/>
                </svg>
              </i>
            </div>
          </div>
          {right}
        </div>

        {/* HQ Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">HQ Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input 
                type="text" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqCountry || ''} 
                onChange={(e) => setHqCountry(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                Country
              </label>
              <i className="absolute right-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/>
                </svg>
              </i>
            </div>
            <div className="relative">
              <input 
                type="text" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqState || ''} 
                onChange={(e) => setHqState(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                State
              </label>
            </div>
            <div className="relative">
              <input 
                type="text" 
                className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
                value={hqCity || ''} 
                onChange={(e) => setHqCity(e.target.value)}
                placeholder=" "
              />
              <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
                City
              </label>
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
                <div className="relative">
                  <input 
                    placeholder="Country" 
                    className="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
                    value={b.country || ''} 
                    onChange={(e) => updateBranch(i, 'country', e.target.value)} 
                  />
                </div>
                <div className="relative">
                  <input 
                    placeholder="State" 
                    className="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
                    value={b.state || ''} 
                    onChange={(e) => updateBranch(i, 'state', e.target.value)} 
                  />
                </div>
                <div className="relative">
                  <input 
                    placeholder="City" 
                    className="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white" 
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
          <i className="text-green-500 mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 512">
              <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
            </svg>
          </i>
          CSR Contact Person
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* CSR Contact Name */}
          <div className="relative">
            <input 
              type="text" 
              className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrContactName || ''} 
              onChange={(e) => setCsrContactName(e.target.value)}
              placeholder=" "
            />
            <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
              Full Name
            </label>
            <i className="absolute right-4 top-4 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
              </svg>
            </i>
          </div>

          {/* CSR Contact Role */}
          <div className="relative">
            <input 
              type="text" 
              className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrContactRole || ''} 
              onChange={(e) => setCsrContactRole(e.target.value)}
              placeholder=" "
            />
            <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
              Designation
            </label>
            <i className="absolute right-4 top-4 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"/>
              </svg>
            </i>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Official CSR Email */}
          <div className="relative">
            <input 
              type="email" 
              className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrEmail || ''} 
              onChange={(e) => setCsrEmail(e.target.value)}
              placeholder=" "
            />
            <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
              Official CSR Email
            </label>
            <i className="absolute right-4 top-4 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
            </i>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <input 
              type="tel" 
              className="input-focus w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-all duration-300 bg-white"
              value={csrPhone || ''} 
              onChange={(e) => setCsrPhone(e.target.value)}
              placeholder=" "
            />
            <label className="floating-label absolute left-4 top-4 text-gray-500 pointer-events-none transition-all duration-300">
              Phone Number
            </label>
            <i className="absolute right-4 top-4 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
              </svg>
            </i>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 222, 128, 0.15);
        }
        
        .floating-label {
          transition: all 0.2s ease;
        }
        
        .input-focus:focus + .floating-label,
        .input-focus:not(:placeholder-shown) + .floating-label {
          transform: translateY(-20px) scale(0.85);
          color: #059669;
        }
        
        .input-focus:not(:placeholder-shown) {
          border-color: #10b981;
        }
      `}</style>
    </div>
  )
}


