'use client'

import { useEffect, useState } from 'react'

interface Thought {
  id: number
  userId: number
  text: string
}

interface ThoughtsBody {
  thoughts: Array<Thought>
}

export default function ThoughtsList() {
  const [thoughts, setThoughts] = useState<Array<Thought>>([])

  async function getThoughts() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ORIGIN +
        '/thought/' +
        sessionStorage.getItem('userId'),
    )
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
    <section>
      {thoughts &&
        thoughts.map(value => {
          return <div key={value.id}>{value.text}</div>
        })}
      <button
        onClick={() => {
          console.log(thoughts)
        }}
      >
        Test
      </button>
    </section>
  )
}
