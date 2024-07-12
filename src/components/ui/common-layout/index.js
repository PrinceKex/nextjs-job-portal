import { currentUser } from '@clerk/nextjs/server'
import Header from '../header'
import { fetchProfileAction } from '@/app/actions'

async function CommonLayout({ children }) {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)
   return (
      <div className='mx-auto max-w-7xl p-6 lg:px-8'>
         {/* Header Component */}
         <Header
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
         />
         {/* Main Content */}
         <main>{children}</main>
      </div>
   )
}

export default CommonLayout
