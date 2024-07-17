'use client'

import { useRouter } from 'next/router'

function HomepageButtonControls({ user, profileInfo }) {
   const router = useRouter()

   useEffect(() => {
      router.refesh()
   }, [])
   return (
      <div className='flex space-x-4'>
         <Button
            onClick={() => router.push('/jobs')}
            className='flex h-11 items-center justify-center'
         >
            {user
               ? profileInfo?.role === 'candidate'
                  ? 'Browse Jobs'
                  : 'Jobs Dashboard'
               : 'Find Jobs'}
         </Button>
         <Button
            onClick={() =>
               router.push(
                  user
                     ? profileInfo?.role === 'candidate'
                        ? '/activity'
                        : '/jobs'
                     : '/jobs'
               )
            }
            className='flex h-11 items-center justify-center'
         >
            {user
               ? profileInfo?.role === 'candidate'
                  ? 'Your Activity'
                  : 'Post New Job'
               : 'Post New Job'}
         </Button>
      </div>
   )
}
export default HomepageButtonControls
