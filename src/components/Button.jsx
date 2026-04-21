export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-volt-500/40 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-volt-500 hover:bg-volt-400 text-carbon-950 shadow-lg shadow-volt-500/20 hover:shadow-volt-400/30 hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border border-volt-500/50 text-volt-400 hover:bg-volt-500/10 hover:border-volt-400',
    ghost:
      'text-carbon-300 hover:text-volt-400 hover:bg-carbon-800/50',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing…
        </>
      ) : (
        children
      )}
    </button>
  )
}
