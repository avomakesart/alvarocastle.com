import { Badge } from '~/components/ui/badge'
import type { PostSummary } from './types'
import { Link, useParams } from 'react-router'
import { ArrowUpRight } from 'lucide-react'

export function PostRow({ post }: { post: PostSummary }) {
  const { slug, title, date, readingTime, tags, excerpt, published } = post
  const { lang } = useParams()

  const inner = (
    <div className="group grid items-start gap-6 border-b px-8 py-7 transition-colors hover:bg-accent/50 md:grid-cols-[120px_1fr_auto]">
      <div className="flex items-start justify-between">
        <div className="pt-0.75">
          <p className="mb-2 text-xs">{published ? date : 'Coming'}</p>
          <p className="text-xs">{published ? readingTime : '— min'}</p>
        </div>
        <span
          className={`inline-block pt-1 text-[16px] transition-all md:hidden ${
            published
              ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-foreground'
              : 'opacity-30'
          }`}
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div>
        <h2 className="mb-2 font-heading text-2xl italic">{title}</h2>
        <p className="mb-3 max-w-120 text-sm">{excerpt}</p>
        <ul className="flex flex-wrap gap-1.25">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="p-2.5">
              {tag}
            </Badge>
          ))}
        </ul>
      </div>

      <span
        className={`hidden pt-1 text-[16px] transition-all md:inline-block ${
          published
            ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-foreground'
            : 'opacity-30'
        }`}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </div>
  )

  return (
    <li>
      {published ? (
        <Link to={`/${lang}/writing/${slug}`} className="block no-underline">
          {inner}
        </Link>
      ) : (
        <div className="cursor-default">{inner}</div>
      )}
    </li>
  )
}
