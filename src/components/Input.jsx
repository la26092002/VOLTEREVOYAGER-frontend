export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-mono font-medium text-carbon-400 uppercase tracking-widest">
          {label}
          {required && <span className="text-volt-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-dark ${error ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 font-mono mt-0.5">{error}</p>
      )}
    </div>
  )
}
