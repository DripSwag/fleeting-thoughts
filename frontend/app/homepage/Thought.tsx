interface Params {
  text: string
  id: number
}

export default function Thoght({ text, id }: Params) {
  return <a href={'/homepage/thought/' + id.toString()}>{text}</a>
}
