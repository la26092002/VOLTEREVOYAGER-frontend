import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import { placeOrder } from '../services/api'

const initialForm = {
  fullName: '',
  phone: '',
  address: '',
  quantity: '1',
}

const initialErrors = {
  fullName: '',
  phone: '',
  address: '',
  quantity: '',
}

export default function Order() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const e = { ...initialErrors }
    let valid = true

    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      e.fullName = 'Full name must be at least 3 characters'
      valid = false
    }

    if (!form.phone.trim() || !/^[+\d\s\-()]{7,20}$/.test(form.phone.trim())) {
      e.phone = 'Enter a valid phone number'
      valid = false
    }

    if (!form.address.trim() || form.address.trim().length < 10) {
      e.address = 'Address must be at least 10 characters'
      valid = false
    }

    const qty = parseInt(form.quantity, 10)
    if (isNaN(qty) || qty < 1 || qty > 99) {
      e.quantity = 'Quantity must be between 1 and 99'
      valid = false
    }

    setErrors(e)
    return valid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setApiError('')

    try {
      await placeOrder({
        fullName: form.fullName.trim(),
        phone:    form.phone.trim(),
        address:  form.address.trim(),
        quantity: parseInt(form.quantity, 10),
      })
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      const msg = err.response?.data?.message || 'Order submission failed. Please try again.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  const unitPrice = 899
  const total = unitPrice * (parseInt(form.quantity, 10) || 1)

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-volt-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">Ready to power up?</p>
          <h1 className="font-display text-5xl sm:text-6xl text-carbon-100 tracking-wide">
            PLACE YOUR <span className="text-gradient">ORDER</span>
          </h1>
          <p className="mt-4 text-carbon-400 text-sm">Free worldwide shipping • Ships in 3–5 business days</p>
        </div>

        {success ? (
          <Card glow className="text-center py-12">
            <div className="w-16 h-16 bg-volt-500/20 border border-volt-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-volt-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl text-carbon-100 tracking-wide mb-3">ORDER CONFIRMED!</h2>
            <p className="text-carbon-400 text-sm leading-relaxed max-w-sm mx-auto">
              Your VoltereVoyager is on its way. You'll receive a confirmation email with tracking information shortly.
            </p>
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => setSuccess(false)}
            >
              Place Another Order
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <h2 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-6">Shipping Details</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-medium text-carbon-400 uppercase tracking-widest">
                    Address <span className="text-volt-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    placeholder="123 Main Street, City, Country"
                    value={form.address}
                    onChange={handleChange}
                    className={`input-dark resize-none ${errors.address ? 'border-red-500/70 focus:border-red-500' : ''}`}
                  />
                  {errors.address && <p className="text-xs text-red-400 font-mono">{errors.address}</p>}
                </div>
                <Input
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="1"
                  value={form.quantity}
                  onChange={handleChange}
                  error={errors.quantity}
                  min="1"
                  max="99"
                  required
                />

                {/* Order Summary */}
                <div className="bg-carbon-900/60 border border-carbon-800 rounded-xl p-4 space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-carbon-500 mb-3">Order Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-carbon-400">VoltereVoyager × {parseInt(form.quantity, 10) || 1}</span>
                    <span className="text-carbon-200 font-mono">${(unitPrice * (parseInt(form.quantity, 10) || 1)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-carbon-400">Shipping</span>
                    <span className="text-volt-400 font-mono text-sm">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-carbon-800 flex justify-between">
                    <span className="text-carbon-200 font-medium">Total</span>
                    <span className="text-volt-400 font-mono font-medium">${total.toLocaleString()}</span>
                  </div>
                </div>

                {apiError && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-red-400 text-sm">{apiError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full font-semibold tracking-wide"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Confirm Order
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
