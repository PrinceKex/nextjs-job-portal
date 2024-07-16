'use client'

import { Tabs, TabsList } from '../tabs'

function CandidateActivity({ jobList, jobApplicants }) {
   const uniqueStatusArray = [
      ...new Set(
         jobApplicants
            .map((jobApplicantItem) => jobApplicantItem.status)
            .flat(1)
      ),
   ]
   return (
      <div className='mx-auto max-w-7xl'>
         <Tabs defaultValue='Applied' className='w-full'>
            <div className='flex items-baseline justify-between border-b pb-6 py-24'>
               <h1 className='text-4xl tracking-tight font-bold text-gray-900'>
                  Your Activity
               </h1>
            </div>
            <TabsList>
               {uniqueStatusArray.map((status) => (
                  <TabsTrigger value={status}>{status}</TabsTrigger>
               ))}
            </TabsList>
         </Tabs>
      </div>
   )
}
export default CandidateActivity
