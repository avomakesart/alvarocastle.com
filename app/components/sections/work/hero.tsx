import type { GenericHeroProps } from '~/lib/types'

export const Hero = ({
  tag,
  title,
}: Pick<GenericHeroProps, 'title' | 'tag'>) => {
  return (
    <section
      id="hero-work"
      className="flex flex-col gap-4 py-4 md:pt-12 md:pb-2"
    >
      <div className="mb-8 flex flex-col items-start gap-10">
        <div className="before:content['–'] flex items-center gap-2 text-sm text-blue-500 uppercase before:inline-block before:h-px before:w-5 before:bg-blue-500">
          {tag}
        </div>
        <h1 className="font-heading text-5xl">{title}</h1>
      </div>
    </section>
  )
}
