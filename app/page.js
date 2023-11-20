
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import { getUser } from '@/libs/getUser'

export default async function Home() {
  const user = await getUser()
  console.log(user)
  return (
    <div>
        {user ? (
          <div>
            welcome everyone
            <Logout />
          </div>
        ) 
        :(
          <Login />
        )}
    </div>
  )
}
