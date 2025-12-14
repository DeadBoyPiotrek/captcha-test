import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { recaptchaToken } = body

  // Verify reCAPTCHA token
  const verifyResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    }
  )

  const verifyData = await verifyResponse.json()

  if (!verifyData.success || verifyData.score < 0.5) {
    return NextResponse.json(
      { error: 'reCAPTCHA verification failed' },
      { status: 400 }
    )
  }

  // Process your form here
  // ... your business logic ...
  console.log(verifyData)
  return NextResponse.json({ success: true })
}
