import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_WRITINGS = graphql(`
  query Writings($locales: [Locale!]!) {
    writings(locales: $locales) {
      id
      headline
      pageTag
      subtext
      pageTitle
      pageDescription
      stage
      publishedAt
      createdAt
    }
    writingEntries(locales: $locales) {
      id
      excerpt
      date
      locale
      intro
      slug
      tags
      title
      readingTime
      published
      publishedAt
      updatedAt
      createdAt
    }
  }
`)

export type WritingData = ResultOf<typeof GET_WRITINGS>
export type WritingVariables = VariablesOf<typeof GET_WRITINGS>

export async function getWritings({
  variables,
}: {
  variables: WritingVariables
}): Promise<WritingData> {
  return hygraph(GET_WRITINGS, variables)
}
