import { ProjectCard as ProjectCardType } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

interface ProjectGridProps {
  projects: ProjectCardType[]
  showLastUpdated?: boolean
  emptyMessage?: string
}

export default function ProjectGrid({
  projects,
  showLastUpdated = true,
  emptyMessage = 'No projects found.',
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} showLastUpdated={showLastUpdated} />
      ))}
    </div>
  )
}
