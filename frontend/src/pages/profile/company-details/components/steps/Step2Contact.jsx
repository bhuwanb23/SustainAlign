export default function Step2Contact({
  csrContactName, setCsrContactName,
  csrContactRole, setCsrContactRole,
  csrEmail, setCsrEmail,
  csrPhone, setCsrPhone,
  website, setWebsite,
  right,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Contact & Communication</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">CSR Contact Person</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={csrContactName} onChange={(e) => setCsrContactName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Designation</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={csrContactRole} onChange={(e) => setCsrContactRole(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Official CSR Email</label>
            <input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2" value={csrEmail} onChange={(e) => setCsrEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={csrPhone} onChange={(e) => setCsrPhone(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Website / CSR Microsite</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        {right}
      </div>
    </div>
  )
}


