'use server'

import connectToDB from '@/database'
import Application from '@/models/application'
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
   const result = await Profile.findOne({ userId: id })

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

// create Job Application
export async function createJobApplicationAction(formData, pathToRevalidate) {
   await connectToDB()
   await Application.create(formData)
   revalidatePath(pathToRevalidate)
}

// fetch Job Application - Candidate
export async function fetchJobApplicationForCandidateAction(candidateID) {
   await connectToDB()
   const result = await Application.find({ candidateUserId: candidateID })
   return JSON.parse(JSON.stringify(result))
}
// fetch Job Application - Recruiter
export async function fetchJobApplicationForRecruiterAction(recruiterID) {
   await connectToDB()
   const result = await Application.find({ recruiterUserId: recruiterID })
   return JSON.parse(JSON.stringify(result))
}

// update Job Application