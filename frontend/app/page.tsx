import Link from '@/node_modules/next/link'
import LoginForm from './LoginForm'

export default function Home() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm />
      <Link href={'/signup'}>Sign Up</Link>
    </main>
  )
}
