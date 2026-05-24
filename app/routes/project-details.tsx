import type { RichTextProps } from '@graphcms/rich-text-react-renderer'
import { ArrowLeft } from 'lucide-react'
import { Link, useLoaderData } from 'react-router'
import { Hero } from '~/components/sections/project-details/hero'
import { Project } from '~/components/sections/project-details/project'
import { Button } from '~/components/ui/button'
import { getWorkEntry } from '~/lib/graphql/queries/work-entry'
import { createMeta } from '~/lib/seo'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '../lib/lang'
import type { Route } from './+types/project-details'

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const { workEntry } = await getWorkEntry({
    variables: {
      slug: params.projectId,
      locales: [locales],
    },
  })

  if (!workEntry) {
    throw new Response('Not Found', { status: 404 })
  }

  return {
    backButtonLabel: workEntry.backButtonLabel,
    hero: {
      tag: workEntry?.tag ?? '',
      title: workEntry?.title ?? '',
      lead: workEntry?.lead ?? '',
    },
    caseStudy: {
      body: workEntry.body.raw as RichTextProps['content'],
      meta: {
        company: workEntry?.company ?? '',
        period: workEntry?.date ?? '',
        role: workEntry?.role ?? '',
        scope: workEntry?.scope ?? '',
        stack: workEntry?.stack ?? [],
      },
    },
  }
}

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const rootData = matches.find((match) => match?.id === 'root')?.loaderData as
    | {
        lang: SupportedLang
        siteConfig: {
          siteTitle: string
        }
      }
    | undefined

  const lang = rootData?.lang ?? params.lang ?? DEFAULT_LANG
  const siteTitle = `Alvaro Castle | ${loaderData.hero.title}`

  return createMeta({
    lang,
    title: siteTitle,
    description: loaderData.hero.title,
    path: `/${lang}/work`,
    siteName: siteTitle,
  })
}

export default function ProjectDetails() {
  const { hero, caseStudy, backButtonLabel } = useLoaderData<typeof loader>()
  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Button render={<Link to="/work" />} variant="link" className="mr-auto">
          <ArrowLeft /> {backButtonLabel}
        </Button>
        <Hero tag={hero.tag} title={hero.title} lead={hero.lead} />
        <Project caseStudy={caseStudy} />
      </div>
    </div>
  )
}
