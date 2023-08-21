interface Params {
  id: Number
}

export default function Thought({ params }: { params: Params }) {
  return (
    <main>
      <h1>Thought {params.id.toString()}</h1>
    </main>
  )
}
