'use client'

import stringToColour from '@/scripts/stringToColour'

interface Params {
  name: string
  removeTag: Function
}

function getColour(name: string) {
  const hexCode = stringToColour(name)
  return { color: hexCode, borderColor: hexCode }
}

export default function Tag({ name, removeTag }: Params) {
  return (
    <div
      className={'flex gap-2 border px-2 rounded-xl'}
      style={getColour(name)}
    >
      <h1>{name}</h1>
      <button
        onClick={() => {
          removeTag()
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 aspect-square hover:fill-neutral-700'
          viewBox='0 0 24 24'
          data-darkreader-inline-fill=''
        >
          <path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'></path>
        </svg>
      </button>
    </div>
  )
}
