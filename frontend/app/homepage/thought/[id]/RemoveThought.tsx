'use client'

import { useRouter } from '@/node_modules/next/navigation'

export async function deleteThought(id: string) {
  const response = await fetch('/api/thought?id=' + id, {
    method: 'DELETE',
  })

  return response
}

interface Params {
  id: string
}

export default function RemoveThought({ id }: Params) {
  const router = useRouter()

  async function handleClick() {
    const response = await deleteThought(id)
    if (response.status === 200) {
      router.replace('/homepage')
    }
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='hover:cursor-pointer'
      onClick={handleClick}
    >
      <path d='M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z'></path>
      <path d='M9 10h2v8H9zm4 0h2v8h-2z'></path>
    </svg>
  )
}
