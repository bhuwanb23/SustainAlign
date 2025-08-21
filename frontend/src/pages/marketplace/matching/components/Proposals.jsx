function ProposalCard({ theme, icon, title, org, matchPct, price, sdgs, desc, border }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 card-hover ${border}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${theme} rounded-lg flex items-center justify-center`}>
                        <span className="text-xl">{icon}</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{title}</h4>
                        <p className="text-sm text-gray-500">{org}</p>
                    </div>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">{matchPct}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{desc}</p>
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">{price}</span>
                <div className="flex space-x-2">
                    {sdgs.map((s)=> (
                        <span key={s} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{s}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Proposals() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">NGO Project Proposals</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">12 Active</span>
            </div>
            <ProposalCard theme="bg-green-100" icon="🌿" title="Clean Water Initiative" org="GreenEarth Foundation" matchPct="✅ 94% Match" price="$75,000" sdgs={["SDG 6","SDG 3"]} desc="Providing clean water access to 5,000 rural families through sustainable filtration systems." border="border-l-4 border-green-500" />
            <ProposalCard theme="bg-yellow-100" icon="🎓" title="Digital Education Program" org="EduTech Alliance" matchPct="⚠️ 67% Match" price="$120,000" sdgs={["SDG 4","SDG 9"]} desc="Bridging the digital divide by providing tablets and internet access to underserved schools." border="border-l-4 border-yellow-500" />
            <ProposalCard theme="bg-green-100" icon="🔆" title="Solar Energy for Communities" org="Renewable Future Org" matchPct="✅ 89% Match" price="$200,000" sdgs={["SDG 7","SDG 13"]} desc="Installing solar panels in 20 rural communities to provide sustainable electricity." border="border-l-4 border-green-500" />
        </div>
    )
}


