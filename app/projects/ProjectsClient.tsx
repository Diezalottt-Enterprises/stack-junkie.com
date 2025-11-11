'use client'

import { useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/lib/projects'
import ProjectGrid from '@/components/ProjectGrid'
import StatusFilter from '@/components/StatusFilter'

interface ProjectsClientProps {
  projects: ProjectCard[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status')

  const filteredProjects = statusFilter
    ? projects.filter((p) => p.status === statusFilter)
    : projects.filter((p) => p.category !== 'Archive')

  return (
    <>
      <StatusFilter />
      <ProjectGrid
        projects={filteredProjects}
        emptyMessage="No projects match your filter criteria."
      />
    </>
  )
}
