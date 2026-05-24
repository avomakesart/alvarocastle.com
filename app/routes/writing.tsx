import { useLoaderData } from 'react-router'
import { Hero } from '~/components/sections/writing/hero'
import { PostRow } from '~/components/sections/writing/post-row'
import { dateFormatter } from '~/lib/date-utils'
import { getWritings } from '~/lib/graphql/queries/writing'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import { createMeta } from '~/lib/seo'
import type { Route } from './+types/writing'

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const { writings, writingEntries } = await getWritings({
    variables: { locales: [locales] },
  })
  const writingData = writings[0]

  const posts = writingEntries.map((item) => ({
    ...item,
    date: dateFormatter({
      date: new Date(item?.date ?? ''),
      locales: 'en',
      options: {
        dateStyle: 'medium',
      },
    }),
  }))

  return {
    site: {
      title: writingData.pageTitle ?? 'Alvaro Castle',
      description: writingData.pageDescription ?? '',
    },
    hero: {
      title: writingData.headline,
      tag: writingData.pageTag,
    },
    posts,
    locales,
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

  return createMeta({
    title: loaderData.site.title,
    description: loaderData.site.description,
    path: `/${lang}/writing`,
    siteName: loaderData.site.title,
  })
}

export default function Writing() {
  const { hero, posts } = useLoaderData<typeof loader>()
  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Hero {...hero} />
        <ul className="flex flex-col border-t">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      </div>
    </div>
  )
}
