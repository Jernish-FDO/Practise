import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from '@store/themeStore'
import Navbar from '@components/Navbar'
import AnimatedBackground from '@components/AnimatedBackground'
import Home from '@pages/Home'
import About from '@pages/About'
import Projects from '@pages/Projects'
import Skills from '@pages/Skills'
import Contact from '@pages/Contact'

function App() {
  const { theme } = useThemeStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
        <div className="text-center">
          <div className="spinner mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-primary mb-2">INITIALIZING</h2>
          <p className="text-text-muted">Loading portfolio assets...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App