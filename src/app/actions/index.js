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
export async function fetchJobsForCandidateAction(filterParams = {}) {
   await connectToDB()
   let updatedParams = {}
   Object.keys(filterParams).forEach((filterKey) => {
      updatedParams[filterKey] = { $in: filterParams[filterKey].split(',') }
   })
   const result = await Job.find(
      filterParams && Object.keys[filterParams].length > 0 ? updatedParams : {}
   )
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
   const result = await Application.find({ candidateUserID: candidateID })
   return JSON.parse(JSON.stringify(result))
}
// fetch Job Application - Recruiter
export async function fetchJobApplicationForRecruiterAction(recruiterID) {
   await connectToDB()
   const result = await Application.find({ recruiterUserID: recruiterID })
   return JSON.parse(JSON.stringify(result))
}

// update Job Application
export async function updateJobApplicationAction(data, pathToRevalidate) {
   await connectToDB()
   const {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      _id,
      jobAppliedDate,
   } = data
   await Application.findOneAndUpdate(
      { _id: _id },
      {
         recruiterUserID,
         name,
         email,
         candidateUserID,
         status,
         jobID,
         jobAppliedDate,
      },
      { new: true }
   )
   revalidatePath(pathToRevalidate)
}
// get candidate details by Id
export async function getCandidateDetailsByIdAction(currentCandidateID) {
   await connectToDB()
   const result = await Profile.findOne({ userId: currentCandidateID })

   return JSON.parse(JSON.stringify(result))
}

// create filter categories action
export async function createFilterCategotyAction() {
   await connectToDB()
   const result = await Job.find({})

   return JSON.parse(JSON.stringify(result))
}

// update profile action
export async function updateProfileAction(data, pathToRevalidate) {
   await connectToDB()
   const {
      userId,
      role,
      email,
      isPremiumUser,
      membershipType,
      membershipStartDate,
      membershipEndDate,
      recruiterInfo,
      candidateInfo,
      _id,
   } = data

   await Profile.findOneAndUpdate(
      { _id: _id },
      {
         userId,
         role,
         email,
         isPremiumUser,
         membershipType,
         membershipStartDate,
         membershipEndDate,
         recruiterInfo,
         candidateInfo,
      },
      { new: true }
   )
   revalidatePath(pathToRevalidate)
}
