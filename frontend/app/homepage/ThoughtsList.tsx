'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import AddThought from './AddThought'
import TagFilter from './TagFilter'
import Thought from './Thought'

async function getThoughtsDatabase(tags: Array<string>) {
  const queryString: string = tags.length > 0 ? '&tags=' + tags.toString() : ''
  const response = await fetch(
    'api/homepage' + `?userId=${Cookies.get('userId') || '0'}` + queryString,
  )
  return response
}

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
  const [tags, setTags] = useState<Array<string>>([])

  async function getThoughts() {
    const response = await getThoughtsDatabase(tags)
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

  const addTag = useCallback(
    (name: string) => {
      setTags([...tags, name])
    },
    [tags],
  )

  const removeTag = useCallback(
    (index: number) => {
      const tempTags = [...tags]
      tempTags.splice(index, 1)
      setTags(tempTags)
    },
    [tags],
  )

  useEffect(() => {
    getThoughts()
  }, [tags])

  return (
    <div>
      <TagFilter tags={tags} addTag={addTag} removeTag={removeTag} />
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
    </div>
  )
}
