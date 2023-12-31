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
            <span className={styles.name}>Welcome,</span>
            </div>
            <Image className={styles.img} src={session?.user?.image} alt= 'user pic' width={100} height={100} />
            <span>{session.user.name}</span>
            <span>{session.user.email}</span>
        </div>
        <Link href='/yourvideo'>view your videos</Link>
        <Link href='/addChannel'>Create a Channel</Link>
        <button className={styles.signout} onClick={signOut}><IoIosLogOut size={20}/> Logout</button>
    </div>
  )
}

export default Modal