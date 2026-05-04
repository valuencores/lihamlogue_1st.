'use client'

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import Button from './Button'
import { analytics } from '@/lib/analytics'

type Role = 'writer' | 'investor' | 'partner'

interface FormState {
  role: Role
  name: string
  email: string
  message: string
  honeypot: string
}

interface LeadFormProps {
  defaultRole?: Role
  onSuccess?: () => void
}

const ROLES: { value: Role; label: string; emoji: string }[] = [
  { value: 'writer',   label: 'For Writers',   emoji: '✍️' },
  { value: 'investor', label: 'For Investors',  emoji: '📊' },
  { value: 'partner',  label: 'For Partners',   emoji: '🤝' },
]

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LeadForm({ defaultRole = 'writer', onSuccess }: LeadFormProps) {
  const id = useId()
  const [form, setForm] = useState<FormState>({
    role: defaultRole,
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [liveMessage, setLiveMessage] = useState('')

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!form.name.trim())          newErrors.name  = '이름을 입력해 주세요.'
    if (!form.email.trim())         newErrors.email = '이메일을 입력해 주세요.'
    else if (!validateEmail(form.email)) newErrors.email = '올바른 이메일 주소를 입력해 주세요.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    if (form.honeypot) return // bot trap

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role:    form.role,
          name:    form.name.trim(),
          email:   form.email.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setLiveMessage('성공적으로 접수되었습니다. 48시간 내에 연락드리겠습니다.')
      analytics('form_submitted', { role: form.role })
      onSuccess?.()
    } catch {
      setStatus('error')
      setLiveMessage('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      analytics('form_error', { role: form.role })
    }
  }

  const inputBase =
    'w-full rounded-[8px] px-4 py-3 text-[var(--text-primary)] text-body placeholder:text-[var(--text-muted)] bg-[var(--bg-soft)] border border-[var(--border-subtle)] transition-all duration-150 focus:outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[rgba(79,140,255,0.24)]'

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 py-10 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={40} className="text-[var(--accent-blue)]" />
        <p className="text-h3 font-bold text-[var(--text-primary)]" style={{ fontSize: '22px' }}>
          접수 완료
        </p>
        <p className="text-[var(--text-secondary)] text-body" style={{ maxWidth: '340px' }}>
          We&apos;ll reach out within 48 hours.
          <br />
          <span className="text-[var(--text-muted)]">감사합니다, {form.name}님.</span>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Early access sign-up form">
      {/* Screen-reader live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      {/* Honeypot field (hidden from real users) */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input
          id={`${id}-hp`}
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-5">
        {/* Role selector */}
        <div>
          <p className="font-mono-label mb-3" id={`${id}-role-label`}>역할 / Role</p>
          <div role="radiogroup" aria-labelledby={`${id}-role-label`} className="flex gap-2">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                role="radio"
                aria-checked={form.role === r.value}
                onClick={() => setForm(f => ({ ...f, role: r.value }))}
                className={`flex-1 py-2.5 px-3 rounded-[14px] text-[13px] font-semibold border transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-blue)] ${
                  form.role === r.value
                    ? 'bg-[rgba(79,140,255,0.12)] border-[var(--accent-blue)] text-[var(--accent-blue)]'
                    : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[rgba(79,140,255,0.4)]'
                }`}
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
            onChange={e => {
              setForm(f => ({ ...f, name: e.target.value }))
              if (errors.name) setErrors(er => ({ ...er, name: undefined }))
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={`${inputBase} ${errors.name ? 'border-[#FF6B6B]' : ''}`}
          />
          {errors.name && (
            <p id={`${id}-name-err`} role="alert" className="mt-1.5 text-[12px] text-[#FF6B6B] flex items-center gap-1">
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
            onChange={e => {
              setForm(f => ({ ...f, email: e.target.value }))
              if (errors.email) setErrors(er => ({ ...er, email: undefined }))
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={`${inputBase} ${errors.email ? 'border-[#FF6B6B]' : ''}`}
          />
          {errors.email && (
            <p id={`${id}-email-err`} role="alert" className="mt-1.5 text-[12px] text-[#FF6B6B] flex items-center gap-1">
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
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Error state */}
        {status === 'error' && (
          <div
            role="alert"
            className="flex items-center gap-2 p-3 rounded-[8px] bg-[rgba(255,107,107,0.08)] border border-[rgba(255,107,107,0.3)] text-[#FF6B6B] text-[13px]"
          >
            <AlertCircle size={16} />
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
          aria-label="Submit sign-up form"
        >
          {status === 'loading' ? '제출 중...' : '제출하기 →'}
        </Button>
      </div>
    </form>
  )
}
