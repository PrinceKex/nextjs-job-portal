'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import CommonForm from '../common-form'
import {
   initialRecruiterFormData,
   recruiterOnboardFormControls,
   initialCandidateFormData,
   candidateOnboardFormControls,
} from '../utils'
import { useUser } from '@clerk/nextjs'
import { createProfileAction } from '@/app/actions'
import { createClient } from '@supabase/supabase-js'
const supabaseKey = process.env.SUPABASE_API_KEY
const supabaseClient = createClient(
   'https://nrlvoxbjafgcqlwuprfy.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybHZveGJqYWZnY3Fsd3VwcmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMjkwNjQsImV4cCI6MjAzNjYwNTA2NH0.ZySL6BNqARO_qPCL_LHksz-GCTU4q3_b5ULF9qcgxJ0'
)

function OnBoard() {
   const [currentTab, setCurrentTab] = useState('candidate')
   const [recruiterFormData, setRecruiterFormData] = useState(
      initialRecruiterFormData
   )
   const [candidateFormData, setCandidateFormData] = useState(
      initialCandidateFormData
   )
   const [file, setFile] = useState(null)

   const currentAuthUser = useUser()
   const { user } = currentAuthUser

   function handleFileChange(event) {
      event.preventDefault()
      console.log(event.target.files)
      setFile(event.target.files[0])
   }

   async function handleUploadPdfToSupabase() {
      const { data, error } = await supabaseClient.storage
         .from('job-board')
         .upload(`public/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false,
         })
      console.log(data, error)
      if (data) {
         setCandidateFormData({
            ...candidateFormData,
            resume: data.path,
         })
      }
   }

   useEffect(() => {
      if (file) handleUploadPdfToSupabase()
   }, [file])

   function handleTabChange(value) {
      setCurrentTab(value)
   }

   function handleRecruiterFormValid() {
      return (
         recruiterFormData &&
         recruiterFormData.name.trim() !== '' &&
         recruiterFormData.companyName.trim() !== '' &&
         recruiterFormData.companyRole.trim() !== ''
      )
   }

   function handleCandidateFormValid() {
      return Object.keys(candidateFormData).every(
         (key) => candidateFormData[key].trim !== ''
      )
   }

   async function createProfile() {
      const data =
         currentTab === 'candidate'
            ? {
                 candidateInfo: candidateFormData,
                 role: 'candidate',
                 isPremiumUser: false,
                 userId: user?.id,
                 email: user?.primaryEmailAddress?.emailAddress,
              }
            : {
                 recruiterInfo: recruiterFormData,
                 role: 'recruiter',
                 isPremiumUser: false,
                 userId: user?.id,
                 email: user?.primaryEmailAddress?.emailAddress,
              }

      await createProfileAction(data, '/onboard')
   }

   return (
      <div className='bg-white'>
         <Tabs value={currentTab} onValueChange={handleTabChange}>
            <div className='w-full'>
               <div className='flex items-baseline justify-between border-b pb-6 pt-24'>
                  <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                     Welcome to onboarding
                  </h1>
                  <TabsList>
                     <TabsTrigger value='candidate'>Candidate</TabsTrigger>
                     <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
                  </TabsList>
               </div>
            </div>
            <TabsContent value='candidate'>
               <CommonForm
                  formControls={candidateOnboardFormControls}
                  buttonText={'Onboard as candidate'}
                  formData={candidateFormData}
                  setFormData={setCandidateFormData}
                  handleFileChange={handleFileChange}
                  isBtnDisabled={!handleCandidateFormValid}
                  action={createProfile}
               />
            </TabsContent>
            <TabsContent value='recruiter'>
               <CommonForm
                  formControls={recruiterOnboardFormControls}
                  buttonText={'Onboard as recruiter'}
                  formData={recruiterFormData}
                  setFormData={setRecruiterFormData}
                  isBtnDisabled={!handleRecruiterFormValid}
                  action={createProfile}
               />
            </TabsContent>
         </Tabs>
      </div>
   )
}

export default OnBoard
