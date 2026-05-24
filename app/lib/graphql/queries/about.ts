import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_ABOUT = graphql(`
  query Abouts($first: Int, $locales: [Locale!]!) {
    abouts(first: $first, locales: $locales) {
      id
      lead
      linkedinUrl
      linksSectionTitle
      locale
      pageTitle
      pageDescription
      heroImage {
        id
        width
        height
        url
        size
        mimeType
      }
      outsideWork
      outsideWorkSectionTitle
      pageTag
      publishedAt
      alsoStackLabel
      stackAlso
      dayToDayStackLabel
      stackDaily
      stackSectionTitle
      stage
      twitterUrl
      updatedAt
      howIWorkSectionTitle
      howIWork {
        markdown
        html
      }
      headline
      githubUrl
      cvUrl
      linkedinLinkLabel
      githubLinkLabel
      twitterLinkLabel
      cvUrlLabel
      createdAt
      localizations {
        heroImage {
          id
          width
          height
          url
          size
          mimeType
        }
      }
    }
  }
`)

export type AboutData = ResultOf<typeof GET_ABOUT>
export type AboutVariables = VariablesOf<typeof GET_ABOUT>

export async function getAbout({
  variables,
}: {
  variables: AboutVariables
}): Promise<AboutData> {
  return hygraph(GET_ABOUT, variables)
}
