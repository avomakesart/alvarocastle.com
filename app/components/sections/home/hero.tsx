import { Fragment } from 'react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import type { GenericHeroProps } from '~/lib/types'

export interface HeroProps extends Omit<GenericHeroProps, 'image' | 'tag'> {
  socials: Array<{ label: string; href?: string | null }>
}

export const Hero = ({ data }: { data: HeroProps }) => {
  return (
    <section id="hero-home" className="flex flex-col gap-4 py-4 md:py-12">
      <h1 className="font-heading text-5xl font-medium">{data?.title}</h1>
      <h2 className="font-heading text-4xl">{data?.subtitle}</h2>
      <span className="block max-w-xl text-lg text-muted-foreground">
        {data?.description}
      </span>
      <div className="flex items-center gap-8">
        {data.socials.map((social) => (
          <Fragment key={social.label}>
            <Button
              variant="link"
              className="px-0"
              render={
                <a
                  href={social.href ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {social.label}
            </Button>
            <Separator
              orientation="vertical"
              className="h-5 w-4 bg-accent-foreground last:hidden"
            />
          </Fragment>
        ))}
      </div>
    </section>
  )
}
