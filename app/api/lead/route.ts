import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────
// SMART P&B — Lead capture API
// Ready for Supabase / Resend / Loops integration
// ─────────────────────────────────────────────

interface LeadPayload {
  role:    'writer' | 'investor' | 'partner'
  name:    string
  email:   string
  message?: string
}

// In-memory store (replace with Supabase insert or Resend/Loops API call)
const leads: Array<LeadPayload & { timestamp: string; id: string }> = []

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()

    // Validate required fields
    if (!body.role || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: role, name, email' },
        { status: 400 }
      )
    }

    if (!['writer', 'investor', 'partner'].includes(body.role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be writer, investor, or partner.' },
        { status: 400 }
      )
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const lead = {
      id:        crypto.randomUUID(),
      role:      body.role,
      name:      body.name.trim().slice(0, 200),
      email:     body.email.trim().toLowerCase().slice(0, 320),
      message:   body.message?.trim().slice(0, 1000) ?? '',
      timestamp: new Date().toISOString(),
    }

    // ── Store the lead ─────────────────────────────────
    // TODO: Replace with real integration, e.g.:
    //
    //   // Supabase:
    //   const { error } = await supabase.from('leads').insert(lead)
    //   if (error) throw error
    //
    //   // Resend:
    //   await resend.emails.send({
    //     from: 'SMART P&B <noreply@reehamlog.com>',
    //     to:   ['contact@reehamlog.com'],
    //     subject: `New ${lead.role} lead: ${lead.name}`,
    //     text: JSON.stringify(lead, null, 2),
    //   })
    //
    //   // Loops:
    //   await loops.sendTransactionalEmail({ transactionalId: '...', email: lead.email, ... })
    //
    leads.push(lead)

    console.log('[lead]', JSON.stringify(lead))

    return NextResponse.json(
      { success: true, message: "We'll reach out within 48 hours." },
      { status: 200 }
    )
  } catch (err) {
    console.error('[lead API error]', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

// GET endpoint for debug/admin use (protect in production)
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return NextResponse.json({ count: leads.length, leads })
}
