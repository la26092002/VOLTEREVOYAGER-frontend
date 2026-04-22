import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import Card from '../components/Card'
import Button from '../components/Button'
import { getLocation } from '../services/api'

// Custom green marker icon
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="40" height="52">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.5)"/>
          </filter>
        </defs>
        <path d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z"
          fill="#22c55e" filter="url(#shadow)"/>
        <circle cx="20" cy="20" r="8" fill="#0a0a0a"/>
        <circle cx="20" cy="20" r="4" fill="#22c55e"/>
      </svg>
    `),
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -54],
})

function FlyTo({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.flyTo(position, map.getZoom(), { duration: 1.2 })
  }, [position, map])
  return null
}

const REFRESH_INTERVAL = 5000

// ─── Search / landing screen ───────────────────────────────────────────────
function TrackingSearch({ onTrack }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const val = input.trim().toUpperCase()
    if (!val) { setError('Please enter a Device ID'); return }
    if (!/^[A-Z0-9\-]{2,20}$/.test(val)) {
      setError('Device ID can only contain letters, numbers and dashes (e.g. BP-001)')
      return
    }
    setError('')
    onTrack(val)
  }

  const examples = ['BP-001', 'BP-021', 'VV-042', 'VV-007']

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative w-full max-w-lg px-4">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-volt-500/10 border border-volt-500/30 flex items-center justify-center animate-float">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-volt-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-3xl border border-volt-500/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-3">Live GPS</p>
          <h1 className="font-display text-5xl sm:text-6xl text-carbon-100 tracking-wide mb-3">
            TRACK YOUR <span className="text-gradient">DEVICE</span>
          </h1>
          <p className="text-carbon-400 text-sm leading-relaxed">
            Enter the Device ID printed on your WattVoyager backpack to view its real-time location.
          </p>
        </div>

        {/* Form */}
        <Card glow className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-medium text-carbon-400 uppercase tracking-widest">
                Device ID <span className="text-volt-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-carbon-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value.toUpperCase())
                    if (error) setError('')
                  }}
                  placeholder="e.g. BP-001"
                  className={`input-dark pl-10 font-mono tracking-widest text-base ${
                    error ? 'border-red-500/70 focus:border-red-500' : ''
                  }`}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              {error && (
                <p className="text-xs text-red-400 font-mono">{error}</p>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full font-semibold tracking-wide">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Track Device
            </Button>
          </form>
        </Card>

        {/* Quick examples */}
        <div className="text-center">
          <p className="text-carbon-600 text-xs font-mono uppercase tracking-wider mb-3">Quick examples</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setError('') }}
                className="px-3 py-1.5 bg-carbon-900/60 border border-carbon-700 hover:border-volt-500/40 hover:text-volt-400 text-carbon-400 text-xs font-mono rounded-lg transition-all duration-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Live map screen ────────────────────────────────────────────────────────
function TrackingMap({ deviceId, onReset }) {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000)
  const [fetchCount, setFetchCount] = useState(0)
  const locationRef = useRef(null)

  const fetchLocation = useCallback(async () => {
    try {
      const res = await getLocation(deviceId)
      const data = res.data?.data || res.data
      const loc = {
        lat:      parseFloat(data.latitude),
        lng:      parseFloat(data.longitude),
        timestamp: data.timestamp,
        deviceId: data.deviceId || deviceId,
      }
      setLocation(loc)
      locationRef.current = loc
      setLastUpdated(new Date())
      setError('')
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`No location found for device "${deviceId}". Make sure the device has submitted a location.`)
      } else {
        setError(err.response?.data?.message || 'Could not reach the server. Check your backend is running.')
      }
    } finally {
      setLoading(false)
      setFetchCount((c) => c + 1)
    }
  }, [deviceId])

  useEffect(() => { fetchLocation() }, [fetchLocation])
  useEffect(() => {
    const interval = setInterval(fetchLocation, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchLocation])
  useEffect(() => {
    setCountdown(REFRESH_INTERVAL / 1000)
    const timer = setInterval(() => setCountdown((c) => (c <= 1 ? REFRESH_INTERVAL / 1000 : c - 1)), 1000)
    return () => clearInterval(timer)
  }, [fetchCount])

  const position = location ? [location.lat, location.lng] : null

  const formatTime = (date) => date
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—'

  const formatCoord = (val) =>
    val === undefined || val === null ? '—' : parseFloat(val).toFixed(6)

  return (
    <div className="min-h-screen pt-20 pb-8 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-1">Live GPS Tracking</p>
            <h1 className="font-display text-4xl sm:text-5xl text-carbon-100 tracking-wide">
              DEVICE <span className="text-gradient">{deviceId}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className="flex items-center gap-2 px-4 py-2 bg-carbon-900/60 border border-carbon-800 rounded-xl">
              <span className={`w-2 h-2 rounded-full ${
                loading ? 'bg-yellow-500 animate-pulse'
                : error   ? 'bg-red-500'
                           : 'bg-volt-500 animate-pulse'
              }`} />
              <span className="text-xs font-mono text-carbon-400">
                {loading ? 'Connecting…' : error ? 'Error' : 'Live'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={fetchLocation} disabled={loading}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh
            </Button>
            {/* Track another device */}
            <Button variant="ghost" size="sm" onClick={onReset}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="hidden sm:inline">Track Another</span>
            </Button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={onReset} className="text-xs text-red-400/60 hover:text-red-300 font-mono underline mt-1 transition-colors">
                Try a different device ID
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-carbon-800 shadow-2xl" style={{ height: '480px' }}>
              {loading && !location ? (
                <div className="w-full h-full bg-carbon-900 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-volt-500 border-t-transparent animate-spin" />
                  <p className="text-carbon-500 font-mono text-sm">Acquiring GPS signal for <span className="text-volt-400">{deviceId}</span>…</p>
                </div>
              ) : position ? (
                <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <FlyTo position={position} />
                  <Marker position={position} icon={customIcon}>
                    <Popup>
                      <div className="font-body text-sm">
                        <strong className="text-volt-400">WattVoyager</strong>
                        <br />
                        <span className="text-xs font-mono text-carbon-400">{deviceId}</span>
                        <br />
                        <span className="text-xs font-mono">
                          {formatCoord(location.lat)}, {formatCoord(location.lng)}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="w-full h-full bg-carbon-900 flex flex-col items-center justify-center gap-3">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-carbon-700" fill="none" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-carbon-500 font-mono text-sm">No location data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            {/* Device badge */}
            <div className="flex items-center gap-3 px-4 py-3 bg-volt-500/10 border border-volt-500/20 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-volt-500/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-volt-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-carbon-500 font-mono uppercase tracking-widest">Tracking</p>
                <p className="text-volt-400 font-mono font-medium tracking-widest">{deviceId}</p>
              </div>
            </div>

            {/* Coordinates */}
            <Card glow>
              <h3 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-4">Coordinates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-carbon-400 text-sm">Latitude</span>
                  <span className="font-mono text-sm text-carbon-100">{formatCoord(location?.lat)}</span>
                </div>
                <div className="w-full h-px bg-carbon-800" />
                <div className="flex items-center justify-between">
                  <span className="text-carbon-400 text-sm">Longitude</span>
                  <span className="font-mono text-sm text-carbon-100">{formatCoord(location?.lng)}</span>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card>
              <h3 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-carbon-400 text-sm">Last Update</span>
                  <span className="font-mono text-xs text-carbon-100">{formatTime(lastUpdated)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-carbon-400 text-sm">Next Refresh</span>
                  <span className="font-mono text-sm text-volt-400">{countdown}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-carbon-400 text-sm">Signal</span>
                  <div className="flex items-end gap-0.5">
                    {[1, 2, 3, 4].map((bar) => (
                      <div key={bar} className={`w-1.5 rounded-sm ${bar <= (error ? 1 : 3) ? (error ? 'bg-red-500' : 'bg-volt-500') : 'bg-carbon-700'}`}
                        style={{ height: `${bar * 4 + 4}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Refresh progress */}
            <Card>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-carbon-500">Auto-Refresh</h3>
                <span className="text-xs font-mono text-volt-400">{countdown}s</span>
              </div>
              <div className="w-full h-1 bg-carbon-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-volt-500 rounded-full transition-all duration-1000"
                  style={{ width: `${((REFRESH_INTERVAL / 1000 - countdown) / (REFRESH_INTERVAL / 1000)) * 100}%` }}
                />
              </div>
              <p className="text-carbon-700 text-xs font-mono mt-1.5">Polling every 5 seconds</p>
            </Card>

            {/* GPS timestamp */}
            {location?.timestamp && (
              <Card>
                <h3 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-2">GPS Timestamp</h3>
                <p className="font-mono text-xs text-carbon-400 break-all leading-relaxed">{location.timestamp}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page controller ────────────────────────────────────────────────────────
export default function Tracking() {
  const { id } = useParams()
  const navigate = useNavigate()

  // If URL has a real device id (not "demo"), skip the search screen
  const initialDevice = id && id !== 'demo' ? id.toUpperCase() : null
  const [activeDevice, setActiveDevice] = useState(initialDevice)

  const handleTrack = (deviceId) => {
    setActiveDevice(deviceId)
    navigate(`/track/${deviceId}`, { replace: true })
  }

  const handleReset = () => {
    setActiveDevice(null)
    navigate('/track/demo', { replace: true })
  }

  if (!activeDevice) {
    return <TrackingSearch onTrack={handleTrack} />
  }

  return <TrackingMap deviceId={activeDevice} onReset={handleReset} />
}
