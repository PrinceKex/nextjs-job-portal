'use client'

import Link from 'next/link'
import { Button } from '../button'
import { Sheet, SheetContent, SheetTrigger } from '../sheet'
import { AlignJustify } from 'lucide-react'

function Header() {
   const menuItems = [
      {
         label: 'Home',
         path: '/',
         show: true,
      },
      {
         label: 'Feed',
         path: '/feed',
         show: true,
         //  show: profileInfo,
      },
      {
         label: 'Login',
         path: '/sign-in',
         show: true,
         //  show: !user,
      },
      {
         label: 'Register',
         path: '/sign-up',
         show: true,
         //  show: !user,
      },
      {
         label: 'Activity',
         path: '/activity',
         show: true,
         //  show: profileInfo?.role === 'candidate',
      },
      {
         label: 'Companies',
         path: '/companies',
         show: true,
         //  show: profileInfo?.role === 'candidate',
      },
      {
         label: 'Jobs',
         path: '/jobs',
         show: true,
         //  show: profileInfo,
      },
      {
         label: 'Membership',
         path: '/membership',
         show: true,
         //  show: profileInfo,
      },
      {
         label: 'Account',
         path: '/account',
         show: true,
         //  show: profileInfo,
      },
   ]

   return (
      <div>
         <header className='flex h-16 w-full shrink-0 items-center'>
            <Sheet>
               <SheetTrigger asChild>
                  <Button>
                     <AlignJustify className='h-6 w-6' />
                     <span className='sr-only'>Toggle Navigation Menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side='left'>
                  <Link className='mr-6 hidden lg:flex' href={'#'}>
                     <h3>JOBSCO</h3>
                  </Link>
                  <div className='grid gap-2 py-6'>
                     {menuItems.map((menuItem) =>
                        menuItem.show ? (
                           <Link
                              href={menuItem.path}
                              className='flex w-full items-center py-2 text-lg font-semibold'
                           >
                              {menuItem.label}
                           </Link>
                        ) : null
                     )}
                  </div>
               </SheetContent>
            </Sheet>
         </header>
      </div>
   )
}

export default Header
