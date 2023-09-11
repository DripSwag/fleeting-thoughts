'use client'

import { useRouter } from '@/node_modules/next/navigation'
import { FormEvent, useState } from 'react'

export default function LoginForm() {
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
      router.push('/homepage')
    } else if (response.status === 204) {
      console.log('Not found')
    }
  }

  return (
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
  )
}
