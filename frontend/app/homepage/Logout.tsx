'use client'

import { useRouter } from '@/node_modules/next/navigation'
import Cookies from 'js-cookie'

export default function Logout() {
  const router = useRouter()

  function handleClick() {
    Cookies.remove('ssid')
    Cookies.remove('userId')
    router.replace('/')
  }

  return (
    <button
      className='ml-auto bg-primary rounded-lg px-8 py-2'
      onClick={handleClick}
    >
      Logout
    </button>
  )
}
