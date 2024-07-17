import AccountInfo from '@/components/account-info'
import { currentUser } from '@clerk/nexts/server'
import { fetchProfileAction } from '../actions'
import { redirect } from 'next/navigation'

async function AccountPage() {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)
   if (!profileInfo) redirect('/onboard')
   return <AccountInfo profileInfo={profileInfo} />
}

export default AccountPage