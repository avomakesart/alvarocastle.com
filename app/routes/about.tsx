import { useLoaderData } from 'react-router'
import { Hero } from '~/components/sections/about/hero'
import { Links } from '~/components/sections/about/links'
import { OutsideOfWork } from '~/components/sections/about/outside-of-work'
import { Stack } from '~/components/sections/about/stack'
import { WayOfWorking } from '~/components/sections/about/way-of-working'
import { getAbout } from '~/lib/graphql/queries/about'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import { createMeta } from '~/lib/seo'
import type { Route } from './+types/about'

export async function loader({ params }: Route.LoaderArgs) {
  const locale = getLocale(params.lang)
  const data = await getAbout({ variables: { first: 1, locales: [locale] } })
  const aboutData = data.abouts[0]
  const localizations = aboutData.localizations[0]

  return {
    pageTitle: aboutData.pageTitle,
    pageDescription: aboutData.pageDescription,
    hero: {
      tag: aboutData.pageTag,
      title: aboutData.headline,
      description: aboutData.lead,
      image: localizations.heroImage,
    },
    wayOfWorking: {
      title: aboutData.howIWorkSectionTitle,
      description: aboutData.howIWork?.html ?? '',
    },
    stack: {
      title: aboutData.stackSectionTitle,
      all: [
        {
          label: aboutData.dayToDayStackLabel,
          technologies: aboutData.stackDaily,
        },
        {
          label: aboutData.alsoStackLabel,
          technologies: aboutData.stackAlso,
        },
      ],
    },
    outsideOfWork: {
      title: aboutData.outsideWorkSectionTitle,
      description: aboutData.outsideWork,
    },
    links: {
      title: aboutData.linksSectionTitle,
      links: [
        {
          label: aboutData.linkedinLinkLabel,
          href: aboutData.linkedinUrl,
        },
        {
          label: aboutData.twitterLinkLabel,
          href: aboutData.twitterUrl,
        },
        {
          label: aboutData.githubLinkLabel,
          href: aboutData.githubUrl,
        },
        {
          label: aboutData.cvUrlLabel,
          href: aboutData.cvUrl,
        },
      ],
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
  const siteTitle = loaderData.pageTitle ?? 'Alvaro Castle'

  return createMeta({
    lang,
    title: siteTitle,
    description: loaderData.pageDescription ?? '',
    path: `/${lang}/about`,
    siteName: siteTitle,
  })
}

export default function About() {
  const { hero, wayOfWorking, stack, outsideOfWork, links } =
    useLoaderData<typeof loader>()

  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Hero data={hero} />
        <div className="flex flex-col items-start gap-16">
          <WayOfWorking
            title={wayOfWorking.title}
            description={wayOfWorking.description}
          />

          <Stack title={stack.title} stack={stack.all} />

          <OutsideOfWork
            title={outsideOfWork.title}
            description={outsideOfWork.description}
          />
          <Links title={links.title} links={links.links} />
        </div>
      </div>
    </div>
  )
}
