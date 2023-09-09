import { cookies } from '@/node_modules/next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const cookieStore = cookies()
  const response = await fetch(process.env.API_ORIGIN + '/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ssid: cookieStore.get('ssid')?.value,
      userId: cookieStore.get('userId')?.value,
    },
    body: JSON.stringify(body),
  })

  return response
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const cookieStore = cookies()
  const response = await fetch(process.env.API_ORIGIN + '/tag', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ssid: cookieStore.get('ssid')?.value,
      userId: cookieStore.get('userId')?.value,
    },
    body: JSON.stringify(body),
  })

  return response
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const cookieStore = cookies()
  const response = await fetch(process.env.API_ORIGIN + '/tag', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ssid: cookieStore.get('ssid')?.value,
      userId: cookieStore.get('userId')?.value,
    },
    body: JSON.stringify(body),
  })

  return response
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const cookieStore = cookies()
  const response = await fetch(
    process.env.API_ORIGIN + '/tag/thought/' + url.searchParams.get('id') ||
      '0',
    {
      cache: 'no-store',
      headers: {
        ssid: cookieStore.get('ssid')?.value,
        userId: cookieStore.get('userId')?.value,
      },
    },
  )

  return response
}
