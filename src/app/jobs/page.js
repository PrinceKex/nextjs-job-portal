import JobListing from '@/components/ui/job-listing'
import { fetchJobsForRecruiterAction, fetchProfileAction } from '../actions'
import { currentUser } from '@clerk/nextjs/server'

async function JobsPage() {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)

   const jobList = await fetchJobsForRecruiterAction(user?.id)

   return (
      <JobListing
         user={JSON.parse(JSON.stringify(user))}
         profileInfo={profileInfo}
         jobList={jobList}
      />
   )
}

export default JobsPage
