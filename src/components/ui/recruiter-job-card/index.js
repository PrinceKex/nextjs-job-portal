'use client'

import { Button } from '../button'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'

function RecruiterJobCard({ jobItem, profileInfo, jobApplications }) {
   return (
      <div>
         <CommonCard
            icon={<JobIcon />}
            title={jobItem?.title}
            footerContent={
               <Button className='flex h-11 items-center justify-center px-5'>
                  {
                     jobApplications.filter(
                        (item) => item.jobID === jobItem?._id
                     ).length
                  }{' '}
                  Applicants
               </Button>
            }
         />
      </div>
   )
}

export default RecruiterJobCard
