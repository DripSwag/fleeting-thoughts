import SignupForm from './SignupForm'
import Link from '@/node_modules/next/link'

export default function SignUp() {
  return (
    <main className='w-screen h-screen flex justify-center items-center bg-[#f3f6f6]'>
      <div className='flex flex-col items-center max-w-sm w-full gap-16'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-5xl font-bold'>Create Account</h1>
          <p className='text-neutral-500'>Please enter your details</p>
        </div>
        <SignupForm />
        <p>
          Already have an account?{' '}
          <Link href={'/'} className='text-[#7ec9a1] font-bold'>
            Login Here
          </Link>
        </p>
      </div>
    </main>
  )
}
