'use client'

import { useRef, useState } from 'react'

interface Params {
  id: number
  name: string
}

async function patchTag(id: number, name: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/tag', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
  return response
}

async function deleteTag(id: number) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/tag', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  return response
}

export function Tag({ id, name }: Params) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(name)
  const [width, setWidth] = useState(name.length)

  function handleClick() {
    inputRef.current?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == 'Enter') {
      inputRef.current?.blur()
    }
  }

  async function handleBlur() {
    if (value) {
      const response = await patchTag(id, value)
      if (response.status === 200) {
        console.log('saved')
      } else {
        console.log('failed')
      }
    } else {
      const response = await deleteTag(id)
      console.log(response)
    }
  }

  return (
    <div
      className='border-2 rounded-[16px] w-fit px-2 hover:cursor-pointer'
      onClick={() => {
        handleClick()
      }}
    >
      <input
        style={{ width: width + 'ch' }}
        className='outline-none text-center'
        ref={inputRef}
        value={value}
        onChange={event => {
          setValue(event.target.value)
          setWidth(event.target.value.length)
        }}
        onBlur={handleBlur}
        type='text'
        onFocus={event =>
          event.currentTarget.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length,
          )
        }
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  )
}
