import { cookies } from '@/node_modules/next/headers'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const url = new URL(request.url)
  const response = await fetch(
    process.env.API_ORIGIN + '/thought/' + url.searchParams.get('id') || '0',
    {
      cache: 'no-store',
      headers: {
        ssid: request.headers.get('ssid') || '',
        userId: request.headers.get('userId') || '',
      },
    },
  )

  return response
}

export async function DELETE(request: Request) {
  const cookieStore = cookies()
  const url = new URL(request.url)
  const response = await fetch(
    process.env.API_ORIGIN + '/thought/' + url.searchParams.get('id' || '0'),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ssid: cookieStore.get('ssid')?.value,
        userId: cookieStore.get('userId')?.value,
      },
    },
  )

  return response
}

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const body = await request.json()
  const response = await fetch(process.env.API_ORIGIN + '/thought', {
    method: 'PUT',
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
  const cookieStore = cookies()
  const body = await request.json()
  const response = await fetch(process.env.API_ORIGIN + '/thought', {
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
