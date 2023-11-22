'use client'
import styles from '@/styles/userProfile.module.css'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'


const UserProfile = () => {

  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open)
  }

  const {data:session} =  useSession()

  return (
    <div className={styles.container} onClick={handleModal}>
      <Image className={styles.img || '/google-logo.png'} src={session?.user.image} alt="user pic" width={50} height={50}/>
      <div>
        {open && <Modal />}
      </div>
    </div>
  )
}

export default UserProfile