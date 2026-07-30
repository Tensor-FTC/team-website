import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { useId, useState } from 'react'
import { transitions } from '../../config/motion'
import { teamConfig } from '../../config/teamConfig'
import { Button } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { cn } from '../ui/cn'

type Fields = {
  name: string
  email: string
  topic: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const topics = [
  'Joining the team',
  'Sponsorship',
  'Outreach or a workshop',
  'Mentoring',
  'Something else',
]

const emptyFields: Fields = { name: '', email: '', topic: topics[0], message: '' }

function validate(fields: Fields): Errors {
  const errors: Errors = {}

  if (!fields.name.trim()) errors.name = 'Please enter your name.'

  if (!fields.email.trim()) {
    errors.email = 'Please enter an email address so we can reply.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = 'That email address does not look right.'
  }

  if (fields.message.trim().length < 10) {
    errors.message = 'Please write at least a sentence so we know how to help.'
  }

  return errors
}

const inputClasses =
  'w-full rounded-md border bg-canvas-deep px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint ' +
  'transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-signal'

/**
 * Contact form for a static site.
 *
 * There is no server here, so a valid submission opens the visitor's mail
 * client with the message pre-filled. To collect submissions server-side
 * instead, swap `handleSubmit` for a POST to a form service (Formspree, Netlify
 * Forms, Google Forms) — the validation and markup stay as they are.
 */
export function ContactForm() {
  const formId = useId()
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    // Clear the error as soon as the visitor starts fixing the field.
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const subject = `[${teamConfig.teamName}] ${fields.topic} — ${fields.name.trim()}`
    const body = `${fields.message.trim()}\n\n—\n${fields.name.trim()}\n${fields.email.trim()}`

    window.location.href = `mailto:${teamConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
    setFields(emptyFields)
  }

  const fieldError = (key: keyof Fields) => errors[key]

  return (
    <Panel padding="lg">
      <h2 className="text-xl font-semibold tracking-tight text-ink">Send us a message</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Fill this in and your email app will open with the message ready to send. Prefer to write
        directly? Use{' '}
        <a href={`mailto:${teamConfig.email}`} className="font-medium text-signal hover:underline">
          {teamConfig.email}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-ink">
            Your name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(fieldError('name'))}
            aria-describedby={fieldError('name') ? `${formId}-name-error` : undefined}
            placeholder="Alex Rivera"
            className={cn(inputClasses, fieldError('name') ? 'border-danger' : 'border-edge')}
          />
          {fieldError('name') && (
            <FieldError id={`${formId}-name-error`}>{fieldError('name')}</FieldError>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-email`} className="text-sm font-medium text-ink">
            Email address
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(fieldError('email'))}
            aria-describedby={fieldError('email') ? `${formId}-email-error` : undefined}
            placeholder="you@example.com"
            className={cn(inputClasses, fieldError('email') ? 'border-danger' : 'border-edge')}
          />
          {fieldError('email') && (
            <FieldError id={`${formId}-email-error`}>{fieldError('email')}</FieldError>
          )}
        </div>

        {/* Topic */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-topic`} className="text-sm font-medium text-ink">
            What is this about?
          </label>
          <select
            id={`${formId}-topic`}
            name="topic"
            value={fields.topic}
            onChange={(event) => update('topic', event.target.value)}
            className={cn(inputClasses, 'border-edge appearance-none pr-10')}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-message`} className="text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={fields.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(fieldError('message'))}
            aria-describedby={fieldError('message') ? `${formId}-message-error` : undefined}
            placeholder="Tell us a little about why you are getting in touch."
            className={cn(
              inputClasses,
              'resize-y',
              fieldError('message') ? 'border-danger' : 'border-edge',
            )}
          />
          {fieldError('message') && (
            <FieldError id={`${formId}-message-error`}>{fieldError('message')}</FieldError>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg">
            <Send aria-hidden="true" className="size-4" />
            Open email draft
          </Button>

          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={transitions.quick}
                role="status"
                className="inline-flex items-center gap-2 text-sm font-medium text-signal"
              >
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Your email app should be open — thanks for reaching out.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Panel>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.p
      id={id}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.quick}
      className="inline-flex items-center gap-1.5 text-sm text-danger"
    >
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </motion.p>
  )
}
