'use client'

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Button from './Button'
import { analytics } from '@/lib/analytics'

type Role = 'writer' | 'investor' | 'partner'

interface FormState {
  role:      Role
  name:      string
  email:     string
  message:   string
  honeypot:  string
}

interface LeadFormProps {
  defaultRole?: Role
  onSuccess?:   () => void
}

const ROLES: { value: Role; label: string }[] = [
  { value: 'writer',   label: 'For Writers'   },
  { value: 'investor', label: 'For Investors'  },
  { value: 'partner',  label: 'For Partners'   },
]

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LeadForm({ defaultRole = 'writer', onSuccess }: LeadFormProps) {
  const id = useId()

  const [form, setForm] = useState<FormState>({
    role: defaultRole, name: '', email: '', message: '', honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email', string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [liveMsg, setLiveMsg] = useState('')

  function validate() {
    const e: typeof errors = {}
    if (!form.name.trim())              e.name  = '이름을 입력해 주세요.'
    if (!form.email.trim())             e.email = '이메일을 입력해 주세요.'
    else if (!isValidEmail(form.email)) e.email = '올바른 이메일 주소를 입력해 주세요.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate() || form.honeypot) return

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role:    form.role,
          name:    form.name.trim(),
          email:   form.email.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setLiveMsg('접수 완료. 48시간 내에 연락드리겠습니다.')
      analytics('form_submitted', { role: form.role })
      onSuccess?.()
    } catch {
      setStatus('error')
      setLiveMsg('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      analytics('form_error', { role: form.role })
    }
  }

  const inputCls =
    'w-full rounded-[10px] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] ' +
    'bg-[var(--bg-soft)] border border-[var(--border-subtle)] ' +
    'transition-all duration-150 focus:outline-none focus:border-[var(--accent-blue)] ' +
    'focus:ring-2 focus:ring-[rgba(79,140,255,0.2)]'

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 py-10 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={38} className="text-[var(--accent-blue)]" />
        <p className="font-bold text-[var(--text-primary)]" style={{ fontSize: '21px' }}>
          접수 완료
        </p>
        <p className="text-[var(--text-secondary)] leading-[1.7]" style={{ fontSize: '15px', maxWidth: '320px' }}>
          We&apos;ll reach out within 48 hours.
          <br />
          <span className="text-[var(--text-muted)]">감사합니다, {form.name}님.</span>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Early access sign-up">
      {/* Screen-reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMsg}
      </div>

      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-5">

        {/* Role selector */}
        <div>
          <p id={`${id}-role`} className="font-mono-label mb-3">역할 / Role</p>
          <div role="radiogroup" aria-labelledby={`${id}-role`} className="flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                role="radio"
                aria-checked={form.role === r.value}
                onClick={() => setForm((f) => ({ ...f, role: r.value }))}
                className={[
                  'flex-1 py-2.5 px-2 rounded-[12px] text-[13px] font-semibold border transition-all duration-150',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)]',
                  form.role === r.value
                    ? 'bg-[rgba(79,140,255,0.12)] border-[var(--accent-blue)] text-[var(--accent-blue)]'
                    : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[rgba(79,140,255,0.35)]',
                ].join(' ')}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor={`${id}-name`} className="font-mono-label block mb-2">
            이름 / Name
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }))
              if (errors.name) setErrors((er) => ({ ...er, name: undefined }))
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={`${inputCls} ${errors.name ? 'border-[#FF6B6B] ring-[rgba(255,107,107,0.15)]' : ''}`}
          />
          {errors.name && (
            <p id={`${id}-name-err`} role="alert" className="mt-1.5 flex items-center gap-1 text-[#FF6B6B]" style={{ fontSize: '12px' }}>
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${id}-email`} className="font-mono-label block mb-2">
            이메일 / Email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }))
              if (errors.email) setErrors((er) => ({ ...er, email: undefined }))
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={`${inputCls} ${errors.email ? 'border-[#FF6B6B] ring-[rgba(255,107,107,0.15)]' : ''}`}
          />
          {errors.email && (
            <p id={`${id}-email-err`} role="alert" className="mt-1.5 flex items-center gap-1 text-[#FF6B6B]" style={{ fontSize: '12px' }}>
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        {/* Optional message */}
        <div>
          <label htmlFor={`${id}-msg`} className="font-mono-label block mb-2">
            메시지 (선택 / Optional)
          </label>
          <textarea
            id={`${id}-msg`}
            rows={3}
            placeholder="간단히 소개해 주세요."
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Server error */}
        {status === 'error' && (
          <div
            role="alert"
            className="flex items-center gap-2 p-3 rounded-[10px] text-[#FF6B6B]"
            style={{
              background: 'rgba(255,107,107,0.08)',
              border: '1px solid rgba(255,107,107,0.25)',
              fontSize: '13px',
            }}
          >
            <AlertCircle size={15} />
            오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center mt-1"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '제출 중…' : '제출하기 →'}
        </Button>

      </div>
    </form>
  )
}
