'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import CommonForm from '../common-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { initialPostNewJobFormData, postNewJobFormControls } from '@/utils'
import { postNewJobAction } from '@/app/actions'

function PostNewJob({ profileInfo, user }) {
   const [showJobDialog, setShowJobDialog] = useState(false)
   const [jobFormData, setJobFormData] = useState({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
   })

   function handlePostNewBtnValid() {
      return Object.keys(jobFormData).every(
         (control) => jobFormData[control].trim() !== ''
      )
   }

   async function createNewJob() {
      await postNewJobAction(
         {
            ...jobFormData,
            recruiterId: user?.id,
            applicants: [],
         },
         '/jobs'
      )
      setJobFormData({
         ...initialPostNewJobFormData,
         companyName: profileInfo?.recruiterInfo?.companyName,
      })
      setShowJobDialog(false)
   }

   return (
      <div>
         <Button
            onClick={() => setShowJobDialog(true)}
            className='disabled:opacity-60 flex h-11 items-center justify-center px-5'
         >
            Post A Job
         </Button>
         <Dialog
            open={showJobDialog}
            onOpenChange={() => {
               setShowJobDialog(false)
               setJobFormData({
                  ...initialPostNewJobFormData,
                  companyName: profileInfo?.recruiterInfo?.companyName,
               })
            }}
         >
            <DialogContent className='sm:max-w-screen-md h-[600px] overflow-auto'>
               <DialogHeader>
                  <DialogTitle>Post New Job</DialogTitle>
                  <div className='grid gap-4 py-4'>
                     <CommonForm
                        buttonText={'Add'}
                        formData={jobFormData}
                        setFormData={setJobFormData}
                        formControls={postNewJobFormControls}
                        isBtnDisabled={handlePostNewBtnValid}
                        action={createNewJob}
                     />
                  </div>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default PostNewJob
