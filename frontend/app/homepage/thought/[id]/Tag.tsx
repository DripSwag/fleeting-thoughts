'use client'

import { useRef, useState } from 'react'
import stringToColour from '@/scripts/stringToColour'

async function patchTag(id: number, name: string) {
  const response = await fetch('/api/tag', {
    method: 'PATCH',
    body: JSON.stringify({ id, name }),
  })
  return response
}

async function deleteTagServer(id: number) {
  const response = await fetch('/api/tag', {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })

  return response
}

function getColour(name: string) {
  const hexCode = stringToColour(name)
  return { color: hexCode, borderColor: hexCode }
}

interface Params {
  id: number
  name: string
  index: number
  removeTag: Function
}

export function Tag({ id, name, index, removeTag }: Params) {
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

  async function deleteTag() {
    const response = await deleteTagServer(id)
    if (response.status === 200) {
      removeTag(index)
    }
    console.log(response)
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
      deleteTag()
    }
  }

  return (
    <div
      className='border rounded-[16px] w-fit px-2 hover:cursor-pointer flex items-center'
      onClick={() => {
        handleClick()
      }}
      style={getColour(name)}
    >
      <input
        style={{ width: width ? width + 'ch' : '2ch' }}
        className='outline-none text-center hover:cursor-pointer bg-background'
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
        maxLength={20}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        onClick={deleteTag}
        className='text-sm text-neutral-400 hover:text-neutral-600 text-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 aspect-square hover:fill-neutral-700'
          viewBox='0 0 24 24'
          data-darkreader-inline-fill=''
        >
          <path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'></path>
        </svg>
      </button>
    </div>
  )
}
