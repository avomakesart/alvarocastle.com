import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Badge } from '~/components/ui/badge'
import type { Project } from '~/lib/types'

interface ProjectType extends Omit<
  Project,
  'name' | 'description' | 'href' | 'period'
> {
  title: string
  lead: string
  slug: string
  date: string | null
}

export const Projects = ({ projects }: { projects: ProjectType[] }) => {
  return (
    <section id="projects" className="w-full">
      <ul className="flex flex-col border-t border-[--border]">
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </ul>
    </section>
  )
}
function ProjectRow({ project }: { project: ProjectType }) {
  const { tag, company, date, title, lead, stack, slug } = project
  const params = useParams()
  const isClickable = Boolean(slug)

  const inner = (
    <div className="group grid items-start gap-6 border-b px-8 py-7 transition-colors hover:bg-accent md:grid-cols-[180px_1fr_auto]">
      <div className="flex items-start justify-between">
        <div className="pt-1">
          <p className="mb-1 text-xs tracking-widest uppercase">{tag}</p>
          <p className="text-xs">{company}</p>
          <p className="mt-1 text-xs">{date}</p>
        </div>
        <div className="pt-1.5">
          {isClickable ? (
            <span className="inline-block text-base transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-foreground md:hidden">
              <ArrowUpRight className="size-5" />
            </span>
          ) : (
            <Badge size="default" variant="outline" className="p-2.5">
              Soon
            </Badge>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-2.5 font-heading text-2xl">{title}</h2>
        <p className="mb-4 max-w-130 text-sm">{lead}</p>
        <ul className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <li key={tech}>
              <Badge size="default" variant="outline" className="p-2.5">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-1.5">
        {isClickable ? (
          <span className="hidden text-base transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-foreground md:inline-block">
            <ArrowUpRight className="size-5" />
          </span>
        ) : (
          <Badge size="default" variant="outline" className="p-2.5">
            Soon
          </Badge>
        )}
      </div>
    </div>
  )

  return (
    <li>
      {isClickable ? (
        <Link
          to={slug ? `/${params.lang}/work/${slug}` : ''}
          className="block no-underline"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </li>
  )
}
