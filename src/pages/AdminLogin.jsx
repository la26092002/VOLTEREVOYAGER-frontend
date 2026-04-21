import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import { adminLogin } from '../services/api'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const validate = () => {
    const e = { email: '', password: '' }
    let valid = true

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address'
      valid = false
    }
    if (!form.password || form.password.length < 6) {
      e.password = 'Password must be at least 6 characters'
      valid = false
    }

    setErrors(e)
    return valid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setApiError('')

    try {
      const res = await adminLogin({ email: form.email, password: form.password })
      // Backend returns: { success, message, token, user: { id, email } }
      const { token, user } = res.data
      if (token) {
        localStorage.setItem('vv_token', token)
        localStorage.setItem('vv_user', JSON.stringify(user))
        navigate('/admin/orders')
      } else {
        setApiError('Login succeeded but no token was received.')
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />

      <div className="relative w-full max-w-md px-4">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-volt-500 flex items-center justify-center shadow-2xl shadow-volt-500/30 animate-glow">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-carbon-950 fill-current">
              <path d="M13 2L4.09 12.97A1 1 0 005 14h7l-1 8 8.91-10.97A1 1 0 0019 10h-7l1-8z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-carbon-100 tracking-wide">
            ADMIN <span className="text-gradient">PANEL</span>
          </h1>
          <p className="text-carbon-500 text-sm mt-2 font-mono">Restricted access • Authorized personnel only</p>
        </div>

        <Card glow>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@volterevoyager.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {apiError && (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-red-400 text-sm">{apiError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full font-semibold tracking-wide mt-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-carbon-700 text-xs font-mono mt-6">
          VoltereVoyager Admin v1.0
        </p>
      </div>
    </div>
  )
}
