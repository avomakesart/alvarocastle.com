import { useLoaderData } from 'react-router'
import { Experience } from '~/components/sections/home/experience'
import { Hero } from '~/components/sections/home/hero'
import { Work } from '~/components/sections/home/work'
import { Writing } from '~/components/sections/home/writing'
import { getHome } from '~/lib/graphql/queries/home'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import type { Route } from './+types/home'
import { createMeta } from '~/lib/seo'

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const data = await getHome({ variables: { first: 1, locales: [locales] } })

  const home = data?.homes[0]

  const experience = (home?.experienceCompanies ?? []).map((company, i) => ({
    company,
    role: home?.experienceRoles[i] ?? '',
    dateRange: home?.experienceDateRanges[i] ?? '',
    logoUrl: home?.experienceLogoUrls[i] ?? '',
  }))

  return {
    hero: {
      title: home?.heroTitle,
      subtitle: home?.heroSubtitle,
      description: home?.heroDescription,
      githubUrl: home?.githubUrl,
      twitterUrl: home?.twitterUrl,
      linkedinUrl: home?.linkedinUrl,
    },
    experience: {
      sectionTitle: home?.experienceSectionTitle,
      entries: experience,
    },
    work: {
      sectionTitle: home?.workSectionTitle,
      allWorkLabel: home?.allWorkLabel,
      allWorkUrl: home?.allWorkUrl,
      entries: data?.workEntries ?? [],
    },
    writing: {
      sectionTitle: home?.writingSectionTitle,
      allWritingLabel: home?.allWritingLabel,
      allWritingUrl: home?.allWritingLabel,
      entries: data?.writingEntries ?? [],
    },
  }
}

export function meta({ matches, params }: Route.MetaArgs) {
  const rootData = matches.find((match) => match?.id === 'root')?.loaderData as
    | {
        lang: SupportedLang
        siteConfig: {
          siteTitle: string
          siteDescription: string
        }
      }
    | undefined

  const lang = rootData?.lang ?? params.lang ?? DEFAULT_LANG
  const siteTitle = rootData?.siteConfig.siteTitle ?? 'Alvaro Castle'

  return createMeta({
    lang,
    title: siteTitle,
    description: rootData?.siteConfig.siteDescription ?? '',
    path: `/${lang}`,
    siteName: siteTitle,
  })
}

export default function Home() {
  const { hero, experience, work, writing } = useLoaderData<typeof loader>()

  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Hero
          data={{
            ...hero,
            socials: [
              { label: 'Github', href: hero?.githubUrl },
              { label: 'X', href: hero?.twitterUrl },
              {
                label: 'Linkedin',
                href: hero?.linkedinUrl,
              },
            ],
          }}
        />
        <div className="flex flex-col items-start gap-16">
          <Experience
            sectionTitle={experience?.sectionTitle}
            experiences={experience.entries}
          />
          <Work data={work} />
          <Writing data={writing} />
        </div>
      </div>
    </div>
  )
}
