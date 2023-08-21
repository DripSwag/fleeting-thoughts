import TextEditor from './TextEditor'

interface Params {
  id: String
}

interface Thought {
  text: String
}

async function getThought(id: String) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/thought/' + id,
  )
  return response.json()
}

export default async function Thought({ params }: { params: Params }) {
  const thought: Thought = await getThought(params.id)
  console.log(thought)

  return (
    <main>
      <h1>Thought {params.id.toString()}</h1>
      <TextEditor text={thought.text} />
    </main>
  )
}
