
import styles from '@/styles/navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

import AddVideo from './AddVideo'
import Notification from './Notification'
import Search from './Search'
import Theme from './Theme'
import UserProfile from './UserProfile'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <Link href='/' className={styles.logo}>
        <Image src='/youtube-logo.png' alt='logo image' width={50} height={50} />
        <span className={styles.hide}>VidShare</span>  
        </Link>
        <Search />
        <div className={styles.icons}>
          <Theme />
          <AddVideo />
          <Notification />
          <UserProfile />
        </div>
    </div>
  )
}

export default Navbar