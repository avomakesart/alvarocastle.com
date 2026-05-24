import { ArrowLeft } from 'lucide-react'
import { Link, useLoaderData } from 'react-router'
import { Hero } from '~/components/sections/writing-details/hero'
import { Post } from '~/components/sections/writing-details/post'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { dateFormatter } from '~/lib/date-utils'
import { getWritingEntry } from '~/lib/graphql/queries/writing-details'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import { createMeta } from '~/lib/seo'
import type { Route } from './+types/writing-details'

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const { writingEntry } = await getWritingEntry({
    variables: {
      locales: [locales],
      slug: params.postId,
    },
  })

  return {
    backButtonLabel: writingEntry?.backButtonLabel,
    hero: {
      tags: writingEntry?.tags,
      date: dateFormatter({
        date: new Date(writingEntry?.date ?? ''),
        locales: 'en',
        options: {
          dateStyle: 'medium',
        },
      }),
      readingTime: writingEntry?.readingTime,
      title: writingEntry?.title,
    },
    post: writingEntry,
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
  const siteTitle = loaderData.hero.title ?? 'Alvaro Castle'

  return createMeta({
    lang,
    title: siteTitle,
    description: loaderData.post?.excerpt ?? '',
    path: `/${lang}/work`,
    siteName: siteTitle,
  })
}

export default function WritingDetails() {
  const { hero, post, backButtonLabel } = useLoaderData<typeof loader>()
  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Button
          render={<Link to="/writing" />}
          variant="link"
          className="mr-auto"
        >
          <ArrowLeft /> {backButtonLabel}
        </Button>
        <Hero {...hero} />
        <Separator />
        <Post intro={post?.intro} body={post?.body.raw} />
      </div>
    </div>
  )
}
