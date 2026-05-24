import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_WRITING_ENTRY = graphql(`
  query WritingEntry($slug: String, $locales: [Locale!]!) {
    writingEntry(where: { slug: $slug }, locales: $locales) {
      id
      intro
      title
      stage
      tags
      slug
      updatedAt
      readingTime
      publishedAt(variation: LOCALIZATION)
      published
      locale
      excerpt
      date
      body {
        raw
        markdown
      }
      createdAt(variation: LOCALIZATION)
    }
  }
`)

export type WritingEntryData = ResultOf<typeof GET_WRITING_ENTRY>
export type WritingVariables = VariablesOf<typeof GET_WRITING_ENTRY>

export async function getWritingEntry({
  variables,
}: {
  variables: WritingVariables
}): Promise<WritingEntryData> {
  return hygraph(GET_WRITING_ENTRY, variables)
}
