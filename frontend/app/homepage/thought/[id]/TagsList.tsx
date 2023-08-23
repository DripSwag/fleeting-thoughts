import { Tag } from './Tag'

interface Params {
  thoughtId: string
}

interface Tag {
  id: number
  tag: { name: string }
}

async function getTags(id: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/tag/thought/' + id,
  )
  return response.json()
}

export async function TagsList({ thoughtId }: Params) {
  const tags: Array<Tag> = await getTags(thoughtId)

  return (
    <div>
      {tags &&
        tags.map(value => {
          return <Tag key={value.id} id={value.id} name={value.tag.name} />
        })}
    </div>
  )
}
