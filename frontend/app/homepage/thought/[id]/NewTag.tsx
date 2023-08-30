'use client'

import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { Tag } from './TagsList'

async function postTag(name: string, userId: number, thoughtId: number) {
  const response = await fetch('/api/tag', {
    method: 'POST',
    body: JSON.stringify({ name, userId, thoughtId }),
  })

  return await response.json()
}

interface Params {
  thoughtId: string
  addTag: Function
  hideSelf: Function
}

export default function NewTag({ thoughtId, addTag, hideSelf }: Params) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [length, setLength] = useState(0)

  async function handleBlur() {
    if (value) {
      try {
        const response: Tag = await postTag(
          value,
          parseInt(Cookies.get('userId') || '0'),
          parseInt(thoughtId),
        )
        addTag(response)
      } catch {
        addTag()
      }
    } else {
      hideSelf()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == 'Enter') {
      inputRef.current?.blur()
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
        className='text-center bg-background'
        value={value}
        placeholder='...'
        onBlur={() => {
          handleBlur()
        }}
        onChange={event => {
          setValue(event.currentTarget.value)
          setLength(event.currentTarget.value.length)
        }}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  )
}
