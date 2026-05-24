import sanitize from 'xss'
import { marked } from 'marked'
import { cn } from '~/lib/utils'

export function Markdown({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  const html = sanitize(
    marked.parse(content, {
      breaks: true,
      gfm: true,
    }) as string
  )

  return (
    <div
      className={cn('flex flex-col items-start gap-2', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
