import { Tag } from './Tag'

interface Params {
  thoughtId: string
}

interface Tag {
  id: number
  tag: { name: string }
}

async function test(id: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/tag/thought/' + id,
  )
  return response.json()
}

export async function TagsList({ thoughtId }: Params) {
  const response: Array<Tag> = await test(thoughtId)

  console.log(response)

  return (
    <div>
      <Tag />
    </div>
  )
}
