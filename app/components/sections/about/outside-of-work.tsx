import { Markdown } from '~/components/shared/markdown'
import { SectionHeader } from '~/components/shared/section-header'

export const OutsideOfWork = ({
  title,
  description,
}: {
  title: string
  description: string | null
}) => {
  return (
    <section id="experience" className="w-full">
      <SectionHeader label={title} />
      {description && <Markdown className="text-base" content={description} />}
    </section>
  )
}
