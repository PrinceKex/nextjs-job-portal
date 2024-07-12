'use server'

import connectToDB from '@/database'
import Job from '@/models/job'
import Profile from '@/models/profile'
import { revalidatePath } from 'next/cache'

// create profile action
export async function createProfileAction(formData, pathToRevalidate) {
   await connectToDB()

   await Profile.create(formData)
   revalidatePath(pathToRevalidate)
}

// fetch profile information
export async function fetchProfileAction(id) {
   await connectToDB()
   const result = await Profile.findOne({ userid: id })

   return JSON.parse(JSON.stringify(result))
}

// create job action
export async function postNewJobAction(formData, pathToRevalidate) {
   await connectToDB()
   await Job.create(formData)
   revalidatePath(pathToRevalidate)
}

// fetch job action
// recruiter
export async function fetchJobsForRecruiterAction(id) {
   await connectToDB()
   const result = await Job.find({ recruiterId: id })
   return JSON.parse(JSON.stringify(result))
}
// candidate
export async function fetchJobsForCandidateAction() {
   await connectToDB()
   const result = await Job.find({})
   return JSON.parse(JSON.stringify(result))
}
