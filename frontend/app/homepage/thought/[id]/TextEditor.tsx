'use client'

import { useState } from 'react'

interface Params {
  text: String
}

export default function TextEditor({ text }: Params) {
  const [textValue, setTextValue] = useState(text)

  return (
    <textarea
      //@ts-ignore literals
      value={textValue}
      onChange={event => {
        setTextValue(event.currentTarget.value)
      }}
    ></textarea>
  )
}
