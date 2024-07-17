'use client'

import { Fragment } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'
import {
   getCandidateDetailsByIdAction,
   updateJobApplicationAction,
} from '@/app/actions'
import { createClient } from '@supabase/supabase-js'
const supabaseKey = process.env.SUPABASE_API_KEY
const supabaseClient = createClient(
   'https://nrlvoxbjafgcqlwuprfy.supabase.co',
   supabaseKey
)

function CandidateList({
   jobApplications,
   currentCandidateDetails,
   setCurrentCandidateDetails,
   showCurrentCandidateDetailsModal,
   setShowCurrentCandidateDetailsModal,
}) {
   async function handleFetchCandidateDetails(getCurrentCandidateId) {
      const data = await getCandidateDetailsByIdAction(getCurrentCandidateId)

      if (data) {
         setCurrentCandidateDetails(data)
         setShowCurrentCandidateDetailsModal(true)
      }
   }

   function handlePreviewResume() {
      const { data } = supabaseClient.storage
         .from('job-board-public')
         .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

      const a = document.createElement('a')
      a.href = data.publicUrl
      a.setAttribute('download', 'Resume.pdf')
      a.setAttribute('target', '_blank')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
   }

   async function handleUpdateJobStatus(getCurrentStatus) {
      let cpyJobApplicants = [...jobApplications]
      const indexOFCurrentJobApplicant = cpyJobApplicants.findIndex(
         (item) => item.candidateUserID === currentCandidateDetails?.userId
      )
      const jobApplicantsToUpdate = {
         ...cpyJobApplicants[indexOFCurrentJobApplicant],
         status:
            cpyJobApplicants[indexOFCurrentJobApplicant].status.concat(
               getCurrentStatus
            ),
      }
      await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs')
   }

   return (
      <Fragment>
         <div className='grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3'>
            {jobApplications && jobApplications.length > 0
               ? jobApplications.map((jobApplicantItem) => (
                    <div className='bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4'>
                       <div className='px-4 my-6 flex justify-between item-center'>
                          <h3 className='text-lg font-bold'>
                             {jobApplicantItem?.name}
                          </h3>
                          <Button
                             onClick={() =>
                                handleFetchCandidateDetails(
                                   jobApplicantItem?.candidateUserID
                                )
                             }
                             className='flex h-11 items-center justify-center px-5'
                          >
                             View Profile
                          </Button>
                       </div>
                    </div>
                 ))
               : null}
         </div>
         <Dialog
            open={showCurrentCandidateDetailsModal}
            onOpenChange={() => {
               setCurrentCandidateDetails(null)
               setShowCurrentCandidateDetailsModal(false)
            }}
         >
            <DialogContent>
               <div>
                  <h1 className='text-2xl font-bold text-black'>
                     {currentCandidateDetails?.candidateInfo?.name},{' '}
                     {currentCandidateDetails?.email}
                  </h1>
                  <p className='text-xl font-medium text-black'>
                     {currentCandidateDetails?.candidateInfo?.currentCompany}
                  </p>
                  <p className='text-xl font-medium text-black'>
                     {
                        currentCandidateDetails?.candidateInfo
                           ?.currentJobLocation
                     }
                  </p>
                  <p className='text-xl font-medium text-white'>
                     {' '}
                     Total Experience
                     {
                        currentCandidateDetails?.candidateInfo?.totalExperience
                     }{' '}
                     Years
                  </p>
                  <p className='text-xl font-medium text-white'>
                     Salary:
                     {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
                  </p>
                  <p className='text-xl font-medium text-white'>
                     Notice Period:
                     {currentCandidateDetails?.candidateInfo?.noticePeriod} LPA
                  </p>
                  <div className='flex flex-wrap gap-4 mt-6'>
                     {currentCandidateDetails?.candidateInfo?.skills
                        .split(',')
                        .map((skillItem) => (
                           <div className='w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]'>
                              <h2 className='text-[13px] font-medium text-white'>
                                 {skillItem}
                              </h2>
                           </div>
                        ))}
                  </div>
                  <div className='flex items-center gap-4 mt-6'>
                     <h1>Previous Companies</h1>
                     <div className='flex flex-wrap items-center gap-4 mt-6'>
                        {currentCandidateDetails?.candidateInfo?.previousCompanies
                           .split(',')
                           .map((companyItem) => (
                              <div className='w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]'>
                                 <h2 className='text-[13px] font-medium text-white'>
                                    {companyItem}
                                 </h2>
                              </div>
                           ))}
                     </div>
                  </div>
               </div>
               <div className='flex gap-2'>
                  <Button
                     onClick={handlePreviewResume}
                     className='flex h-11 items-center justify-center px-5'
                  >
                     Resume
                  </Button>
                  <Button
                     onClick={() => handleUpdateJobStatus('selected')}
                     className='disabled:opacity-65 flex h-11 items-center justify-center px-5'
                     disabled={
                        jobApplications
                           .find(
                              (item) =>
                                 item.candidateUserID ===
                                 currentCandidateDetails?.userId
                           )
                           .status.includes('selected') ||
                        jobApplications
                           .find(
                              (item) =>
                                 item.candidateUserID ===
                                 currentCandidateDetails?.userId
                           )
                           .status.includes('rejected')
                           ? true
                           : false
                     }
                  >
                     {jobApplications
                        .find(
                           (item) =>
                              item.candidateUserID ===
                              currentCandidateDetails?.userId
                        )
                        .status.includes('selected')
                        ? 'Selected'
                        : 'Select'}
                  </Button>
                  <Button
                     onClick={() => handleUpdateJobStatus('rejected')}
                     className='disabled:opacity-65 flex h-11 items-center justify-center px-5'
                     disabled={
                        jobApplications
                           .find(
                              (item) =>
                                 item.candidateUserID ===
                                 currentCandidateDetails?.userId
                           )
                           .status.includes('selected') ||
                        jobApplications
                           .find(
                              (item) =>
                                 item.candidateUserID ===
                                 currentCandidateDetails?.userId
                           )
                           .status.includes('rejected')
                           ? true
                           : false
                     }
                  >
                     {jobApplications
                        .find(
                           (item) =>
                              item.candidateUserID ===
                              currentCandidateDetails?.userId
                        )
                        .status.includes('rejected')
                        ? 'Rejected'
                        : 'Reject'}
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </Fragment>
   )
}

export default CandidateList
