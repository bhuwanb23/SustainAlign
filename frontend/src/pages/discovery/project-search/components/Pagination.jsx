export default function Pagination() {
  return (
    <div className="flex justify:center mt-8">
      <nav className="flex space-x-2">
        <button className="px-4 py-2 text-gray-500 bg-white rounded-lg border border-gray-200">Previous</button>
        <button className="px-4 py-2 text-white bg-emerald-700 rounded-lg">1</button>
        <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">2</button>
        <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">3</button>
        <button className="px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">Next</button>
      </nav>
    </div>
  )
}


