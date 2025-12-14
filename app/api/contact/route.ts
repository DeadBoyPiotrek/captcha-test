import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  console.log(`🚀 ~ POST ~ body:`, body)
  const { recaptchaToken } = body
  console.log(`🚀 ~ POST ~ recaptchaToken:`, recaptchaToken)

  // Verify reCAPTCHA token
  const verifyResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    }
  )
  console.log(`🚀 ~ POST ~ verifyResponse:`, verifyResponse)

  const verifyData = await verifyResponse.json()
  console.log(`🚀 ~ POST ~ verifyData:`, verifyData)

  if (!verifyData.success || verifyData.score < 0.5) {
    return NextResponse.json(
      { error: 'reCAPTCHA verification failed' },
      { status: 400 }
    )
  }
  console.log(`🚀 ~ POST ~ verifyData.success:`, verifyData.success)
  console.log(`🚀 ~ POST ~ verifyData.score:`, verifyData.score)

  // Process your form here
  // ... your business logic ...
  console.log(verifyData)
  return NextResponse.json({ success: true })
}
