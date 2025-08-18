import CompanyForm from './components/CompanyForm.jsx'
import useCompanyDetails from './hooks/useCompanyDetails.js'

export default function CompanyDetailsPage() {
  const { company, sectors, goals, setCompany, save } = useCompanyDetails()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">Company Details</h1>
        <p className="text-gray-600 mt-1">Input CSR budgets, sector focus, and ESG targets.</p>
      </header>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <CompanyForm company={company} sectors={sectors} goals={goals} onChange={setCompany} onSave={save} />
      </div>
    </div>
  )
}


