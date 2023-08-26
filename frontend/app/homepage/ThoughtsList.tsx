'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Thought from './Thought'

interface Thought {
  id: number
  userId: number
  text: string | null
  title: string | null
}

interface ThoughtsBody {
  thoughts: Array<Thought>
}

export default function ThoughtsList() {
  const [thoughts, setThoughts] = useState<Array<Thought>>([])

  console.log(thoughts)

  async function getThoughts() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ORIGIN +
        '/thought/user/' +
        Cookies.get('userId'),
    )
    console.log(response)
    if (response.status === 200) {
      const body: ThoughtsBody = await response.json()
      setThoughts(body.thoughts)
    } else {
      setThoughts([])
    }
  }

  useEffect(() => {
    getThoughts()
  }, [])

  return (
    <section className='grid grid-cols-3 gap-4 w-full'>
      {thoughts &&
        thoughts.map(value => {
          return (
            <Thought
              key={value.id}
              title={value.title}
              id={value.id}
              text={value.text}
            />
          )
        })}
    </section>
  )
}
