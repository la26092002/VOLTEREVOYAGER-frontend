import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Re-check auth on every route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('vv_token'))
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('vv_token')
    localStorage.removeItem('vv_user')
    setIsLoggedIn(false)
    navigate('/admin')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/order', label: 'Order' },
    ...(isLoggedIn
      ? [{ to: '/admin/orders', label: 'Orders' }]
      : [{ to: '/admin', label: 'Admin' }]),
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-carbon-950/90 backdrop-blur-md border-b border-carbon-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-volt-500 flex items-center justify-center shadow-lg shadow-volt-500/30 group-hover:shadow-volt-400/50 transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-carbon-950 fill-current">
                <path d="M13 2L4.09 12.97A1 1 0 005 14h7l-1 8 8.91-10.97A1 1 0 0019 10h-7l1-8z" />
              </svg>
            </div>
            <span className="font-display text-xl tracking-wider text-carbon-100 group-hover:text-volt-400 transition-colors">
              WATT<span className="text-volt-500">VOYAGER</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-volt-400 bg-volt-500/10'
                    : 'text-carbon-400 hover:text-carbon-100 hover:bg-carbon-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 border border-carbon-700 hover:border-red-500/50 text-carbon-400 hover:text-red-400 text-sm font-medium rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/order"
                className="ml-2 px-4 py-2 bg-volt-500 hover:bg-volt-400 text-carbon-950 text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-volt-500/20 hover:-translate-y-0.5"
              >
                Order Now
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 text-carbon-300 hover:text-volt-400 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-carbon-800/60 py-4 space-y-1 bg-carbon-950/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-volt-400 bg-volt-500/10'
                    : 'text-carbon-300 hover:text-carbon-100 hover:bg-carbon-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/order"
                className="block mx-4 mt-3 px-4 py-2.5 bg-volt-500 text-carbon-950 text-sm font-semibold rounded-lg text-center"
              >
                Order Now
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
