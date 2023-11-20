'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = () => {
  return (
    <div>
        <span>To use this app sign in first</span>
        <div onClick={() => signIn('google')}>
           <Image src='/google-logo.png' alt='user image' height={50} width={50}/>
           <button>sign in with google</button>
        </div>
    </div>
  )
}

export default Login