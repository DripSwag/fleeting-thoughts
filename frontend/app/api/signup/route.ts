import { NextResponse } from '@/node_modules/next/server'

export async function POST(request: Request) {
  const response = await fetch(process.env.API_ORIGIN + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await request.json()),
  })
  return NextResponse.json((await response.json()) || {}, {
    status: response.status,
  })
}
