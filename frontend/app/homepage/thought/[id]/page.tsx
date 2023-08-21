import TextEditor from './TextEditor'

interface Params {
  id: string
}

interface Thought {
  text: string
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
    <main className='w-screen h-screen'>
      <div className='relative left-1/2 -translate-x-1/2 w-full max-w-4xl h-full flex flex-col'>
        <h1 className='w-max'>Thought {params.id.toString()}</h1>
        <TextEditor text={thought.text} thoughtId={params.id} />
      </div>
    </main>
  )
}
