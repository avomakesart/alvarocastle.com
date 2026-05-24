import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_WORK_ENTRIES = graphql(`
  query WorkEntries($locales: [Locale!]!) {
    workEntries(locales: $locales) {
      company
      createdAt
      pageTitle
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
    }
  }
`)

export type WorkEntriesData = ResultOf<typeof GET_WORK_ENTRIES>
export type WorkEntriesVariables = VariablesOf<typeof GET_WORK_ENTRIES>

export async function getWorkEntries({
  variables,
}: {
  variables: WorkEntriesVariables
}): Promise<WorkEntriesData> {
  return hygraph(GET_WORK_ENTRIES, variables)
}
