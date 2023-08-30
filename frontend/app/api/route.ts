interface Body {
  username: string
  password: string
}

export async function PUT(request: Request) {
  const body: Body = await request.json()
  const response = await fetch(process.env.API_ORIGIN + '/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response
}
