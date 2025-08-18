export default function ComparisonTable({ rows, columns }) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="text-left p-3">Metric</th>
          {columns.map((c) => (
            <th key={c} className="text-left p-3 text-gray-700">{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.metric} className="odd:bg-gray-50">
            <td className="p-3 font-medium text-gray-900">{r.metric}</td>
            {r.values.map((v, i) => (
              <td key={i} className="p-3">{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}


