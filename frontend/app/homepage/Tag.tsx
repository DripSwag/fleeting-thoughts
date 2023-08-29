'use client'

interface Params {
  name: string
  removeTag: Function
}

export default function Tag({ name, removeTag }: Params) {
  return (
    <div>
      <h1>{name}</h1>
      <button
        onClick={() => {
          removeTag()
        }}
      >
        X
      </button>
    </div>
  )
}
