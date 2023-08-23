'use client'

import { useEffect, useState } from 'react'
import { Tag } from './Tag'

interface Params {
  thoughtId: string
}

interface Tag {
  id: number
  tag: { name: string }
}

export function TagsList({ thoughtId }: Params) {
  const [tags, setTags] = useState<Array<Tag>>([])

  async function getTags() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ORIGIN + '/tag/thought/' + thoughtId,
    )
    if (response.status === 200) {
      const body: Array<Tag> = await response.json()
      setTags(body)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <div>
      {tags &&
        tags.map(value => {
          return <Tag key={value.id} id={value.id} name={value.tag.name} />
        })}
    </div>
  )
}
