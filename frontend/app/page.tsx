'use client'

import { useRouter } from '@/node_modules/next/navigation'
import { FormEvent, useState } from 'react'

interface UserResponse {
  id: number
}

async function login(username: string, password: string): Promise<Response> {
  const response = fetch('http://localhost:8001/login', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  return response
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await login(username, password)
    if (response.status === 200) {
      const body: UserResponse = await response.json()
      sessionStorage.setItem('userId', body.id.toString())
      router.push('/homepage')
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type='string'
          required
          className='border-2'
          onChange={event => {
            setUsername(event.currentTarget.value)
          }}
        ></input>
        <input
          type='password'
          required
          className='border-2'
          onChange={event => {
            setPassword(event.currentTarget.value)
          }}
        ></input>
        <button type='submit'>Login</button>
      </form>
    </main>
  )
}
