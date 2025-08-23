export default function Stepper({ step, goTo, mode = 'form' }) {
  const steps = [
    {
      label: 'Company & Contact',
      title: 'Company & Contact Information',
      description: 'Basic company details and CSR contact information'
    },
    {
      label: 'Budget',
      title: 'CSR Budget & Allocation',
      description: 'Set your CSR budget and allocate across focus areas'
    },
    {
      label: 'Focus & Compliance',
      title: 'CSR/ESG Strategy & Compliance',
      description: 'Define focus areas, SDGs, and upload compliance documents'
    },
    {
      label: 'AI & Access',
      title: 'AI Optimization & Access Control',
      description: 'Configure AI settings and manage user access'
    }
  ]

  // Don't render stepper in showcase mode
  if (mode === 'showcase') {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CSR Strategy Builder</h1>
        <p className="text-gray-600">Build comprehensive CSR/ESG strategies for your companies</p>
      </div>

      {/* Step Progress */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {steps.map((stepInfo, idx) => {
          const s = idx + 1
          const active = step === s
          const done = step > s
          return (
            <button 
              key={stepInfo.label} 
              onClick={() => goTo(s)} 
              className={`h-2 rounded-full transition-all ${done ? 'bg-emerald-500' : active ? 'bg-emerald-400' : 'bg-gray-200'}`} 
              title={`${s}. ${stepInfo.label}`} 
            />
          )
        })}
      </div>

      {/* Step Information */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">Step {step} of {steps.length}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm font-medium text-emerald-600">{steps[step - 1]?.label}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[step - 1]?.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{steps[step - 1]?.description}</p>
      </div>
    </div>
  )
}


