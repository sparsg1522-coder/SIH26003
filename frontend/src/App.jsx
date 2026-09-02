import { useState } from 'react'
import './App.css'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import RemindersPage from './pages/RemindersPage'
import VoiceAssistantPage from './pages/VoiceAssistantPage'
import CaregiverDashboardPage from './pages/CaregiverDashboardPage'
import ProfilePage from './pages/ProfilePage'

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'games', label: 'Games', icon: '🧩' },
  { id: 'reminders', label: 'Reminders', icon: '⏰' },
  { id: 'voice', label: 'Voice', icon: '🎙️' },
  { id: 'caregiver', label: 'Caregiver', icon: '👩‍⚕️' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

function App() {
  const [activeView, setActiveView] = useState('home')

  const renderPage = () => {
    switch (activeView) {
      case 'games':
        return <GamesPage onNavigate={setActiveView} />
      case 'reminders':
        return <RemindersPage onNavigate={setActiveView} />
      case 'voice':
        return <VoiceAssistantPage onNavigate={setActiveView} />
      case 'caregiver':
        return <CaregiverDashboardPage onNavigate={setActiveView} />
      case 'profile':
        return <ProfilePage onNavigate={setActiveView} />
      case 'home':
      default:
        return <HomePage onNavigate={setActiveView} />
    }
  }

  return (
    <AppShell navItems={navItems} activeView={activeView} onNavigate={setActiveView}>
      {renderPage()}
    </AppShell>
  )
}

export default App
