import { useRouter } from '@/node_modules/next/navigation'

interface Params {
  text: string
  id: number
}

export default function Thoght({ text, id }: Params) {
  const router = useRouter()

  function handleClick() {
    router.push('/homepage/thought/' + id.toString())
  }

  return (
    <div onClick={handleClick}>
      <h1>{text}</h1>
    </div>
  )
}
