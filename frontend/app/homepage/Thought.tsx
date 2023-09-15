interface Params {
  title: string | null
  id: number
  text: string | null
}

const LEGNTH = 50

export default function Thoght({ title, id, text }: Params) {
  return (
    <a href={'/homepage/thought/' + id.toString()}>
      <div className='rounded-lg p-4 bg-[#d1d9d0]'>
        <h1 className='text-xl font-medium'>{title || 'No title'}</h1>
        <p className='whitespace-pre-wrap'>
          {text?.substring(0, LEGNTH)}
          {text?.length || 0 > 50 ? '...' : ''}
        </p>
      </div>
    </a>
  )
}
