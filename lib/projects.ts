import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export type ProjectStatus =
  | 'Released'
  | 'Alpha'
  | 'In Dev'
  | 'Early'
  | 'Labs'
  | 'Paused'
  | 'Archive'

export type ProjectCategory = 'Featured' | 'Projects' | 'Labs' | 'Archive' | 'Tooling' | 'Site'

export interface ProjectCard {
  slug: string
  title: string
  subtitle?: string
  blurb: string
  status: ProjectStatus
  category: ProjectCategory
  platform: string
  stack: string
  hero?: string
  link_overview?: string
  link_demo?: string
  link_code?: string
  link_devlog?: string
  last_updated?: string
  order?: number
}

export function getAllProjects(): ProjectCard[] {
  const projectsPath = path.join(process.cwd(), 'data', 'projects.yaml')
  const fileContents = fs.readFileSync(projectsPath, 'utf8')
  const projects = yaml.load(fileContents) as ProjectCard[]
  return projects
}

export function getProjectBySlug(slug: string): ProjectCard | undefined {
  const projects = getAllProjects()
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(category: ProjectCategory): ProjectCard[] {
  const projects = getAllProjects()
  return projects.filter((project) => project.category === category)
}

export function getProjectsByStatus(status: ProjectStatus): ProjectCard[] {
  const projects = getAllProjects()
  return projects.filter((project) => project.status === status)
}

export function getFeaturedProjects(): ProjectCard[] {
  const projects = getProjectsByCategory('Featured')
  return projects.sort((a, b) => (a.order || 999) - (b.order || 999))
}

export function getStatusColor(status: ProjectStatus): string {
  const colors: Record<ProjectStatus, string> = {
    Alpha: 'amber',
    'In Dev': 'cyan',
    Early: 'violet',
    Labs: 'pink',
    Paused: 'orange',
    Archive: 'slate',
    Released: 'green',
  }
  return colors[status] || 'gray'
}
