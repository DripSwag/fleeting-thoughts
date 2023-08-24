'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import NewTag from './NewTag'
import { Tag } from './Tag'

interface Tag {
  id: number
  tag: { name: string }
}

async function postTag(name: string, userId: number, thoughtId: number) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, userId, thoughtId }),
  })

  return await response.json()
}

interface Params {
  thoughtId: string
}

interface NewTag {
  name: string
  thoughtTags: Array<{ id: number }>
}

export function TagsList({ thoughtId }: Params) {
  const [tags, setTags] = useState<Array<Tag>>([])
  const [newTag, setNewTag] = useState(false)

  async function getTags() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ORIGIN + '/tag/thought/' + thoughtId,
    )
    if (response.status === 200) {
      const body: Array<Tag> = await response.json()
      setTags(body)
    }
  }

  const handleNewTagBlur = useCallback(
    async (name: string) => {
      if (name) {
        const response: NewTag = await postTag(
          name,
          parseInt(Cookies.get('userId') || '0'),
          parseInt(thoughtId),
        )
        if (response) {
          //this is dumb
          const parsedResponse: Tag = {
            id: response.thoughtTags[0].id,
            tag: { name: response.name },
          }
          setTags([...tags, parsedResponse])
        }
      }
      setNewTag(false)
    },
    [tags, newTag],
  )

  useEffect(() => {
    getTags()
  }, [])

  return (
    <div className='flex items-center py-2'>
      {tags &&
        tags.map(value => {
          return <Tag key={value.id} id={value.id} name={value.tag.name} />
        })}
      {newTag && <NewTag handleBlur={handleNewTagBlur} />}
      <div
        className='border-2 rounded-[16px] w-fit px-2 hover:cursor-pointer text-center'
        onClick={() => {
          setNewTag(!newTag)
        }}
      >
        +
      </div>
    </div>
  )
}
