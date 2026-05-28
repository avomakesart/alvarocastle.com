import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import useLocalStorage from '~/hooks/use-local-storage'
import { isClient } from '~/lib/dom'
import { DEFAULT_LANG } from '~/lib/lang'

export interface LikeHeartProps {
  slug: string
  initialLikes?: number
}

const MAX = 10

const FILLS = [
  "#fff2f2", // red-50
  "#ffe2e2", // red-100
  "#ffcac9", // red-200
  "#ffa2a2", // red-300
  "#ff6466", // red-400
  "#ff2d35", // red-500
  "#eb0005", // red-600
  "#c40004", // red-700
  "#a20910", // red-800
  "#841819", // red-900
];

const STROKES = [
  "#ffa2a2", // red-300 
  "#ff6466", // red-400
  "#ff2d35", // red-500
  "#ff2d35", // red-500
  "#eb0005", // red-600
  "#c40004", // red-700
  "#c40004", // red-700
  "#a20910", // red-800
  "#841819", // red-900
  "#480808", // red-950
];

const HINTS: Record<'en' | 'es', string[]> = {
  en: [
    'Click to like',
    'Nice one',
    'Keep going...',
    "You're into it",
    'Really into it',
    'Halfway there',
    'Getting serious',
    'Almost obsessed',
    'Basically in love',
    'One more...',
    'Max love — thank you ♥',
  ],
  es: [
    'Haz clic para dar me gusta',
    '¡Genial!',
    'Sigue así...',
    'Te gusta',
    'Me gusta mucho',
    'Ya casi',
    'Se está poniendo serio',
    'Casi obsesionado',
    'Prácticamente enamorado',
    'Una más...',
    'Máximo amor, gracias ♥',
  ],
}

export function LikeHeart({ slug, initialLikes }: LikeHeartProps) {
  const storageKey = `likes:${slug}`
  const { lang } = useParams()

  const [userLikes, setUserLikes] = useState(0)
  const [globalLikes, setGlobalLikes] = useState(initialLikes)
  const [isPulsing, setIsPulsing] = useState(false)

  const rippleRef = useRef<SVGCircleElement>(null)
  const rafRef = useRef<number>(0)
  const [value, setValue] = useLocalStorage(storageKey, '0')

  useEffect(() => {
    const stored = parseInt(value ?? '0', 10)
    setUserLikes(Math.min(stored, MAX))
  }, [])

  const fillY = 100 - userLikes * 10
  const fillColor = userLikes > 0 ? FILLS[userLikes - 1] : 'transparent'
  const strokeColor = userLikes > 0 ? STROKES[userLikes - 1] : 'currentColor'
  const isMaxed = userLikes >= MAX

  function triggerRipple() {
    const el = rippleRef.current
    if (!el) return
    let r = 0
    el.setAttribute('r', '0')
    el.setAttribute('opacity', '0.6')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const step = () => {
      r += 3
      el.setAttribute('r', String(r))
      el.setAttribute('opacity', String(Math.max(0, 0.6 - r / 55)))
      if (r < 50) rafRef.current = requestAnimationFrame(step)
      else el.setAttribute('opacity', '0')
    }
    rafRef.current = requestAnimationFrame(step)
  }

  async function handleClick() {
    if (isMaxed) return
    const next = userLikes + 1

    // Optimistic updates
    setUserLikes(next)
    setGlobalLikes((g) => {
      if (!g) return
      return g + 1
    })
    setValue(String(next));

    // Pulse and ripple
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 350)
    triggerRipple();

    try {
        await fetch(`/api/likes/${slug}`, { method: 'POST' })
    } catch (error) {
      // Silently failed it is saved in local
    }
  }
  
  return (
    <div className="flex items-center justify-end gap-3 select-none">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        aria-label={
          isMaxed
            ? 'Max love — thank you ♥'
            : `Like this post (${userLikes} of ${MAX})`
        }
        role="button"
        tabIndex={isMaxed ? -1 : 0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className={[
          'transition-opacity',
          isMaxed ? 'cursor-default opacity-60' : 'cursor-pointer',
          isPulsing ? 'animate-[heartPulse_0.35s_ease_forwards]' : '',
        ].join(' ')}
        style={{
          animation: isPulsing ? 'heartPulse 0.35s ease forwards' : undefined,
        }}
      >
        <style>{`
          @keyframes heartPulse {
            0%   { transform: scale(1); }
            40%  { transform: scale(1.18); }
            70%  { transform: scale(0.92); }
            100% { transform: scale(1); }
          }
        `}</style>

        <defs>
          <clipPath id={`heartClip-${slug}`}>
            <path d="M50 85 C50 85 10 62 10 36 C10 22 20 13 31 13 C38 13 44 17 48 23 L50 27 L52 23 C56 17 62 13 69 13 C80 13 90 22 90 36 C90 62 50 85 50 85Z" />
          </clipPath>
        </defs>

        <path
          d="M50 85 C50 85 10 62 10 36 C10 22 20 13 31 13 C38 13 44 17 48 23 L50 27 L52 23 C56 17 62 13 69 13 C80 13 90 22 90 36 C90 62 50 85 50 85Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          className="transition-all duration-300"
        />

        <g clipPath={`url(#heartClip-${slug})`}>
          <rect
            x="0"
            y={fillY}
            width="100"
            height="100"
            fill={fillColor}
            className="transition-all duration-450 ease-in-out"
          />
        </g>

        <circle
          ref={rippleRef}
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke={fillColor}
          strokeWidth="1.5"
          opacity="0"
        />
      </svg>

      <div className="flex flex-col gap-0.5">
        <span
          className={`text-[13px] transition-colors ${
            userLikes > 0 ? 'text-[--text]' : 'text-[--text3]'
          }`}
        >
          {globalLikes}
        </span>
        <span className="text-[10px] tracking-[0.08em] text-[--text3] uppercase">
          {HINTS[(lang?.includes(DEFAULT_LANG) && 'en') || 'es'][userLikes]}
        </span>
      </div>
    </div>
  )
}
