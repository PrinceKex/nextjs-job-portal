import OnBoard from '@/components/on-board'

import { redirect } from 'next/navigation'
import { fetchProfileAction } from '../actions'
import { currentUser } from '@clerk/nextjs/server'

async function OnBoardPage() {
   // get auth user frm clerk
   const user = await currentUser()
   //  console.log(user)

   // fetch the profile info candidate or recruiter
   const profileInfo = await fetchProfileAction(user?.id)
   //  console.log(profileInfo)

   if (profileInfo?._id) {
      if (profileInfo?.role === 'recruiter' && !profileInfo.isPremiumUser) {
         redirect('/membership')
      } else {
         redirect('/')
      }
   } else {
      return <OnBoard />
   }
}
export default OnBoardPage
