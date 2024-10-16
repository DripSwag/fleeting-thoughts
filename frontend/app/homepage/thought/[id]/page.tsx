import Link from '@/node_modules/next/link'
import RemoveThought from './RemoveThought'
import { TagsList } from './TagsList'
import TextEditor from './TextEditor'
import Title from './Title'
import { cookies } from '@/node_modules/next/headers'

interface Thought {
  text: string | null
  title: string | null
}

async function getThought(id: String, ssid: string, userId: string) {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/thought?id=' + id
      : 'https://' + process.env.VERCEL_URL + '/api/thought?id=' + id
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      ssid,
      userId,
    },
  })

  const temp = await response.json()
  return temp
}

interface Params {
  id: string
}

export default async function Thought({ params }: { params: Params }) {
  const cookieStore = cookies()
  const thought: Thought = await getThought(
    params.id,
    cookieStore.get('ssid')?.value || '',
    cookieStore.get('userId')?.value || '',
  )

  return (
    <main className='w-screen min-h-screen bg-background'>
      <div className='relative left-1/2 -translate-x-1/2 w-full max-w-4xl min-h-screen h-full flex flex-col pt-16 gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='w-full h-min flex items-center'>
            <Title title={thought.title} thoughtId={params.id} />
            <div className='ml-auto flex items-center gap-4'>
              <RemoveThought id={params.id} />
              <Link
                href='/homepage '
                className='bg-primary h-full px-6 rounded-lg h-full py-3'
              >
                Homepage
              </Link>
            </div>
          </div>
          <TagsList thoughtId={params.id} />
        </div>
        <div className='h-0.5 w-full bg-neutral-400'></div>
        <TextEditor text={thought.text} thoughtId={params.id} />
      </div>
    </main>
  )
}
