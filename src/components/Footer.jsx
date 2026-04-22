import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-carbon-800/60 bg-carbon-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-volt-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-carbon-950 fill-current">
                  <path d="M13 2L4.09 12.97A1 1 0 005 14h7l-1 8 8.91-10.97A1 1 0 0019 10h-7l1-8z" />
                </svg>
              </div>
              <span className="font-display text-lg tracking-wider text-carbon-100">
                WATT<span className="text-volt-500">VOYAGER</span>
              </span>
            </div>
            <p className="text-carbon-500 text-sm leading-relaxed">
              Smart energy solutions for adventurers, nomads, and creators. Power everything, anywhere.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/order', 'Place Order'], ['/admin', 'Admin Panel']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-carbon-400 hover:text-volt-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-4">Specs</h4>
            <ul className="space-y-2 text-sm text-carbon-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-500 flex-shrink-0" />
                1000Wh Capacity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-500 flex-shrink-0" />
                Real-time GPS
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-500 flex-shrink-0" />
                6 Output Ports
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-volt-500 flex-shrink-0" />
                Solar Compatible
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-carbon-800/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-carbon-600 text-xs font-mono">
            © 2024 WattVoyager. All rights reserved.
          </p>
          <p className="text-carbon-700 text-xs font-mono">
            Smart Energy Anywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
