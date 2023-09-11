'use client'

import { useRouter } from '@/node_modules/next/navigation'
import { FormEvent, useState } from 'react'

export default function SignupForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
    })
    if (response.status === 201) {
      router.replace('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={event => {
          setUsername(event.currentTarget.value)
        }}
      ></input>
      <input
        type='password'
        onChange={event => {
          setPassword(event.currentTarget.value)
        }}
      ></input>
      <button type='submit'>Register</button>
    </form>
  )
}
