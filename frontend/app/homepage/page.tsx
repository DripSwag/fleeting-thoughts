import Logout from './Logout'
import ThoughtsList from './ThoughtsList'

//https://realtimecolors.com/?colors=081208-edf7ed-7ec9a1-d0ebeb-47a9a6

export default function Homepage() {
  return (
    <main className='min-h-screen w-screen bg-background flex justify-center pt-12'>
      <div className='max-w-4xl w-full flex flex-col gap-4'>
        <div className='flex'>
          <h1 className='text-5xl font-bold'>Thoughts</h1>
          <Logout />
        </div>
        <ThoughtsList />
      </div>
    </main>
  )
}
