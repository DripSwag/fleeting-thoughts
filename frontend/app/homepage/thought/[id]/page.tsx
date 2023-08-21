'use client'

interface Params {
  id: Number
}

async function getThought(id: String) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ORIGIN + '/thought/' + id,
  )
  console.log(await response.json())
}

export default function Thought({ params }: { params: Params }) {
  function handleClick() {
    getThought(params.id.toString())
  }

  return (
    <main>
      <h1>Thought {params.id.toString()}</h1>
      <button onClick={handleClick}>Test</button>
    </main>
  )
}
