import Link from '@/node_modules/next/link'
import { TagsList } from './TagsList'
import TextEditor from './TextEditor'
import Title from './Title'

interface Params {
  id: string
}

interface Thought {
  text: string | null
  title: string | null
}

async function getThought(id: String) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/thought/' + id,
    {
      cache: 'no-store',
    },
  )

  return response.json()
}

export default async function Thought({ params }: { params: Params }) {
  const thought: Thought = await getThought(params.id)

  return (
    <main className='w-screen min-h-screen bg-background'>
      <div className='relative left-1/2 -translate-x-1/2 w-full max-w-4xl min-h-screen h-full flex flex-col pt-16 gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='w-full h-min flex items-center'>
            <Title title={thought.title} thoughtId={params.id} />
            <Link
              href='/homepage '
              className='bg-primary h-full px-6 rounded-lg h-full py-3 justify-self-end ml-auto'
            >
              Homepage
            </Link>
          </div>
          <TagsList thoughtId={params.id} />
        </div>
        <div className='h-0.5 w-full bg-neutral-400'></div>
        <TextEditor text={thought.text} thoughtId={params.id} />
      </div>
    </main>
  )
}
