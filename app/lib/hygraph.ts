import { Client, fetchExchange } from '@urql/core'
import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './graphql/graphql-env.d.ts'

const HYGRAPH_CONTENT_ENDPOINT = process.env.HYGRAPH_CONTENT_ENDPOINT ?? ''
const HYGRAPH_AUTH_TOKEN = process.env.HYGRAPH_AUTH_TOKEN

export const hygraphClient = new Client({
  url: HYGRAPH_CONTENT_ENDPOINT,
  exchanges: [fetchExchange],
  preferGetMethod: false,
  fetchOptions: {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HYGRAPH_AUTH_TOKEN}`,
    },
  },
})

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    DateTime: string
    Date: string
    Json: unknown
    Long: number
    RGBAHue: string
    RGBATransparency: string
    Hex: string
  }
}>()

export async function hygraph<T, V extends Record<string, unknown>>(
  query: T,
  variables?: V
) {
  const result = await hygraphClient
    .query(query as any, variables ?? {})
    .toPromise()
  if (result.error) throw new Error(result.error.message)
  return result.data
}
