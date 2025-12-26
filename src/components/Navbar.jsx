import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react'
import { useThemeStore, usePortfolioStore } from '@store/themeStore'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()
  const { isMenuOpen, toggleMenu, closeMenu } = usePortfolioStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location, closeMenu])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
  ]

  const themes = [
    { name: 'dark', label: 'Dark' },
    { name: 'cyberpunk', label: 'Cyberpunk' },
    { name: 'ocean', label: 'Ocean' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/40 border-b border-green-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-glow-lg hover:scale-105 transition-transform"
          >
            <Code2 className="w-8 h-8" />
            <span className="hidden sm:inline">Jernish</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-light hover:text-primary'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-2 h-0.5 bg-gradient-to-r from-primary to-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Switcher & Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <div className="hidden sm:flex gap-2 bg-black/30 border border-green-500/20 rounded-lg p-1">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  title={`Switch to ${t.label} theme`}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    theme === t.name
                      ? 'bg-green-500 text-black'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-green-500/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? 'bg-green-500/20 text-primary border border-green-500/50'
                        : 'text-light hover:bg-green-500/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Theme Switcher */}
              <div className="mt-4 flex flex-wrap gap-2">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name)
                      closeMenu()
                    }}
                    className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-all ${
                      theme === t.name
                        ? 'bg-green-500 text-black'
                        : 'bg-black/30 border border-green-500/20 text-gray-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
