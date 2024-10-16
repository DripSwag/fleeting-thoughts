'use client'

import { useEffect, useState } from 'react'

interface Params {
  text: string | null
  thoughtId: string | null
}

async function putNewText(text: string, id: number) {
  const response = await fetch('/api/thought', {
    method: 'PUT',
    body: JSON.stringify({ text: text, id: id }),
  })
  return response
}

export default function TextEditor({ text, thoughtId }: Params) {
  const [textValue, setTextValue] = useState<string>(text || '')

  useEffect(() => {
    let timer = setTimeout(() => {
      putNewText(textValue || '', parseInt(thoughtId || ''))
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
