import type { MetaDescriptor } from 'react-router'
import { DEFAULT_LANG, OG_LOCALES, type SupportedLang } from './lang'
import { SITE_URL } from './config'

type CreateMetaArgs = {
  lang?: SupportedLang | string
  title: string
  description: string
  path: string
  siteName?: string
  image?: string
  type?: 'website' | 'article'
  robots?: string
}

export function createMeta({
  lang = DEFAULT_LANG,
  title,
  description,
  path,
  siteName = 'Alvaro Castle',
  image = `${SITE_URL}/og-image.png`,
  type = 'website',
  robots = 'index, follow',
}: CreateMetaArgs): MetaDescriptor[] {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${SITE_URL}${normalizedPath}`

  const safeLang = lang === 'es' || lang === 'en' ? lang : DEFAULT_LANG

  return [
    { title },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: type,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:site_name',
      content: siteName,
    },
    {
      property: 'og:locale',
      content: OG_LOCALES[safeLang],
    },
    {
      property: 'og:image',
      content: image,
    },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
    },

    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: image,
    },
    {
      name: 'robots',
      content: robots,
    },
  ]
}
