import { Turnstile } from '@marsidev/react-turnstile'
import { useParams } from 'react-router'

export function TurnstileWidget({ onError }: { onError?: () => void }) {
  const { lang } = useParams()
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  if (!siteKey) {
    console.warn('VITE_TURNSTILE_SITE_KEY not set - Turnstile disabled')
    return null
  }

  return (
    <Turnstile
      siteKey={siteKey}
      onError={onError}
      options={{ appearance: 'interaction-only', language: lang }}
    />
  )
}
