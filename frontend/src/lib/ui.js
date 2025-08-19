// Tailwind-only width helper: maps percentage to a known set of classes (0-100 in 5% steps)
const WIDTH_CLASS_MAP = {
  0: 'w-[0%]', 5: 'w-[5%]', 10: 'w-[10%]', 15: 'w-[15%]', 20: 'w-[20%]', 25: 'w-[25%]', 30: 'w-[30%]',
  35: 'w-[35%]', 40: 'w-[40%]', 45: 'w-[45%]', 50: 'w-[50%]', 55: 'w-[55%]', 60: 'w-[60%]', 65: 'w-[65%]',
  70: 'w-[70%]', 75: 'w-[75%]', 80: 'w-[80%]', 85: 'w-[85%]', 90: 'w-[90%]', 95: 'w-[95%]', 100: 'w-[100%]'
}

// Ensure Tailwind JIT sees these classes
// eslint-disable-next-line no-unused-vars
const __allWidthClasses = [
  'w-[0%]','w-[5%]','w-[10%]','w-[15%]','w-[20%]','w-[25%]','w-[30%]','w-[35%]','w-[40%]','w-[45%]',
  'w-[50%]','w-[55%]','w-[60%]','w-[65%]','w-[70%]','w-[75%]','w-[80%]','w-[85%]','w-[90%]','w-[95%]','w-[100%]'
]

export function widthClassFromPercent(percent) {
  const n = Math.max(0, Math.min(100, Math.round(Number(percent))))
  const step = Math.round(n / 5) * 5
  const clampedStep = Math.max(0, Math.min(100, step))
  return WIDTH_CLASS_MAP[clampedStep] || 'w-[0%]'
}


