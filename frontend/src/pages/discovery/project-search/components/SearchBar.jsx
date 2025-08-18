export default function SearchBar({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow p-3 border border-gray-100 flex items-center gap-3">
      <span>🔎</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, NGOs, SDGs..."
        className="flex-1 outline-none"
      />
    </div>
  )
}


