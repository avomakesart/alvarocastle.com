import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData
} from 'react-router'

import { Footer } from '~/components/shared/footer'
import { Header, type NavItem } from '~/components/shared/header'
import { ThemeProvider } from '~/context/theme-provider'
import type { Route } from './+types/root'
import './app.css'
import { getSiteConfigs } from './lib/graphql/queries/site-configs'
import {
  DEFAULT_LANG,
  getLocale,
  isSupportedLang,
  redirectToLocalizedPath
} from './lib/lang'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://api.fonts.coollabs.io/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap',
    },
  ]
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url)

  const firstSegment = url.pathname.split('/').filter(Boolean)[0]

  if (!isSupportedLang(firstSegment)) {
    redirectToLocalizedPath(request)
  }

  const locales = getLocale(params.lang)

  const { siteConfigs } = await getSiteConfigs({
    variables: { locales: [locales] },
  })

  const siteConfig = siteConfigs[0]

  return {
    navItems: siteConfig.navItems as NavItem[],
    siteConfig,
    lang: firstSegment ?? DEFAULT_LANG,
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { siteConfig, navItems , lang } = useRouteLoaderData('root')

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('alvaro-castle-theme');if(!t||t==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.add(t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative">
        <ThemeProvider storageKey="alvaro-castle-theme">
          <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
            {siteConfig ? <Header navItems={navItems} /> : null}
            {children}
            {siteConfig ? <Footer slogan={siteConfig.footer} /> : null}
          </div>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
