import { SectionHeader } from '~/components/shared/section-header'
import { Button } from '~/components/ui/button'
import type { LinkItem } from '~/lib/types'

export const Links = ({
  title,
  links,
}: {
  title: string
  links: LinkItem[] | null
}) => {
  return (
    <section id="experience" className="w-full">
      <SectionHeader label={title} />
      <div className="flex items-center gap-4">
        {links?.map((link) => (
          <Button
            key={link.label}
            variant="link"
            className="px-0 text-base"
            render={
              <a
                href={link.href ? link.href : undefined}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            {link.label}
          </Button>
        ))}
      </div>
    </section>
  )
}
