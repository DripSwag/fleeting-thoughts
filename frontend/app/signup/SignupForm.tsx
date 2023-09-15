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
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <div className='p-4 rounded-lg focus-within:drop-shadow-lg border-2 bg-white flex gap-2'>
        <input
          type='text'
          placeholder='Username'
          className='outline-none'
          onChange={event => {
            setUsername(event.currentTarget.value)
          }}
        ></input>
      </div>
      <div className='p-4 rounded-lg focus-within:drop-shadow-lg border-2 bg-white flex gap-2'>
        <input
          type='password'
          placeholder='Password'
          className='outline-none'
          onChange={event => {
            setPassword(event.currentTarget.value)
          }}
        ></input>
      </div>
      <button type='submit' className='rounded-xl px-8 py-2 mt-8 bg-[#7ec9a1]'>
        Register
      </button>
    </form>
  )
}
