'use client'

import { useRouter } from '@/node_modules/next/navigation'
import { FormEvent, useState } from 'react'
import PasswordIcon from './PasswordIcon'
import UserIcon from './UserIcon'

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
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <div className='p-4 rounded-lg focus-within:drop-shadow-lg border-2 bg-white flex gap-2'>
        <UserIcon />
        <input
          type='string'
          required
          className='outline-none'
          placeholder='Username'
          onChange={event => {
            setUsername(event.currentTarget.value)
          }}
        ></input>
      </div>
      <div className='p-4 rounded-lg focus-within:drop-shadow-lg border-2 bg-white flex gap-2'>
        <PasswordIcon />
        <input
          type='password'
          required
          className='outline-none'
          placeholder='Password'
          onChange={event => {
            setPassword(event.currentTarget.value)
          }}
        ></input>
      </div>
      <button type='submit' className='rounded-xl px-8 py-2 mt-8 bg-[#7ec9a1]'>
        Login
      </button>
    </form>
  )
}
