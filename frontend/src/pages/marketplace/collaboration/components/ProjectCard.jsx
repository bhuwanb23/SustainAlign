function Badge({ className, children }) {
    return <span className={`px-2 py-1 rounded text-xs ${className}`}>{children}</span>
}

export default function ProjectCard({ category, catClass, rating, title, desc, progress, price, sdgs, org, orgAvatar, location }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer">
            <div className="flex items-center justify-between mb-4">
                <Badge className={`${catClass} px-3 py-1 rounded-full text-sm font-semibold`}>{category}</Badge>
                <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm font-semibold">{rating}</span>
                </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{desc}</p>
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-800">{price}</span>
                <div className="flex space-x-1">
                    {sdgs.map((s)=> (
                        <Badge key={s.text} className={`${s.class}`}>{s.text}</Badge>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={orgAvatar} className="w-8 h-8 rounded-full mr-2"/>
                    <span className="text-sm text-gray-600">{org}</span>
                </div>
                <span className="text-xs text-gray-500">{location}</span>
            </div>
        </div>
    )
}


