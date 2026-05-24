import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_WORK = graphql(`
  query Works($first: Int, $locales: [Locale!]!) {
    works(first: $first, locales: $locales) {
      id
      headline
      pageTitle
      pageDescription
      locale
      publishedAt
      pageTag
      stage
      subtext
      createdAt
    }
    workEntries(locales: $locales) {
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
    }
  }
`)

export type WorkData = ResultOf<typeof GET_WORK>
export type WorkVariables = VariablesOf<typeof GET_WORK>

export async function getWork({
  variables,
}: {
  variables: WorkVariables
}): Promise<WorkData> {
  return hygraph(GET_WORK, variables)
}
