export default function WizardActions({ step, back, next, canProceed, onFinish }) {
  const isLast = step === 4
  const isNewCorporateUser = localStorage.getItem('newCorporateUser') === 'true'
  
  return (
    <div className="flex items-center justify-between mt-4">
      <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700" onClick={back} disabled={step === 1}>Back</button>
      {isLast ? (
        <button 
          className={`px-6 py-3 rounded-lg font-medium ${canProceed ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} 
          onClick={onFinish} 
          disabled={!canProceed}
        >
          {isNewCorporateUser ? 'Complete & Access Platform' : 'Finish'}
        </button>
      ) : (
        <button 
          className={`px-6 py-3 rounded-lg font-medium ${canProceed ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} 
          onClick={next} 
          disabled={!canProceed}
        >
          Next
        </button>
      )}
    </div>
  )
}


