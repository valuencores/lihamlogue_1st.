import { NextRequest, NextResponse } from 'next/server'

type Role = 'writer' | 'investor' | 'partner'

interface LeadPayload {
  role:     Role
  name:     string
  email:    string
  message?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()
    const { role, name, email, message } = body

    // ── Validation ──────────────────────────────
    const validRoles: Role[] = ['writer', 'investor', 'partner']
    if (!validRoles.includes(role))     return NextResponse.json({ error: 'Invalid role'  }, { status: 400 })
    if (!name?.trim())                  return NextResponse.json({ error: 'Name required' }, { status: 400 })
    if (!email?.trim() || !isValidEmail(email))
                                        return NextResponse.json({ error: 'Valid email required' }, { status: 400 })

    // ── Log submission (dev) ─────────────────────
    console.log('[lead]', { role, name, email: email.toLowerCase(), message: message?.slice(0, 280) })

    // ── TODO: integrate your email / CRM service ─
    // e.g. Resend, Loops, Supabase insert, etc.
    //
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from:    'SMART P&B <noreply@smartpb.co>',
    //   to:      email,
    //   subject: 'We received your request — SMART P&B',
    //   html:    `<p>Hi ${name}, we'll be in touch within 48 hours.</p>`,
    // })
    //
    // await supabase.from('leads').insert({ role, name, email, message })

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
