import {
  RichText,
  type RichTextProps,
} from '@graphcms/rich-text-react-renderer'
import { ArrowUpRight } from 'lucide-react'
import { Form, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Field, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { Spinner } from '~/components/ui/spinner'
import { Textarea } from '~/components/ui/textarea'
import type { ActionData } from '~/lib/types'
import { TurnstileWidget } from './turnstile-widget'

interface ContactFormType {
  id: string
  nameInputLabel: string | null
  nameInputPlaceholder: string | null
  emailInputLabel: string | null
  emailInputPlaceholder: string | null
  messageInputLabel: string | null
  messageInputPlaceholder: string | null
  submitButtonLabel: string | null
  submitButtonLoadingLabel: string | null
  replyMessage: string | null
  createdAt: string
  stage: 'DRAFT' | 'PUBLISHED'
  locale: 'en' | 'es_MX'
  successMessage: {
    markdown: string
    raw: unknown
  } | null
  publishedAt: string | null
  updatedAt: string
}

interface ContactFormProps {
  isSent?: boolean
  submitting: boolean
  actionData: ActionData | undefined
  labels: ContactFormType
  localizations?: ContactFormType[]
}

export const ContactForm = ({
  isSent,
  submitting,
  actionData,
  labels,
}: ContactFormProps) => {
  const { lang } = useParams()
  const isFormInvalid = actionData?.ok === false
  if (isSent) {
    return (
      <div className="pt-8">
        {labels.successMessage && (
          <RichText
            content={labels.successMessage?.raw as RichTextProps['content']}
          />
        )}
      </div>
    )
  }

  return (
    <Form
      method="post"
      action={`/${lang}/contact`}
      noValidate
      className="flex w-full max-w-lg flex-col gap-6"
    >
      <div className="flex w-full flex-col items-start gap-4 [&>div]:w-full">
        <FormField
          id="name"
          label={labels.nameInputLabel ?? ''}
          type="input"
          isInvalid={Boolean(isFormInvalid && actionData.errors.name)}
          placeholder={labels.nameInputPlaceholder ?? ''}
          className="w-full"
        />
        {isFormInvalid && actionData?.errors.name && (
          <p className="text-xs text-red-600">{actionData.errors.name}</p>
        )}
      </div>
      <Separator />
      <div className="flex w-full flex-col items-start gap-4 [&>div]:w-full">
        <FormField
          id="email"
          label={labels.emailInputLabel ?? ''}
          type="input"
          placeholder={labels.emailInputPlaceholder ?? ''}
          isInvalid={Boolean(isFormInvalid && actionData.errors.email)}
          inputType="email"
        />
        {isFormInvalid && actionData?.errors.email && (
          <p className="text-xs text-red-600">{actionData?.errors.email}</p>
        )}
      </div>
      <Separator />
      <div className="flex w-full flex-col items-start gap-4 [&>div]:w-full">
        <FormField
          id="message"
          label={labels.messageInputLabel ?? ''}
          type="textarea"
          isInvalid={Boolean(isFormInvalid && actionData.errors.message)}
          placeholder={labels.messageInputPlaceholder ?? ''}
        />
        {isFormInvalid && actionData?.errors.message && (
          <p className="text-xs text-red-600">{actionData?.errors.message}</p>
        )}
        {isFormInvalid && actionData?.errors?.captcha && (
          <p className="text-xs text-red-600">{actionData.errors.captcha}</p>
        )}
        <TurnstileWidget />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" size="lg" disabled={submitting} variant="default">
          {submitting ? (
            <>
              {labels.submitButtonLoadingLabel}
              <Spinner />
            </>
          ) : (
            <>
              {labels.submitButtonLabel} <ArrowUpRight className="size-4" />
            </>
          )}
        </Button>
        <span className="text-xs text-accent-foreground">
          {labels.replyMessage}
        </span>
      </div>
    </Form>
  )
}

interface FormFieldProps {
  id: string
  label: string
  type: 'input' | 'textarea'
  placeholder: string
  inputType?: string
  isInvalid?: boolean
  className?: string
}

function FormField({
  id,
  label,
  type,
  placeholder,
  isInvalid,
  inputType = 'text',
  className,
}: FormFieldProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      {type === 'textarea' ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          className={className}
          aria-invalid={isInvalid}
          rows={5}
          size="lg"
          required
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={inputType}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          required
          className={className}
          size="lg"
        />
      )}
    </Field>
  )
}
