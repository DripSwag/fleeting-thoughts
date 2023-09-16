import { cookies } from '@/node_modules/next/headers'
import { NextResponse } from '@/node_modules/next/server'

interface RequestBody {
  username: string
  password: string
}

interface DetailsBody {
  id: number
  token: {
    id: string
    expireDate: string
    createDate: string
  }
}

export async function PUT(request: Request) {
  const body: RequestBody = await request.json()
  const response = await fetch(process.env.API_ORIGIN + '/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.status === 200) {
    const cookieStore = cookies()
    const details: DetailsBody = await response.json()
    cookieStore.set('ssid', details.token.id, {
      expires: Date.parse(details.token.expireDate),
    })
    cookieStore.set('userId', details.id.toString())
    return NextResponse.json(details)
  } else {
    return NextResponse.json((await response.json()) || {}, {
      status: response.status,
    })
  }
}
