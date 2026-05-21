import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

// Serve landing page HTML at / without any redirect
// URL stays as-is — no /landing.html visible to the user
export async function GET() {
  const html = readFileSync(join(process.cwd(), 'public', 'landing.html'), 'utf-8')
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
