import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import Loading from './loading'
import CommonLayout from '@/components/common-layout'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
   return (
      <ClerkProvider>
         <html lang='en'>
            <body className={inter.className}>
               <Suspense fallback={<Loading />}>
                  <CommonLayout children={children} />
               </Suspense>
            </body>
         </html>
      </ClerkProvider>
   )
}
