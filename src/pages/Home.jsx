import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-1.5a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 14.25v1.5A2.25 2.25 0 003.75 18z" />
      </svg>
    ),
    title: 'Portable Power',
    description: '1000Wh lithium battery pack with dual AC outlets, USB-C PD, and wireless charging. Powers laptops, drones, cameras, and more.',
    stat: '1000Wh',
    statLabel: 'Capacity',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'GPS Tracking',
    description: 'Military-grade GPS module with satellite lock in under 10 seconds. Track your pack in real time from anywhere on the planet.',
    stat: '<10s',
    statLabel: 'Lock Time',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Multi-Device Charging',
    description: '6 simultaneous outputs including 100W USB-C, 65W USB-A, and standard AC. Charge a full studio setup on a single pack.',
    stat: '6×',
    statLabel: 'Outputs',
  },
]

const specs = [
  { label: 'Weight', value: '4.2 kg' },
  { label: 'Battery', value: 'LiFePO4' },
  { label: 'Recharge', value: '1.5h Solar' },
  { label: 'Temp Range', value: '-20°C to 60°C' },
  { label: 'IP Rating', value: 'IP67' },
  { label: 'Warranty', value: '3 Years' },
]

export default function Home() {
  const [counter, setCounter] = useState(0)
  const targetCount = 847

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const increment = targetCount / 60
      const interval = setInterval(() => {
        start += increment
        if (start >= targetCount) {
          setCounter(targetCount)
          clearInterval(interval)
        } else {
          setCounter(Math.floor(start))
        }
      }, 16)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-grid-pattern bg-grid">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-volt-500 to-transparent transform rotate-12 origin-top-right scale-x-[50]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-volt-500/10 border border-volt-500/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-500 animate-pulse" />
                <span className="text-volt-400 text-xs font-mono tracking-wider uppercase">Now available worldwide</span>
              </div>

              <h1 className="font-display leading-none mb-6">
                <span className="block text-7xl sm:text-8xl lg:text-9xl text-carbon-100 tracking-wide">
                  WATT
                </span>
                <span className="block text-7xl sm:text-8xl lg:text-9xl text-gradient tracking-wide">
                  VOYAGER
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-body font-light text-carbon-300 mb-3 tracking-wide">
                Smart Energy Anywhere
              </p>

              <p className="text-carbon-400 text-base leading-relaxed mb-10 max-w-lg">
                The world's first backpack with an integrated smart power station and real-time GPS tracking. Built for explorers, filmmakers, and off-grid professionals.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/order">
                  <Button variant="primary" size="lg" className="font-semibold tracking-wide">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Order Now
                  </Button>
                </Link>
                <Link to="/track/demo">
                  <Button variant="outline" size="lg">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Track Demo
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-6">
                <div>
                  <p className="font-display text-3xl text-volt-400">{counter}+</p>
                  <p className="text-xs text-carbon-500 font-mono uppercase tracking-wider mt-0.5">Units Sold</p>
                </div>
                <div className="w-px h-10 bg-carbon-800" />
                <div>
                  <p className="font-display text-3xl text-volt-400">4.9★</p>
                  <p className="text-xs text-carbon-500 font-mono uppercase tracking-wider mt-0.5">Avg Rating</p>
                </div>
                <div className="w-px h-10 bg-carbon-800" />
                <div>
                  <p className="font-display text-3xl text-volt-400">72h</p>
                  <p className="text-xs text-carbon-500 font-mono uppercase tracking-wider mt-0.5">Battery Life</p>
                </div>
              </div>
            </div>

            {/* Right: Product illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 animate-float">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border border-volt-500/20 animate-pulse-slow" />
                <div className="absolute inset-4 rounded-full border border-volt-500/10" />

                {/* Product card */}
                <div className="absolute inset-8 bg-carbon-900/80 backdrop-blur rounded-3xl border border-carbon-700/60 border-glow flex flex-col items-center justify-center p-6 shadow-2xl">
                  <div className="w-16 h-16 bg-volt-500/15 rounded-2xl flex items-center justify-center mb-4 border border-volt-500/30">
                    <svg viewBox="0 0 24 24" className="w-9 h-9 text-volt-400 fill-current">
                      <path d="M13 2L4.09 12.97A1 1 0 005 14h7l-1 8 8.91-10.97A1 1 0 0019 10h-7l1-8z" />
                    </svg>
                  </div>
                  <p className="font-display text-2xl text-carbon-100 tracking-widest text-center">WATT</p>
                  <p className="font-display text-2xl text-volt-400 tracking-widest text-center">VOYAGER</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                    <div className="bg-carbon-800/60 rounded-xl p-2 text-center">
                      <p className="text-volt-400 font-mono text-sm font-medium">1000W</p>
                      <p className="text-carbon-600 text-xs">Power</p>
                    </div>
                    <div className="bg-carbon-800/60 rounded-xl p-2 text-center">
                      <p className="text-volt-400 font-mono text-sm font-medium">GPS</p>
                      <p className="text-carbon-600 text-xs">Live Track</p>
                    </div>
                  </div>
                </div>

                {/* Orbiting dot */}
                <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-volt-500 shadow-lg shadow-volt-500/60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-xs font-mono text-carbon-500 uppercase tracking-widest">Scroll</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-carbon-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">What makes it special</p>
            <h2 className="font-display text-5xl sm:text-6xl text-carbon-100 tracking-wide">
              CORE <span className="text-gradient">FEATURES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="group hover:border-volt-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-volt-500/10 border border-volt-500/20 flex items-center justify-center text-volt-400 group-hover:bg-volt-500/20 transition-colors duration-300">
                    {f.icon}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-volt-400">{f.stat}</p>
                    <p className="text-xs text-carbon-500 font-mono">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-body font-semibold text-carbon-100 text-lg mb-3">{f.title}</h3>
                <p className="text-carbon-400 text-sm leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-carbon-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">Under the hood</p>
            <h2 className="font-display text-5xl sm:text-6xl text-carbon-100 tracking-wide">
              TECH <span className="text-gradient">SPECS</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specs.map((s, i) => (
              <div key={i} className="bg-carbon-900/60 border border-carbon-800 rounded-xl p-4 text-center hover:border-volt-500/30 transition-colors duration-200">
                <p className="font-mono text-volt-400 text-base font-medium mb-1">{s.value}</p>
                <p className="text-carbon-500 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-5xl sm:text-7xl text-carbon-100 tracking-wide mb-6">
            POWER YOUR <span className="text-gradient">ADVENTURE</span>
          </h2>
          <p className="text-carbon-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of explorers who trust WattVoyager to keep them connected, powered, and tracked — no matter where they go.
          </p>
          <Link to="/order">
            <Button variant="primary" size="xl" className="font-semibold tracking-wide shadow-xl shadow-volt-500/25">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Order Now — $899
            </Button>
          </Link>
          <p className="mt-4 text-carbon-600 text-sm font-mono">Free worldwide shipping • 30-day returns</p>
        </div>
      </section>
    </div>
  )
}
