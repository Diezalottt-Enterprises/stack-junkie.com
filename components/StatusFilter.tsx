'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ProjectStatus } from '@/lib/projects'

const statusOptions: (ProjectStatus | 'All')[] = [
  'All',
  'Released',
  'Alpha',
  'In Dev',
  'Early',
  'Labs',
  'Paused',
  'Archive',
]

const statusColors: Record<ProjectStatus | 'All', string> = {
  All: 'border-gray-600 text-gray-300 hover:border-gray-500',
  Alpha: 'border-amber-500/30 text-amber-400 hover:border-amber-500',
  'In Dev': 'border-cyan-500/30 text-cyan-400 hover:border-cyan-500',
  Early: 'border-violet-500/30 text-violet-400 hover:border-violet-500',
  Labs: 'border-pink-500/30 text-pink-400 hover:border-pink-500',
  Paused: 'border-orange-500/30 text-orange-400 hover:border-orange-500',
  Archive: 'border-slate-500/30 text-slate-400 hover:border-slate-500',
  Released: 'border-green-500/30 text-green-400 hover:border-green-500',
}

const activeStatusColors: Record<ProjectStatus | 'All', string> = {
  All: 'border-gray-500 bg-gray-500/10',
  Alpha: 'border-amber-500 bg-amber-500/10',
  'In Dev': 'border-cyan-500 bg-cyan-500/10',
  Early: 'border-violet-500 bg-violet-500/10',
  Labs: 'border-pink-500 bg-pink-500/10',
  Paused: 'border-orange-500 bg-orange-500/10',
  Archive: 'border-slate-500 bg-slate-500/10',
  Released: 'border-green-500 bg-green-500/10',
}

export default function StatusFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'All'

  const handleStatusChange = (status: ProjectStatus | 'All') => {
    const params = new URLSearchParams(searchParams.toString())

    if (status === 'All') {
      params.delete('status')
    } else {
      params.set('status', status)
    }

    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname

    router.push(url)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => {
          const isActive = currentStatus === status
          const baseColors = statusColors[status]
          const activeColors = activeStatusColors[status]

          return (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950 ${
                isActive ? activeColors : `${baseColors} bg-transparent`
              }`}
              aria-pressed={isActive}
              aria-label={`Filter by ${status}`}
            >
              {status}
            </button>
          )
        })}
      </div>
    </div>
  )
}
