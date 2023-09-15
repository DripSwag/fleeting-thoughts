import { NextRequest, NextResponse } from './node_modules/next/server'

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/homepage/thought')) {
    const thoughtId = request.nextUrl.pathname.match(/\d+/g)?.at(0) || ''
    const response = await fetch(process.env.API_ORIGIN + '/verify/thought', {
      headers: {
        ssid: request.cookies.get('ssid')?.value || '',
        thoughtId,
      },
    })
    if (response.status === 401) {
      return NextResponse.redirect(new URL('/homepage', request.url))
    }
  }
}
