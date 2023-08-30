'use client'

import { FormEvent, useRef } from 'react'

async function updateTitle(title: string | null, id: number) {
  const response = await fetch('/api/thought', {
    method: 'PATCH',
    body: JSON.stringify({ title, id }),
  })

  return response
}

interface Params {
  title: string | null
  thoughtId: string
}

export default function Title({ title, thoughtId }: Params) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  function handleKeyDown(event: React.KeyboardEvent<HTMLHeadingElement>) {
    if (event.key == 'Enter') {
      event.preventDefault()
      headingRef.current?.blur()
    }
  }

  async function handleBlur(event: FormEvent<HTMLHeadingElement>) {
    const response = await updateTitle(
      event.currentTarget.textContent,
      parseInt(thoughtId),
    )
  }

  return (
    <h1
      contentEditable
      ref={headingRef}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className='min-w-[2em] border-b-2 text-4xl font-bold outline-none'
    >
      {title}
    </h1>
  )
}
