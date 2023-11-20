'use client'
import { ThemeContext } from '@/libs/ThemeProvider'
import styles from '@/styles/theme.module.css'
import { useContext } from 'react'

const Theme = () => {

    const {mode, handleTheme} = useContext(ThemeContext);

    
  return (
    <div className={styles.container} onClick={handleTheme}>
        <div className={`${styles.ball} ${mode ? styles.left: styles.right}`}>
        </div>
    </div>
  )
}

export default Theme