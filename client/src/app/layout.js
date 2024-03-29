import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import NextUIProvider from './providers'
import ReduxProvider from '@/redux/provider'
import NavBar from '@/components/navbar/page'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <ReduxProvider>
          <NextUIProvider>
            {/* <NavBar/> */}
            {children}
          </NextUIProvider>
        </ReduxProvider>
        </body>
    </html>
  )
}
