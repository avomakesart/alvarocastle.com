export interface GenericHeroProps {
  tag: string | undefined | null
  title: string | undefined
  subtitle: string | undefined
  description: string | undefined
  image: {
    id: string
    width: number | null
    height: number | null
    url: string
    size: number | null
    mimeType: string | null
  } | null
}

export type FieldErrors = {
  name?: string
  email?: string
  message?: string
  form?: string
  captcha?: string
}

export type ActionData =
  | { ok: true }
  | {
      ok: false
      errors: FieldErrors
    }

export interface LinkItem {
  label: string | null
  href: string | null
}

export interface StackItem {
  title: string | null
  technologies: string[]
}

export interface Project {
  tag: string | null
  company: string
  period: string
  name: string
  description: string
  stack: string[]
  href?: string // undefined = "soon" state
}
