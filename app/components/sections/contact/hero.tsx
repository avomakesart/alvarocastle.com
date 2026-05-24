import type { GenericHeroProps } from '~/lib/types'

export const Hero = ({
  tag,
  title,
  subtitle,
}: Omit<GenericHeroProps, 'description' | 'image'>) => {
  return (
    <section
      id="hero-contact"
      className="flex flex-col gap-4 py-4 md:max-w-180 md:py-12"
    >
      <div className="flex flex-col items-start gap-8.5">
        <div className="before:content['-'] flex items-center gap-2 text-sm text-blue-500 uppercase before:inline-block before:h-px before:w-5 before:bg-blue-500">
          {tag}
        </div>
        <h1 className="font-heading text-5xl font-light">{title}</h1>
        <p className="max-w-100 text-base text-accent-foreground">{subtitle}</p>
      </div>
    </section>
  )
}
