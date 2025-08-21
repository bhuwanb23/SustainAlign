export default function WizardActions({ step, back, next, canProceed, onFinish }) {
  const isLast = step === 8
  return (
    <div className="flex items-center justify-between mt-4">
      <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700" onClick={back} disabled={step === 1}>Back</button>
      {isLast ? (
        <button className={`px-4 py-2 rounded-lg ${canProceed ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} onClick={onFinish} disabled={!canProceed}>Finish</button>
      ) : (
        <button className={`px-4 py-2 rounded-lg ${canProceed ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} onClick={next} disabled={!canProceed}>Next</button>
      )}
    </div>
  )
}


