export const Hero = ({
  tag,
  title,
  lead,
}: {
  tag: string | null
  title: string | null
  lead: string | null
}) => {
  return (
    <section
      id="hero-work-entry"
      className="flex flex-col gap-4 py-4 md:pt-6 md:pb-12"
    >
      <div className="mb-8 flex flex-col items-start gap-10">
        <div className="before:content['–'] flex items-center gap-2 text-sm text-blue-500 uppercase before:inline-block before:h-px before:w-5 before:bg-blue-500">
          {tag}
        </div>
        <h1 className="font-heading text-5xl">{title}</h1>
        <p className="max-w-140 text-lg text-muted-foreground">{lead}</p>
      </div>
    </section>
  )
}
