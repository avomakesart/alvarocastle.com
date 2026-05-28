import { Redis } from '@upstash/redis'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug
  if (!slug) return Response.json({ likes: 0 })
  const likes = (await redis.get<number>(`likes:${slug}`)) ?? 0
  return Response.json({ likes })
}

export async function action({ params }: ActionFunctionArgs) {
  const slug = params.slug
  if (!slug) return Response.json({ ok: false }, { status: 400 })

  const likes = await redis.incr(`likes:${slug}`)
  return Response.json({ ok: true, likes })
}
