function BidCard({ avatar, name, subtitle, status, amount, delta, border }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 card-hover ${border}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img src={avatar} alt="Corporate" className="w-12 h-12 rounded-lg" />
                    <div>
                        <h4 className="font-semibold text-gray-800">{name}</h4>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </div>
                <span className={`${status.bg} text-white px-3 py-1 rounded-full text-sm`}>{status.label}</span>
            </div>
            <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">{status.context}</p>
                <div className="flex items-center justify-between">
                    <span className={`${status.text} text-lg font-bold`}>{amount}</span>
                    <span className="text-sm text-green-600">{delta}</span>
                </div>
            </div>
            <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">Accept</button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">Negotiate</button>
            </div>
        </div>
    )
}

export default function Bids() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Corporate Bids & Offers</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">+ New Bid</button>
            </div>
            <BidCard avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" name="TechCorp Solutions" subtitle="Environmental Focus" status={{ bg:'bg-blue-500', label:'Active Bid', text:'text-blue-600', context:'Interested in Clean Water Initiative'}} amount="$85,000" delta="+13% above asking" border="border-l-4 border-blue-500" />
            <BidCard avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" name="EcoVentures Ltd" subtitle="Sustainability Leader" status={{ bg:'bg-purple-500', label:'Pending', text:'text-purple-600', context:'Interested in Solar Energy Project'}} amount="$220,000" delta="+10% above asking" border="border-l-4 border-purple-500" />
        </div>
    )
}


