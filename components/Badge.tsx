import { ProjectStatus } from '@/lib/projects'

interface BadgeProps {
  status: ProjectStatus
  className?: string
}

const statusColors: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  Alpha: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  'In Dev': {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
  },
  Early: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
  },
  Labs: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
  },
  Paused: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
  },
  Archive: {
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/20',
  },
  Released: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
  },
}

export default function Badge({ status, className = '' }: BadgeProps) {
  const colors = statusColors[status]

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} ${className}`}
      role="status"
      aria-label={`Project status: ${status}`}
    >
      {status}
    </span>
  )
}
