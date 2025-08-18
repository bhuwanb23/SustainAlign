const ICON_MAP = {
  'dollar-sign': '💲',
  'leaf': '🍃',
  'diagram-project': '📊',
  'globe': '🌐',
  'water': '💧',
  'graduation-cap': '🎓',
  'solar-panel': '🔆',
  'plus': '➕',
  'file-lines': '📄',
  'calendar': '📅',
  'triangle-exclamation': '⚠️',
  'clock': '⏰',
  'chart-line': '📈',
  'folder-open': '📂',
  'wallet': '👛',
  'shield-halved': '🛡️',
  'chart-pie': '🥧',
}

export default function Icon({ name, className }) {
  return <span className={className}>{ICON_MAP[name] || '•'}</span>
}


