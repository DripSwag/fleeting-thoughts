'use client'

import React, { useRef } from 'react'
import Tag from './Tag'

interface Params {
  tags: Array<string>
  addTag: Function
  removeTag: Function
}

export default function TagFilter({ tags, addTag, removeTag }: Params) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === ' ') {
      event.preventDefault()
      addTag(inputRef.current?.value)
      //@ts-ignore
      inputRef.current.value = ''
    }
  }

  return (
    <div className='my-2 p-2 flex border-2 gap-2'>
      {tags &&
        tags.map((value, index) => {
          return (
            <Tag
              name={value}
              key={index}
              removeTag={() => {
                removeTag(index)
              }}
            />
          )
        })}
      <input
        ref={inputRef}
        className='w-full bg-background'
        placeholder='Add a tag...'
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  )
}
