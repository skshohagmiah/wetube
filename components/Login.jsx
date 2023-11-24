'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import styles from '../styles/login.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
        <span className={styles.info}>To use this app sign in first</span>
        <div className={styles.login} onClick={() => signIn('google')}>
           <Image src='/google-logo.png' alt='user image' height={50} width={50}/>
           <button>sign in with google</button>
        </div>
    </div>
  )
}

export default Login