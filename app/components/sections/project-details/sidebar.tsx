import { Badge } from '~/components/ui/badge'
import { MetaGroup, type MetaGroupProps } from './meta-group'
import type { CaseStudyMeta } from './types'

export const Sidebar = ({ meta }: { meta: CaseStudyMeta }) => {
  return (
    <aside className="space-y-8 md:px-6 py-12">
      <MetaGroup label="Company" value={meta.company} />
      <MetaGroup label="Period" value={meta.period} />
      <MetaGroup label="Role" value={meta.role} />
      <MetaGroup label="Scope" value={meta.scope} />
      <div>
        <p className="mb-2.5 text-xs uppercase">Stack</p>
        <ul className="flex flex-col gap-1.25">
          {meta.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="p-2.5"
              size="default"
            >
              {tech}
            </Badge>
          ))}
        </ul>
      </div>
    </aside>
  )
}
