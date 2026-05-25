import { Link } from 'react-router'
import { SectionHeader } from '~/components/shared/section-header'
import { Badge } from '~/components/ui/badge'
import { type StackItem } from '~/lib/types'

export const Stack = ({
  title,
  stack,
}: {
  title: string
  stack: {
    label: string | null
    technologies: string[]
  }[]
}) => {
  return (
    <section id="experience" className="w-full">
      <SectionHeader label={title} />
      <div className="grid gap-4 md:grid-cols-2">
        {stack?.map((stackData) => (
          <StackItem
            key={stackData.label}
            title={stackData.label}
            technologies={stackData.technologies}
          />
        ))}
      </div>
    </section>
  )
}

function StackItem({ title, technologies }: Partial<StackItem>) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-medium text-sm text-blue-500 uppercase">
          {title}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies?.map((tech) => (
          <Badge key={tech} variant="secondary" size="lg">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  )
}
