'use client'

import { useCallback, useEffect, useState } from 'react'
import NewTag from './NewTag'
import { Tag } from './Tag'

export interface Tag {
  id: number
  tag: { name: string }
}

interface Params {
  thoughtId: string
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

  const addTag = useCallback(
    (newTag: Tag) => {
      if (newTag) {
        setTags([...tags, newTag])
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
      {newTag && <NewTag thoughtId={thoughtId} addTag={addTag} />}
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
