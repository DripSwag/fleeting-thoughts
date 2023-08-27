'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import AddThought from './AddThought'
import Thought from './Thought'

export interface Thought {
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

  async function getThoughts() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ORIGIN +
        '/thought/user/' +
        Cookies.get('userId'),
    )
    if (response.status === 200) {
      const body: ThoughtsBody = await response.json()
      setThoughts(body.thoughts)
    } else {
      setThoughts([])
    }
  }

  const addThought = useCallback(
    (newThought: Thought) => {
      setThoughts([...thoughts, newThought])
    },
    [thoughts],
  )

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
      <AddThought addThought={addThought} />
    </section>
  )
}
