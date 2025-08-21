import ProjectCard from './ProjectCard.jsx'

const projects = [
    {
        category: '🌱 Climate', catClass: 'bg-green-100 text-green-800', rating: '4.8',
        title: 'Solar Energy for Schools', desc: 'Install solar panels in 25 rural schools to provide sustainable energy',
        progress: 65, price: '$150,000',
        sdgs: [{ text: 'SDG 7', class: 'bg-blue-100 text-blue-800 rounded' }, { text: 'SDG 13', class: 'bg-green-100 text-green-800 rounded' }],
        org: 'GreenFuture NGO', orgAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', location: 'Kenya'
    },
    {
        category: '💧 Water', catClass: 'bg-blue-100 text-blue-800', rating: '4.9',
        title: 'Well Construction Project', desc: 'Build 15 water wells in drought-affected communities',
        progress: 40, price: '$200,000',
        sdgs: [{ text: 'SDG 6', class: 'bg-blue-100 text-blue-800 rounded' }, { text: 'SDG 3', class: 'bg-purple-100 text-purple-800 rounded' }],
        org: 'WaterAid Global', orgAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', location: 'Ethiopia'
    },
    {
        category: '📚 Education', catClass: 'bg-purple-100 text-purple-800', rating: '4.7',
        title: 'Girls Education Initiative', desc: 'Provide scholarships and resources for 500 girls',
        progress: 80, price: '$125,000',
        sdgs: [{ text: 'SDG 4', class: 'bg-purple-100 text-purple-800 rounded' }, { text: 'SDG 5', class: 'bg-pink-100 text-pink-800 rounded' }],
        org: 'EduEmpower', orgAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg', location: 'Bangladesh'
    },
    {
        category: '🌱 Climate', catClass: 'bg-green-100 text-green-800', rating: '4.5',
        title: 'Ocean Cleanup Initiative', desc: 'Remove plastic waste from coastal areas',
        progress: 55, price: '$175,000',
        sdgs: [{ text: 'SDG 14', class: 'bg-blue-100 text-blue-800 rounded' }, { text: 'SDG 13', class: 'bg-green-100 text-green-800 rounded' }],
        org: 'OceanSave', orgAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg', location: 'Philippines'
    }
]

export default function ProjectGrid() {
    return (
        <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Available Projects</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{projects.length} projects found</span>
                    <select className="p-2 border border-gray-200 rounded-lg">
                        <option>Sort by Impact</option>
                        <option>Sort by Budget</option>
                        <option>Sort by Rating</option>
                    </select>
                </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <ProjectCard key={p.title} {...p} />
                ))}
            </div>
        </main>
    )
}


