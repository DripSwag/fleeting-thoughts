'use client'

import Cookies from 'js-cookie'
import { Thought } from './ThoughtsList'

async function postThought(userId: number) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/thought',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    },
  )

  return response.json()
}

interface Params {
  addThought: Function
}

export default function AddThought({ addThought }: Params) {
  async function handleClick() {
    const response: Thought = await postThought(
      parseInt(Cookies.get('userId') || '0'),
    )
    addThought(response)
  }

  return (
    <div
      className='bg-[#d1d9d0] rounded-lg p-4 static hover:cursor-pointer'
      onClick={handleClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        className='relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
      >
        <path d='M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z'></path>
      </svg>
    </div>
  )
}
