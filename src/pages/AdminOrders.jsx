import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { getAllOrders } from '../services/api'

export default function AdminOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('vv_user') || '{}') }
    catch { return {} }
  })()

  const handleLogout = () => {
    localStorage.removeItem('vv_token')
    localStorage.removeItem('vv_user')
    navigate('/admin')
  }

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllOrders()
      // Backend: { success, data: [ ...orders ] }
      setOrders(res.data?.data || [])
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin')
      } else {
        setError(err.response?.data?.message || 'Failed to load orders.')
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem('vv_token')
    if (!token) { navigate('/admin'); return }
    fetchOrders()
  }, [fetchOrders, navigate])

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase()
    return (
      o.fullName?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.address?.toLowerCase().includes(q) ||
      String(o.id).includes(q)
    )
  })

  const totalUnits = orders.reduce((sum, o) => sum + (o.quantity || 0), 0)
  const totalRevenue = totalUnits * 899

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleString([], {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen pt-20 pb-12 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-1">Admin Panel</p>
            <h1 className="font-display text-4xl sm:text-5xl text-carbon-100 tracking-wide">
              ORDERS <span className="text-gradient">DASHBOARD</span>
            </h1>
            <p className="text-carbon-500 text-sm font-mono mt-1">
              Signed in as <span className="text-volt-400">{user?.email || 'admin'}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: '📦', color: 'text-volt-400' },
            { label: 'Units Sold', value: totalUnits, icon: '🎒', color: 'text-volt-400' },
            { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: '💰', color: 'text-volt-400' },
            { label: 'Latest Order', value: orders[0] ? formatDate(orders[0].createdAt).split(',')[0] : '—', icon: '🕐', color: 'text-carbon-300' },
          ].map((s, i) => (
            <Card key={i} className="hover:border-volt-500/20 transition-colors">
              <p className="text-xl mb-2">{s.icon}</p>
              <p className={`font-display text-2xl tracking-wide ${s.color}`}>{s.value}</p>
              <p className="text-carbon-500 text-xs font-mono uppercase tracking-wider mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-carbon-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, phone, address or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-10"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Table */}
        <Card className="overflow-hidden p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-volt-500 border-t-transparent animate-spin" />
              <p className="text-carbon-500 font-mono text-sm">Loading orders…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-carbon-700" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <p className="text-carbon-500 font-mono text-sm">
                {search ? 'No orders match your search' : 'No orders yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-carbon-800">
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-carbon-500">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-carbon-500">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-carbon-500">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-carbon-500 hidden lg:table-cell">Address</th>
                    <th className="px-6 py-4 text-center text-xs font-mono uppercase tracking-widest text-carbon-500">Qty</th>
                    <th className="px-6 py-4 text-right text-xs font-mono uppercase tracking-widest text-carbon-500">Total</th>
                    <th className="px-6 py-4 text-right text-xs font-mono uppercase tracking-widest text-carbon-500 hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, idx) => (
                    <tr
                      key={order.id}
                      className={`border-b border-carbon-800/50 hover:bg-carbon-800/30 transition-colors ${idx % 2 === 0 ? '' : 'bg-carbon-900/20'}`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-carbon-400 bg-carbon-800 px-2 py-0.5 rounded">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-carbon-100 font-medium">{order.fullName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-carbon-400 text-xs">{order.phone}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-carbon-400 text-xs max-w-[200px] truncate block" title={order.address}>
                          {order.address}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-volt-500/10 border border-volt-500/20 text-volt-400 font-mono text-xs font-medium">
                          {order.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-volt-400 text-sm font-medium">
                          ${(order.quantity * 899).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right hidden md:table-cell">
                        <span className="text-carbon-500 text-xs font-mono">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {filtered.length > 0 && (
          <p className="text-carbon-600 text-xs font-mono mt-3 text-right">
            Showing {filtered.length} of {orders.length} orders
          </p>
        )}

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm">← Back to Site</Button>
          </Link>
          <Link to="/order">
            <Button variant="outline" size="sm">New Order</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
