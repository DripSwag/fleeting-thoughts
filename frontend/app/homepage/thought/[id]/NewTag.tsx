'use client'

import { useEffect, useRef, useState } from 'react'

interface Params {
  handleBlur: Function
}

export default function NewTag({ handleBlur }: Params) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [length, setLength] = useState(0)

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
          handleBlur(value)
        }}
        onChange={event => {
          setValue(event.currentTarget.value)
          setLength(event.currentTarget.value.length)
        }}
      ></input>
    </div>
  )
}
