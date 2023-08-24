'use client'

import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { Tag } from './TagsList'

async function temp(name: string, userId: number, thoughtId: number) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, userId, thoughtId }),
  })

  return await response.json()
}

interface Params {
  thoughtId: string
  addTag: Function
}

export default function NewTag({ thoughtId, addTag }: Params) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [length, setLength] = useState(0)

  async function handleBlur() {
    if (value) {
      try {
        const response: Tag = await temp(
          value,
          parseInt(Cookies.get('userId') || '0'),
          parseInt(thoughtId),
        )
        addTag(response)
      } catch {
        addTag()
      }
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className='border-2 rounded-[16px] px-4'>
      <input
        ref={inputRef}
        style={{ width: length ? length + 'ch' : '2ch' }}
        className='text-center'
        value={value}
        placeholder='...'
        onBlur={() => {
          handleBlur()
        }}
        onChange={event => {
          setValue(event.currentTarget.value)
          setLength(event.currentTarget.value.length)
        }}
      ></input>
    </div>
  )
}
