'use client'
import styles from '@/styles/modal.module.css';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";

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
        <button>
        <Link href='/addChannel'>Create a Channel</Link>
       </button>
        <button className={styles.signout} onClick={signOut}><IoIosLogOut size={20}/> Logout</button>
    </div>
  )
}

export default Modal