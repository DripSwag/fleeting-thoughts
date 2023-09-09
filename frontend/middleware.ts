import { NextRequest } from './node_modules/next/server'

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/homepage')) {
    const cookie = request.cookies
    console.log(cookie.get('ssid'))
    return
  }
  return
}
