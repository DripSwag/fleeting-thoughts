'use client'

import { useEffect, useState } from 'react'

interface Params {
  text: string
  thoughtId: string
}

async function putNewText(text: string, id: number) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/thought',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text, id: id }),
    },
  )
  return response
}

export default function TextEditor({ text, thoughtId }: Params) {
  const [textValue, setTextValue] = useState(text)

  useEffect(() => {
    let timer = setTimeout(() => {
      putNewText(textValue, parseInt(thoughtId))
      console.log('saved')
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [textValue])

  return (
    <textarea
      className='w-full h-full resize-none grow bg-background text-lg outline-none '
      //@ts-ignore literals moment
      value={textValue}
      onChange={event => {
        setTextValue(event.currentTarget.value)
      }}
    ></textarea>
  )
}
