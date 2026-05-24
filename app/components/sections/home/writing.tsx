import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Fragment } from 'react'
import { SectionHeader } from '~/components/shared/section-header'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

interface WritingEntry {
  title: string
  slug: string
  date: string
  excerpt: string
}

interface WritingProps {
  sectionTitle: string | null | undefined
  allWritingLabel: string | null | undefined
  allWritingUrl: string | null | undefined
  entries: WritingEntry[]
}

export const Writing = ({ data }: { data: WritingProps }) => {
  return (
    <section id="writing" className="w-full">
      <SectionHeader
        label={data.sectionTitle ?? ''}
        renderAction={
          <Button
            variant="link"
            className="lowercase"
            render={<Link to={data.allWritingUrl ?? ''} />}
          >
            {data.allWritingLabel} <ArrowRight className="size-4" />
          </Button>
        }
      />
      <div className="flex flex-col items-start gap-4">
        {data.entries.map((item) => (
          <Fragment key={item.title}>
            <WritingItem {...item} />
            <Separator className="last:hidden" />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

function WritingItem({ title, date, slug }: WritingEntry) {
  const { lang } = useParams()
  return (
    <Link
      to={`/${lang}/writing/${slug}`}
      className="flex w-full cursor-pointer items-center justify-between py-3.5 transition-opacity hover:opacity-60"
    >
      <span className="text-base font-medium">{title}</span>
      <span className="text-sm text-muted-foreground">{date}</span>
    </Link>
  )
}
