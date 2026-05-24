import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TURNSTILE_API_URL } from './config'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false

  try {
    const res = await fetch(TURNSTILE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })
    const json = (await res.json()) as { success: boolean }
    return json.success
  } catch {
    return false
  }
}
