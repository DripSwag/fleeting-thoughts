'use client'

import { useRouter } from '@/node_modules/next/navigation'
import { FormEvent, useState } from 'react'
import Cookies from 'js-cookie'

interface UserResponse {
  id: number
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch('/api', {
      method: 'PUT',
      body: JSON.stringify({ username: username, password: password }),
    })
    if (response.status === 200) {
      const body: UserResponse = await response.json()
      Cookies.set('userId', body.id.toString())
      router.push('/homepage')
    } else {
      console.log('Error or incorrect')
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
