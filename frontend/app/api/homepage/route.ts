export async function GET(request: Request) {
  const url = new URL(request.url)
  const tags = url.searchParams.get('tags') || ''
  const queryString: string = tags.length > 0 ? '?tags=' + tags.toString() : ''
  const response = await fetch(
    process.env.API_ORIGIN +
      '/thought/user/' +
      (url.searchParams.get('userId') || '0') +
      queryString,
    {
      cache: 'no-store',
    },
  )
  return response
}

export async function POST(request: Request) {
  const body = await request.json()
  const response = await fetch(process.env.API_ORIGIN + '/thought', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response
}
