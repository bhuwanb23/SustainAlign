export default function Stepper({ step, goTo }) {
  const steps = [
    'Basic Info',
    'Contacts',
    'Budget',
    'Focus Areas',
    'Compliance',
    'NGO Prefs',
    'AI Inputs',
    'Access',
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="grid grid-cols-8 gap-2">
        {steps.map((label, idx) => {
          const s = idx + 1
          const active = step === s
          const done = step > s
          return (
            <button key={label} onClick={() => goTo(s)} className={`h-2 rounded-full ${done ? 'bg-emerald-500' : active ? 'bg-emerald-400' : 'bg-gray-200'}`} title={`${s}. ${label}`} />
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>Step {step} of 8</span>
        <span>{steps[step - 1]}</span>
      </div>
    </div>
  )
}


