import {
  data,
  useActionData,
  useLoaderData,
  useNavigation,
  type ActionFunctionArgs,
} from 'react-router'
import { Resend } from 'resend'
import { ContactForm } from '~/components/sections/contact/contact-form'
import { Hero } from '~/components/sections/contact/hero'
import { SocialList } from '~/components/sections/contact/social-list'
import type { SocialLinkGeneric } from '~/components/sections/contact/types'
import { Separator } from '~/components/ui/separator'
import { getContactPage } from '~/lib/graphql/queries/contact'
import { getContactForm } from '~/lib/graphql/queries/contact-form'
import { DEFAULT_LANG, getLocale, type SupportedLang } from '~/lib/lang'
import { createMeta } from '~/lib/seo'
import type { Route } from './+types/contact'
import type { ActionData, FieldErrors } from '~/lib/types'
import { emailRegex } from '~/lib/utils'

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData()

  const name = String(form.get('name') ?? '').trim()
  const email = String(form.get('email') ?? '').trim()
  const message = String(form.get('message') ?? '').trim()
  const lang = params.lang ?? 'en'
  const isEnglish = lang === 'en'

  const errors: FieldErrors = {}

  if (!name)
    errors.name = isEnglish ? 'Name is required.' : 'Se requiere un nombre.'
  if (!email)
    errors.email = isEnglish
      ? 'Email is required.'
      : 'Se requiere un correo electrónico.'
  if (!message)
    errors.message = isEnglish
      ? 'Message is required.'
      : 'Se requiere unn mensaje.'

  if (email && !emailRegex.test(email)) {
    errors.email = isEnglish
      ? "That email doesn't look right."
      : 'Ese correo electrónico no se ve bien.'
  }

  if (Object.keys(errors).length > 0) {
    return data<ActionData>({ ok: false, errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return data<ActionData>(
      {
        ok: false,
        errors: {
          form: isEnglish
            ? 'Email service is not configured.'
            : 'El servicio de correo electrónico no está configurado.',
        },
      },
      { status: 500 }
    )
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'AC Web Contact <noreply@alvarocastle.com>',
      to: 'hey@alvarocastle.com',
      replyTo: email,
      subject: `New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Language: ${lang}`,
        '',
        message,
      ].join('\n'),
    })
    return data<ActionData>({ ok: true }, { status: 200 })
  } catch {
    return data<ActionData>(
      {
        ok: false,
        errors: {
          form: isEnglish
            ? 'Something went wrong. Try emailing me directly.'
            : 'Algo salió mal. Intenta enviarme un correo electrónico directamente.',
        },
      },
      { status: 500 }
    )
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const locales = getLocale(params.lang)
  const [{ contacts }, { contactForms }] = await Promise.all([
    getContactPage({
      variables: {
        locales: [locales],
      },
    }),
    getContactForm({ variables: { locales: [locales] } }),
  ])

  if (!contacts || !contactForms) {
    throw new Response('Not Found', { status: 404 })
  }
  const contactPage = contacts[0]
  const contactForm = contactForms[0]

  return {
    page: contactPage,
    localizations: contactPage.localizations[0],
    socialLinks: contactPage.socialLinks as SocialLinkGeneric[],
    contactFormLabels: contactForm,
    lang: params.lang,
  }
}

export function meta({ matches, params, loaderData }: Route.MetaArgs) {
  const rootData = matches.find((match) => match?.id === 'root')?.loaderData as
    | {
        lang: SupportedLang
        siteConfig: {
          siteTitle: string
        }
      }
    | undefined

  const lang = rootData?.lang ?? params.lang ?? DEFAULT_LANG
  const siteTitle = `Alvaro Castle | ${loaderData.page.pageTitle}`

  return createMeta({
    lang,
    title: siteTitle,
    description: loaderData.page.pageDescription ?? '',
    path: `/${lang}/contact`,
    siteName: siteTitle,
  })
}

export default function Contact() {
  const { page, socialLinks, contactFormLabels } =
    useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const submitting = navigation.state === 'loading'
  const isSent = actionData?.ok && !submitting

  return (
    <div className="container m-auto flex min-h-svh w-full p-6 md:max-w-5xl">
      <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-loose">
        <Hero
          tag={page.pageTag}
          title={page.headline}
          subtitle={page.subtext ?? ''}
        />
        <Separator />
        <div className="flex flex-col items-start gap-16">
          <ContactForm
            isSent={isSent}
            actionData={actionData}
            submitting={submitting}
            labels={contactFormLabels}
          />
          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs tracking-widest text-accent-foreground uppercase">
              {page.separatorLabel}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <SocialList list={socialLinks} />
        </div>
      </div>
    </div>
  )
}
