export default function Step5Compliance({ policyFiles, setPolicyFiles, reportFiles, setReportFiles, certFiles, setCertFiles, spendHistory, setSpendHistory }) {
  const onUpload = (setter) => (e) => setter(Array.from(e.target.files || []))
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Compliance & History</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">CSR/ESG Policy Document Upload</label>
          <input type="file" multiple onChange={onUpload(setPolicyFiles)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Past CSR Reports Upload</label>
          <input type="file" multiple onChange={onUpload(setReportFiles)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Compliance Certificates</label>
          <input type="file" multiple onChange={onUpload(setCertFiles)} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">CSR Spend History</label>
          <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2" value={spendHistory} onChange={(e) => setSpendHistory(e.target.value)} placeholder="Attach file or write summary" />
        </div>
      </div>
    </div>
  )
}


