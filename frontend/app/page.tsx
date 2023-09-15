import Link from '@/node_modules/next/link'
import LoginForm from './LoginForm'

//https://realtimecolors.com/?colors=131b1a-f3f6f6-7ec9a1-d0ebeb-47a9a6

export default function Home() {
  return (
    <main className='w-screen h-screen flex justify-center items-center bg-[#f3f6f6]'>
      <div className='flex flex-col items-center max-w-sm w-full gap-16'>
        <h1 className='text-5xl font-bold'>Login</h1>
        <LoginForm />
        <p className='text-neutral-500'>
          Don&apos;t have an account?{' '}
          <Link href={'/signup'} className='font-bold text-[#7ec9a1]'>
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}
