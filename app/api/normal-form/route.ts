import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const body = await request.json()
  console.log(`🚀 ~ PUT ~ body:`, body)
  const { name } = body
  console.log(`🚀 ~ PUT ~ name:`, name)
  return NextResponse.json({ success: true })
}