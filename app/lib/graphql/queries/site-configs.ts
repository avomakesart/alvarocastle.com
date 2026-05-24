import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_SITE_CONFIGS = graphql(`
  query SiteConfigs($locales: [Locale!]!) {
    siteConfigs(locales: $locales) {
      navItems
      id
      locale
      footer
      cvUrl
      createdAt
      siteTitle
      siteDescription
      stage
      updatedAt
      publishedAt
      localizations {
        navItems
        id
        locale
        footer
        cvUrl
        createdAt
        siteTitle
        siteDescription
        stage
        updatedAt
        publishedAt
      }
    }
  }
`)

export type SiteConfigData = ResultOf<typeof GET_SITE_CONFIGS>
export type SiteConfigVariables = VariablesOf<typeof GET_SITE_CONFIGS>

export async function getSiteConfigs({
  variables,
}: {
  variables: SiteConfigVariables
}): Promise<SiteConfigData> {
  return hygraph(GET_SITE_CONFIGS, variables)
}
