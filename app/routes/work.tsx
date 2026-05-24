import { useLoaderData } from 'react-router'
import { Hero } from '~/components/sections/work/hero'
import { Projects } from '~/components/sections/work/projects'
import { getWork } from '~/lib/graphql/queries/work'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import { createMeta } from '~/lib/seo'
import type { Route } from './+types/work'

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const { works, workEntries } = await getWork({
    variables: { first: 1, locales: [locales] },
  })
  const workData = works[0]
  return { hero: workData, projects: workEntries }
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
  const siteTitle = loaderData.hero.pageTitle ?? 'Alvaro Castle'

  return createMeta({
    lang,
    title: siteTitle,
    description: loaderData.hero.pageDescription ?? '',
    path: `/${lang}/work`,
    siteName: siteTitle,
  })
}

export default function Work() {
  const { hero, projects } = useLoaderData<typeof loader>()
  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Hero tag={hero.pageTag} title={hero.headline} />
        <div className="flex flex-col items-start gap-16">
          <Projects projects={projects} />
        </div>
      </div>
    </div>
  )
}
