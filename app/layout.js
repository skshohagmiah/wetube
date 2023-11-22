import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/libs/AuthProvider'
import { ThemeProvider } from '@/libs/ThemeProvider'
import { getUser } from '@/libs/getUser'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'],weight:[ '400', "500", '700']})

export const metadata = {
  title: 'VidShare',
  description: 'video sharing app',
}

export default async function RootLayout({ children }) {

  const user = await getUser()

  return (
    <html lang="en">
      <AuthProvider>
        <body className={poppins.className}>
        <ThemeProvider>
          <div className='container'>
            {user ? (
              <>
                <Navbar />
                {children}
              </>
              ):(
              <Login />)
            }
            </div>
        </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
