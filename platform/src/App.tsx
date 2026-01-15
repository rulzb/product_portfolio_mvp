import { useState } from 'react'
import { LoginView } from './views/LoginView'
import { SetupView } from './views/SetupView'
import { PortfolioView } from './views/PortfolioView'
import { DashboardView } from './views/DashboardView'
import { Monitor } from 'lucide-react'

// Simple Router State using Enums for MVP clarity
type ViewState = 'login' | 'setup' | 'portfolio' | 'dashboard'

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('login')
  const [activeProject, setActiveProject] = useState<string>("Plataforma Web")

  // Mock Navigation logic
  const navigate = (view: ViewState) => {
    setCurrentView(view)
  }

  // Render Logic
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView onLogin={() => navigate('setup')} />
      case 'setup':
        return <SetupView onComplete={() => navigate('portfolio')} />
      case 'portfolio':
        return <PortfolioView onNavigate={(view, project) => {
          if (project) setActiveProject(project)
          navigate(view)
        }} />
      case 'dashboard':
        return (
          <DashboardView
            project={activeProject}
            onBack={() => navigate('portfolio')}
          />
        )
      default:
        return <div>View not found</div>
    }
  }

  return (
    <>
      {renderView()}

      {/* Dev Controls (Hidden in production ideally) */}
      <div className="fixed bottom-4 right-4 z-50 group">
        <button className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Monitor className="w-5 h-5" />
        </button>
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-2 hidden group-hover:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Dev Navigation</p>
          <button onClick={() => navigate('login')} className="w-full text-left text-xs px-2 py-1.5 hover:bg-gray-100 rounded text-gray-700">1. Login</button>
          <button onClick={() => navigate('setup')} className="w-full text-left text-xs px-2 py-1.5 hover:bg-gray-100 rounded text-gray-700">2. Setup Wizard</button>
          <button onClick={() => navigate('portfolio')} className="w-full text-left text-xs px-2 py-1.5 hover:bg-gray-100 rounded text-gray-700">3. Portfolio</button>
          <button onClick={() => navigate('dashboard')} className="w-full text-left text-xs px-2 py-1.5 hover:bg-gray-100 rounded text-gray-700">4. Dashboard</button>
        </div>
      </div>
    </>
  )
}

export default App
