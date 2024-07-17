import { currentUser } from '@clerk/nextjs/server'
import { fetchJobsForCandidateAction } from '../actions'
import CandidateActivity from '@/components/candidate-activity'

export default async function Activity() {
   const user = await currentUser()
   const jobList = await fetchJobsForCandidateAction()
   const jobApplicants = await fetchJobApplicantsForCandidate(user?.id)
   return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />
}
