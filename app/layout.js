import { AuthProvider } from '@/libs/AuthProvider'
import { ThemeProvider } from '@/libs/ThemeProvider'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'],weight:[ '400', "500", '700']})

export const metadata = {
  title: 'VidShare',
  description: 'video sharing app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={poppins.className}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
