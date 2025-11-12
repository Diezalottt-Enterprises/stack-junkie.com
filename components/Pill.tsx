interface PillProps {
  label: string
  variant?: 'default' | 'subtle'
  className?: string
}

export default function Pill({ label, variant = 'default', className = '' }: PillProps) {
  const baseClasses = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium'

  const variantClasses = {
    default: 'bg-white/10 text-gray-300 border border-white/10',
    subtle: 'bg-white/5 text-gray-400 border border-white/5',
  }

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{label}</span>
}
