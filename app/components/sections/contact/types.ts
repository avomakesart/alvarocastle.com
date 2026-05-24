import type { LucideIcon } from 'lucide-react'

export interface ActionData {
  ok: boolean
  error?: string
}

export interface SocialLink {
  id: string
  label: string
  handle: string
  href: string
  Icon: LucideIcon
}
export interface SocialLinkGeneric {
  id: string
  label: string
  handle: string
  href: string
  icon: 'arrow-up-right' | 'arrow-bottom'
}
