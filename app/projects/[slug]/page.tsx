import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import Badge from '@/components/Badge'
import Pill from '@/components/Pill'
import { genPageMetadata } from 'app/seo'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return genPageMetadata({
    title: `${project.title} - ${project.subtitle || 'Project'}`,
    description: project.blurb,
  })
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const {
    title,
    subtitle,
    blurb,
    status,
    platform,
    stack,
    hero,
    link_demo,
    link_code,
    link_devlog,
    last_updated,
  } = project

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Header */}
        <div className="space-y-4 pt-6 pb-8 md:space-y-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge status={status} />
            <Pill label={platform} />
            {stack.split(' · ').map((tech, idx) => (
              <Pill key={idx} label={tech} variant="subtle" />
            ))}
          </div>

          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{blurb}</p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {link_demo && (
              <Link
                href={link_demo}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                View Demo
              </Link>
            )}
            {link_code && (
              <Link
                href={link_code}
                className="focus:ring-primary-500 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                View Code
              </Link>
            )}
            {link_devlog && (
              <Link
                href={link_devlog}
                className="focus:ring-primary-500 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Read Devlog
              </Link>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {hero && (
          <div className="py-8">
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src={hero}
                alt={`${title} screenshot`}
                width={1200}
                height={675}
                className="w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="py-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>About</h2>
            <p>{blurb}</p>

            <h2>Technology Stack</h2>
            <ul>
              {stack.split(' · ').map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>

            <h2>Platform</h2>
            <p>{platform}</p>

            {last_updated && (
              <>
                <h2>Last Updated</h2>
                <p>
                  {new Date(last_updated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 pb-8">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            &larr; Back to all projects
          </Link>
        </div>
      </div>
    </>
  )
}
