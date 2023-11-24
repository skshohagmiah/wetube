'use client'
import styles from '@/styles/search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
const [value,setValue] = useState();
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e){
    e.preventDefault()
    params.set('q',value);
    router.replace(`${pathname}?search=${params.get('q')}`)
  //  router.push('/')
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='Search...' />
        <IoSearchOutline size={30} className={styles.search} />
    </form>
  )
}

export default Search