import ThoughtsList from './ThoughtsList'

//https://realtimecolors.com/?colors=081208-edf7ed-7ec9a1-d0ebeb-47a9a6

export default function Homepage() {
  return (
    <main className='min-h-screen w-screen bg-[#edf7ed]'>
      <h1>Thoughts</h1>
      <ThoughtsList />
    </main>
  )
}
