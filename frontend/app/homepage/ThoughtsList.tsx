'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Thought from './Thought'

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
    <section>
      {thoughts &&
        thoughts.map(value => {
          return <Thought key={value.id} text={value.text} id={value.id} />
        })}
    </section>
  )
}
