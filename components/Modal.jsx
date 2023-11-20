'use client'
import styles from '@/styles/modal.module.css';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';


const Modal = () => {

    const {data:session} = useSession();

  return (
    <div className={styles.container}>
        <div className={styles.user}>
            <div className={styles.userInfo}>
            <span className={styles.name}>Hello,</span>
            <span>{session.user.name}</span>
            </div>
            <Image className={styles.img} src={session?.user?.image} alt= 'user pic' width={100} height={100} />
        </div>
        <button>View your profile</button>
        <button>view your videos</button>
        <button onClick={signOut}>Logout</button>
    </div>
  )
}

export default Modal