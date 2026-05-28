export const isClient = typeof window !== 'undefined'
export const isServer = !isClient
export const noop = {}