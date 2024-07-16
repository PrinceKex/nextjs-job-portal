import JobListing from '@/components/ui/job-listing'
import {
   fetchJobApplicationForCandidateAction,
   fetchJobApplicationForRecruiterAction,
   fetchJobsForCandidateAction,
   fetchJobsForRecruiterAction,
   fetchProfileAction,
} from '../actions'
import { currentUser } from '@clerk/nextjs/server'

async function JobsPage() {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)

   const jobList =
      profileInfo?.role === 'candidate'
         ? await fetchJobsForCandidateAction()
         : await fetchJobsForRecruiterAction(user?.id)
   //console.log(jobList)
   const getJobApplicationList =
      profileInfo?.role === 'candidate'
         ? await fetchJobApplicationForCandidateAction(user?.id)
         : await fetchJobApplicationForRecruiterAction(user?.id)
   console.log(getJobApplicationList)
   return (
      <JobListing
         user={JSON.parse(JSON.stringify(user))}
         profileInfo={profileInfo}
         jobList={jobList}
         jobApplications={getJobApplicationList}
      />
   )
}

export default JobsPage
