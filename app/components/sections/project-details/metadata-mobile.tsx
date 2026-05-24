import { Badge } from '~/components/ui/badge'
import { MetaGroup } from './meta-group'
import type { CaseStudyMeta } from './types'

export const MetadataMobile = ({ meta }: { meta: CaseStudyMeta }) => {
  return (
    <div className="flex flex-col space-y-8 border-t py-8 md:hidden">
      <div className="grid grid-cols-2 gap-4 md:hidden">
        <MetaGroup label="Company" value={meta.company} />
        <MetaGroup label="Period" value={meta.period} />
        <MetaGroup label="Role" value={meta.role} />
        <MetaGroup label="Scope" value={meta.scope} />
      </div>
      <div>
        <p className="mb-2.5 text-sm uppercase">Stack</p>
        <ul className="grid w-full grid-cols-2 gap-1.25">
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
    </div>
  )
}
