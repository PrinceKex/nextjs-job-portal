import { redirect } from 'next/navigation'
import { fetchProfileAction } from './actions'
import { currentUser } from '@clerk/nextjs/server'

async function Home() {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)

   if (user && !profileInfo?._id) redirect('/onboard')
   return <section>Main Content</section>
}
export default Home
