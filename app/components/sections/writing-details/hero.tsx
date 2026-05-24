import { Badge } from '~/components/ui/badge'

export const Hero = ({
  tags,
  title,
  date,
  readingTime,
}: {
  tags: string[] | undefined
  date: string | undefined
  readingTime: string | null | undefined
  title: string | undefined
}) => {
  return (
    <section
      id="hero-writing-entry"
      className="flex flex-col gap-4 py-4 md:max-w-180 md:py-6"
    >
      <div className="mb-8 flex flex-col items-start gap-8.5">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-xs">{date}</span>
          <span className="h-0.75 w-0.75 rounded-full bg-accent-foreground" />
          <span className="text-xs">{readingTime}</span>
        </div>
        <h1 className="font-heading text-5xl">{title}</h1>
        <ul className="flex flex-wrap gap-1.5">
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="p-2.5">
              {tag}
            </Badge>
          ))}
        </ul>
      </div>
    </section>
  )
}
