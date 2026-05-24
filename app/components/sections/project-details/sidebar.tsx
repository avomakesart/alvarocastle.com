import { Badge } from '~/components/ui/badge'
import { MetaGroup, type MetaGroupProps } from './meta-group'
import type { CaseStudyMeta } from './types'

export const Sidebar = ({ meta }: { meta: CaseStudyMeta }) => {
  return (
    <aside className="hidden space-y-8 py-12 md:block md:px-6">
      <MetaGroup label="Company" value={meta.company} />
      <MetaGroup label="Period" value={meta.period} />
      <MetaGroup label="Role" value={meta.role} />
      <MetaGroup label="Scope" value={meta.scope} />
      <div>
        <p className="mb-2.5 text-sm uppercase">Stack</p>
        <ul className="flex flex-col gap-1.25">
          {meta.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="p-2.5 text-sm"
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
