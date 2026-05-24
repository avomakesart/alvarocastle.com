import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_HOME = graphql(`
  query Homes($first: Int, $locales: [Locale!]!) {
    homes(first: $first, locales: $locales) {
      allWorkLabel
      allWorkUrl
      allWritingLabel
      allWritingUrl
      createdAt
      experienceCompanies
      experienceDateRanges
      experienceRoles
      experienceSectionTitle
      experienceLogoUrls
      githubUrl
      heroDescription
      heroSubtitle
      heroTitle
      id
      linkedinUrl
      locale
      pageTag
      publishedAt
      stage
      twitterUrl
      updatedAt
      workSectionTitle
      writingSectionTitle
    }
    workEntries(
      first: 2
      locales: $locales
      where: { published: true }
      orderBy: order_ASC
    ) {
      id
      title
      slug
      company
      date
      lead
      stack
    }
    writingEntries(
      first: 2
      locales: $locales
      where: { published: true }
      orderBy: date_DESC
    ) {
      title
      slug
      date
      excerpt
    }
  }
`)

export type HomeData = ResultOf<typeof GET_HOME>
export type HomeVariables = VariablesOf<typeof GET_HOME>

export async function getHome({
  variables,
}: {
  variables: HomeVariables
}): Promise<HomeData> {
  return hygraph(GET_HOME, variables)
}
