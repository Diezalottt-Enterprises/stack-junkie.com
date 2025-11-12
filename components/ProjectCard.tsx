'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectCard as ProjectCardType } from '@/lib/projects'
import Badge from '@/components/Badge'
import Pill from '@/components/Pill'

interface ProjectCardProps extends ProjectCardType {
  showLastUpdated?: boolean
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  blurb,
  status,
  platform,
  stack,
  hero,
  link_overview,
  link_demo,
  link_code,
  link_devlog,
  last_updated,
  showLastUpdated = true,
}: ProjectCardProps) {
  const router = useRouter()
  const mainLink = link_overview || `/projects/${slug}`

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a CTA button
    const target = e.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      return
    }
    router.push(mainLink)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(mainLink)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group focus:ring-primary-500 cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 shadow-lg transition-all duration-200 hover:border-white/20 hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
      aria-label={`${title} - ${subtitle || blurb}`}
    >
      {/* Header: Status Badge + Pills */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge status={status} />
        <Pill label={platform} variant="subtle" />
        {stack.split(' · ').map((tech, idx) => (
          <Pill key={idx} label={tech} variant="subtle" />
        ))}
      </div>

      {/* Title & Subtitle */}
      <div className="mb-3">
        <h3 className="group-hover:text-primary-400 text-xl font-bold tracking-tight text-gray-100 transition-colors">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>

      {/* Blurb */}
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{blurb}</p>

      {/* Hero Image Placeholder */}
      {hero && (
        <div className="mb-4 overflow-hidden rounded-lg border border-white/5 bg-white/5">
          <Image
            src={hero}
            alt={`${title} preview`}
            width={544}
            height={306}
            className="h-48 w-full object-cover object-center"
          />
        </div>
      )}

      {/* CTA Buttons */}
      <div className="mb-3 flex flex-wrap gap-2">
        {link_overview && (
          <Link
            href={link_overview}
            className="hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 focus:ring-primary-500 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all focus:ring-2 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            Overview
          </Link>
        )}
        {link_demo && (
          <Link
            href={link_demo}
            className="hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 focus:ring-primary-500 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all focus:ring-2 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            Demo
          </Link>
        )}
        {link_code && (
          <Link
            href={link_code}
            className="hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 focus:ring-primary-500 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all focus:ring-2 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            Code
          </Link>
        )}
        {link_devlog && (
          <Link
            href={link_devlog}
            className="hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 focus:ring-primary-500 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all focus:ring-2 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            Devlog
          </Link>
        )}
      </div>

      {/* Last Updated */}
      {showLastUpdated && last_updated && (
        <div className="text-xs text-gray-500">
          Updated{' '}
          {new Date(last_updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )}
    </div>
  )
}
