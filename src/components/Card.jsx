export default function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`card-dark p-6 ${glow ? 'border-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
