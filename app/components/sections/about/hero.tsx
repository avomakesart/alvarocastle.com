import type { GenericHeroProps } from '~/lib/types'

export const Hero = ({
  data,
}: {
  data: Omit<GenericHeroProps, 'subtitle'>
}) => {
  return (
    <section id="hero-about" className="flex flex-col gap-4 py-4 md:py-12">
      <div className="mb-8 flex flex-col items-start gap-10 md:flex-row">
        <div>
          <div className="before:content['–'] mb-4 flex items-center gap-2 text-sm text-blue-500 uppercase before:inline-block before:h-px before:w-5 before:bg-blue-500">
            {data.tag}
          </div>
          <div className="mt-9 flex flex-col items-start gap-5">
            <h1 className="text-5xl">{data.title}</h1>
            <p className="max-w-full text-lg text-muted-foreground md:max-w-424">
              {data.description}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl md:w-140">
          <img
            src={data.image?.url}
            width={data.image?.width?.toString()}
            height={data.image?.height?.toString()}
            className="max-w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
