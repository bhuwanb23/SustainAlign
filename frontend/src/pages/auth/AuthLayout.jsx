import { useEffect, useRef } from 'react'

export default function AuthLayout({ title, subtitle, children, footer }) {
  const layoutRef = useRef(null)
  const floatingElementsRef = useRef(null)

  useEffect(() => {
    // Add animation classes after component mounts
    const timer = setTimeout(() => {
      const floatingBgs = document.querySelectorAll('.floating-bg')
      const headerElements = document.querySelectorAll('.header-element')
      const mainContent = document.querySelectorAll('.main-content')
      const featureItems = document.querySelectorAll('.feature-item')
      
      // Animate floating backgrounds
      floatingBgs.forEach((bg, index) => {
        setTimeout(() => {
          bg.classList.add('animate-float')
        }, index * 1000)
      })
      
      // Animate header elements
      headerElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-in')
        }, index * 200)
      })
      
      // Animate main content
      setTimeout(() => {
        mainContent.forEach(element => {
          element.classList.add('animate-in')
        })
      }, 400)
      
      // Animate feature items
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-in')
        }, index * 150)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={layoutRef} className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-white to-emerald-100 sa-animated-bg">
      <div ref={floatingElementsRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="floating-bg absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div className="floating-bg absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-teal-200/40 blur-3xl"></div>
        <div className="floating-bg absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-200/30 blur-2xl"></div>
      </div>

      <header className="px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="header-element flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">SustainAlign</span>
          </a>
          <div className="hidden md:flex items-center text-sm text-gray-600 space-x-6 header-element">
            <span className="inline-flex items-center"><span className="mr-2">🛡️</span>Compliance-ready</span>
            <span className="inline-flex items-center"><span className="mr-2">♻️</span>CSR focused</span>
          </div>
        </div>
      </header>

      <main className="px-6 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:block main-content">
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-100 p-8 shadow-sm">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">Trusted by responsible organizations</div>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-gray-600 text-lg">
                  {subtitle}
                </p>
              )}
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="feature-item flex items-start"><span className="mr-3">✅</span><span>Role-based access for corporates, NGOs, and regulators</span></li>
                <li className="feature-item flex items-start"><span className="mr-3">🔒</span><span>Strong security for sensitive CSR/ESG data</span></li>
                <li className="feature-item flex items-start"><span className="mr-3">📈</span><span>Insights aligned to sustainability outcomes</span></li>
              </ul>
            </div>
          </div>

          <div className="main-content">
            <div className="mx-auto w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl shadow-emerald-100/40 p-8">
              {children}
            </div>
            {footer && (
              <div className="mx-auto w-full max-w-md text-center text-sm text-gray-600 mt-4">
                {footer}
              </div>
            )}
          </div>
                 </div>
       </main>
     </div>
   )
 }


