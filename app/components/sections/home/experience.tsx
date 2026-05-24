import { CodeIcon } from 'lucide-react'
import { Fragment } from 'react'
import { SectionHeader } from '~/components/shared/section-header'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'

interface ExperienceItem {
  company: string
  role: string
  logoUrl?: string
  dateRange: string
}

interface ExperienceProps {
  sectionTitle?: string | null
  experiences?: ExperienceItem[]
}

export const Experience = ({ sectionTitle, experiences }: ExperienceProps) => {
  return (
    <section id="experience" className="w-full">
      <SectionHeader label={sectionTitle ?? ''} />
      <div className="flex flex-col items-start gap-4">
        {experiences?.map((item, index) => (
          <Fragment key={item.company}>
            <ExperienceItem key={index} {...item} />
            <Separator className="last:hidden" />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

function ExperienceItem({ company, role, logoUrl, dateRange }: ExperienceItem) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${company} logo`}
              className={cn('size-6 h-auto dark:invert', {
                'invert dark:invert-0': company === 'bol',
              })}
            />
          ) : (
            <CodeIcon className="size-6" />
          )}
          <div>
            <div className="text-sm font-medium">
              {Array.isArray(company) ? company.join(' / ') : company}
            </div>
            <div className="max-w-96 text-sm text-muted-foreground md:max-w-full">
              {role}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{dateRange}</div>
      </div>
    </div>
  )
}
