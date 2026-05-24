import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { SectionHeader } from '~/components/shared/section-header'
import { Button } from '~/components/ui/button'

interface WorkEntry {
  title: string
  slug: string
  company: string
  date: string | null
  lead: string
}

interface WorkProps {
  sectionTitle?: string | null
  allWorkLabel?: string | null
  allWorkUrl?: string | null
  entries?: WorkEntry[]
}

export const Work = ({ data }: { data: WorkProps }) => {
  return (
    <section id="work" className="w-full">
      <SectionHeader
        label={data.sectionTitle ?? ''}
        renderAction={
          <Button
            variant="link"
            className="lowercase"
            render={<Link to={data.allWorkUrl ?? ''} />}
          >
            {data.allWorkLabel} <ArrowRight className="size-4" />
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {data.entries?.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ company, date, title, lead, slug }: WorkEntry) {
  const { lang } = useParams()
  return (
    <Link
      to={`/${lang}/work/${slug}`}
      className="flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors hover:bg-accent/50"
      prefetch="intent"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div>{company}</div>
        {'-'}
        <div>{date}</div>
      </div>
      <div className="text-lg font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{lead}</div>
    </Link>
  )
}
