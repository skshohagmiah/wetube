
import styles from '@/styles/search.module.css';
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <form className={styles.form}>
        <input type="text" placeholder='Search...' />
        <IoSearchOutline size={30} className={styles.search} />
    </form>
  )
}

export default Search