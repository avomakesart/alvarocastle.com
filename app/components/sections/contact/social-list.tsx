import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SocialLinkGeneric } from './types'

export const SocialList = ({ list }: { list: SocialLinkGeneric[] }) => {
  const Icon: Record<'arrow-up-right' | 'arrow-bottom', ReactNode> = {
    'arrow-up-right': <ArrowUpRight size={16} />,
    'arrow-bottom': <ArrowDown size={16} />,
  }
  return (
    <ul className="flex w-full flex-col">
      {list.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.href.includes('https') ? '_blank' : undefined}
            rel="noreferrer"
            download={link.id === 'cv' ? true : undefined}
            className="group -mx-8 flex items-center justify-between border-b px-8 py-4 no-underline transition-colors first:border-t first:border-border hover:bg-accent"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm">{link.label}</span>
              <span className="text-xs">{link.handle}</span>
            </div>
            <span className="text-sm transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-foreground">
              {Icon[link.icon]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
