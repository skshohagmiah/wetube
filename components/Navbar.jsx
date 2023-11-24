'use client';
import styles from '@/styles/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { ThemeContext } from '@/libs/ThemeProvider';
import { useContext } from 'react';
import AddVideo from './AddVideo';
import Search from './Search';
import Theme from './Theme';
import UserProfile from './UserProfile';


const Navbar = () => {
  const {mode} = useContext(ThemeContext);
  
  return (
    <div className={mode ? styles.lightContainer : styles.darkContainer}>
        <Link href='/' className={styles.logo}>
        <Image src='/youtube-logo.png' alt='logo image' width={50} height={50} />
        <span className={styles.hide}>VidShare</span>  
        </Link>
        <Search />
        <div className={styles.icons}>
          <Theme />
          <Link href='/addVideo'>
            <AddVideo />
          </Link>
          <UserProfile />
        </div>
    </div>
  )
}

export default Navbar