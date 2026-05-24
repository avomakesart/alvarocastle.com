import { Markdown } from '~/components/shared/markdown'
import { SectionHeader } from '~/components/shared/section-header'

export const WayOfWorking = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  return (
    <section id="experience" className="w-full">
      <SectionHeader label={title} />
      <div className="flex flex-col items-start gap-4 text-base">
        {description && <Markdown content={description} />}
      </div>
    </section>
  )
}
