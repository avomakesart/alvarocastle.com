import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_WORK_ENTRIES = graphql(`
  query WorkEntry($slug: String, $locales: [Locale!]!) {
    workEntry(where: { slug: $slug }, locales: $locales) {
      company
      createdAt
      date
      id
      lead
      locale
      order
      published
      publishedAt
      role
      scope
      slug
      stack
      stage
      tag
      title
      updatedAt
      body {
        html
        markdown
        raw
      }
    }
  }
`)

export type WorkEntryData = ResultOf<typeof GET_WORK_ENTRIES>
export type WorkEntryVariables = VariablesOf<typeof GET_WORK_ENTRIES>

export async function getWorkEntry({
  variables,
}: {
  variables: WorkEntryVariables
}): Promise<WorkEntryData> {
  return hygraph(GET_WORK_ENTRIES, variables)
}
