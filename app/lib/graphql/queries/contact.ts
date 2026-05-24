import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_CONTACT_PAGE = graphql(`
  query Contacts($locales: [Locale!]!) {
    contacts(locales: $locales) {
      id
      pageTitle
      pageDescription
      createdAt(variation: COMBINED)
      cvUrl
      email
      githubUrl
      headline
      linkedinUrl
      locale
      pageTag
      publishedAt
      replyTime
      stage
      subtext
      twitterUrl
      socialLinks
      updatedAt
      separatorLabel
      localizations {
        replyTime
        createdAt
        cvUrl
        email
        socialLinks
        githubUrl
        headline
        id
        linkedinUrl
        locale
        pageTag
        publishedAt
        stage
        subtext
        twitterUrl
        separatorLabel
        updatedAt
      }
    }
  }
`)

export type ContactPageData = ResultOf<typeof GET_CONTACT_PAGE>
export type ContactPageVariables = VariablesOf<typeof GET_CONTACT_PAGE>

export async function getContactPage({
  variables,
}: {
  variables: ContactPageVariables
}): Promise<ContactPageData> {
  return hygraph(GET_CONTACT_PAGE, variables)
}
