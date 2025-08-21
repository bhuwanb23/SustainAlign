import Header from './components/Header.jsx'
import HeroSpotlight from './components/HeroSpotlight.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import ProjectGrid from './components/ProjectGrid.jsx'

export default function CollaborationToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
      <Header />
      <HeroSpotlight />

      <section className="py-2">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterPanel />
          <ProjectGrid />
        </div>
      </section>
    </div>
  )
}


