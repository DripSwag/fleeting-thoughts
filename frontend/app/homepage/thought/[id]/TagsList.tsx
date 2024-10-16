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
    const response = await fetch('/api/tag?id=' + thoughtId)
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

  const removeTag = useCallback(
    (indexPop: number) => {
      const filtered = tags.filter((value, index) => {
        return index != indexPop
      })
      setTags(filtered)
    },
    [tags],
  )

  const hideNewTag = useCallback(() => {
    setNewTag(false)
  }, [newTag])

  useEffect(() => {
    getTags()
  }, [])

  return (
    <div className='flex items-center py-2 gap-2'>
      {tags &&
        tags.map((value, index) => {
          return (
            <Tag
              key={value.id}
              id={value.id}
              name={value.tag.name}
              index={index}
              removeTag={removeTag}
            />
          )
        })}
      {newTag && (
        <NewTag thoughtId={thoughtId} addTag={addTag} hideSelf={hideNewTag} />
      )}
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
