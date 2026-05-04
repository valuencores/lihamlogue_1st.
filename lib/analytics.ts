// ─────────────────────────────────────────────
// SMART P&B — Analytics hooks (no-op stubs)
// Replace with real provider (Posthog, Mixpanel, etc.)
// ─────────────────────────────────────────────

type EventName =
  | 'cta_waitlist_clicked'
  | 'cta_investor_clicked'
  | 'cta_partner_clicked'
  | 'nav_waitlist_clicked'
  | 'manifesto_read'
  | 'form_submitted'
  | 'form_error'
  | 'modal_opened'
  | 'modal_closed'

type EventProperties = Record<string, string | number | boolean | undefined>

export function analytics(event: EventName, properties?: EventProperties): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', event, properties)
  }
  // TODO: replace with real analytics call
  // e.g. posthog.capture(event, properties)
}

export function pageView(path: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics] pageView', path)
  }
}
