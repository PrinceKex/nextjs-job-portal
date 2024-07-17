import JobListing from '@/components/job-listing'
import {
   createFilterCategotyAction,
   fetchJobApplicationForCandidateAction,
   fetchJobApplicationForRecruiterAction,
   fetchJobsForCandidateAction,
   fetchJobsForRecruiterAction,
   fetchProfileAction,
} from '../actions'
import { currentUser } from '@clerk/nextjs/server'

async function JobsPage({ searchParams }) {
   const user = await currentUser()
   const profileInfo = await fetchProfileAction(user?.id)

   const jobList =
      profileInfo?.role === 'candidate'
         ? await fetchJobsForCandidateAction(searchParams)
         : await fetchJobsForRecruiterAction(user?.id)
   //console.log(jobList)
   const getJobApplicationList =
      profileInfo?.role === 'candidate'
         ? await fetchJobApplicationForCandidateAction(user?.id)
         : await fetchJobApplicationForRecruiterAction(user?.id)
   //console.log(getJobApplicationList)

   const fetchFilterCategories = await createFilterCategotyAction()
   return (
      <JobListing
         user={JSON.parse(JSON.stringify(user))}
         profileInfo={profileInfo}
         jobList={jobList}
         jobApplications={getJobApplicationList}
         filterCategories={fetchFilterCategories}
      />
   )
}

export default JobsPage
