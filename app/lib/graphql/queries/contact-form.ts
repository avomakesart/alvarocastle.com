import { graphql, hygraph } from '~/lib/hygraph'
import type { ResultOf, VariablesOf } from '~/lib/graphql/graphql'

export const GET_CONTACT_FORMS = graphql(`
  query ContactForms($locales: [Locale!]!) {
    contactForms(locales: $locales) {
      id
      nameInputLabel
      nameInputPlaceholder
      emailInputLabel
      emailInputPlaceholder
      messageInputLabel
      messageInputPlaceholder
      submitButtonLabel
      submitButtonLoadingLabel
      createdAt
      stage
      locale
      replyMessage
      successMessage {
        markdown
        raw
      }
      publishedAt(variation: LOCALIZATION)
      updatedAt
      localizations {
        id
        replyMessage
        nameInputLabel
        nameInputPlaceholder
        emailInputLabel
        emailInputPlaceholder
        messageInputLabel
        messageInputPlaceholder
        submitButtonLabel
        submitButtonLoadingLabel
        createdAt
        stage
        locale
        publishedAt(variation: LOCALIZATION)
        updatedAt
        successMessage {
          markdown
          raw
        }
      }
    }
  }
`)

export type ContactFormData = ResultOf<typeof GET_CONTACT_FORMS>
export type ContactFormVariables = VariablesOf<typeof GET_CONTACT_FORMS>

export async function getContactForm({
  variables,
}: {
  variables: ContactFormVariables
}): Promise<ContactFormData> {
  return hygraph(GET_CONTACT_FORMS, variables)
}
