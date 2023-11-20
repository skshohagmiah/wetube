
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import { getUser } from '@/libs/getUser'

export default async function Home() {
  const user = await getUser()
  return (
         <div className='container'>
            {user ? (
              <div >
                <Navbar />
              </div>
              ):(
              <Login />)
            }
        </div>
  )
}
