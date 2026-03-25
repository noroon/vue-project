import type { Handler } from '@netlify/functions'
import jobsData from './jobs.json'
// œtodo - try to import type and json from the original source
// import type { Job } from '../../src/types/job'

type Job = {
  id: string
  title: string
  type: string
  description: string
  location: string
  salary: string
  company: {
    name: string
    description: string
    contactEmail: string
    contactPhone: string
  }
}

type ErrorMessage = { message: string }
type resData = Job | Job[] | ErrorMessage

let jobs: Job[] = jobsData.jobs

const res = (statusCode: number, data: resData) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

export const handler: Handler = async (event) => {
  try {
    const method = event.httpMethod
    const { path } = event

    // GET /api/jobs
    if (method === 'GET' && path.endsWith('/jobs')) {
      return res(200, jobs)
    }

    // GET /api/jobs/:id
    const reqId = path.match(/jobs\/(\d+)/)?.[1]

    if (method === 'GET' && reqId) {
      const job = jobs.find((job) => job.id === reqId)
      return job ? res(200, job) : res(404, { message: 'Job not found' })
    }

    // POST /api/jobs
    if (method === 'POST' && path.endsWith('/jobs')) {
      const body = JSON.parse(event.body || '{}')

      const newJob = {
        id: `${Date.now()}`,
        ...body,
      }

      jobs.push(newJob)

      return res(201, newJob)
    }

    // DELETE /api/jobs/:id
    if (method === 'DELETE' && reqId) {
      const jobIndex = jobs.findIndex((job) => job.id === reqId)
      const deletedJob = jobs[jobIndex]

      jobs = jobs.filter((job) => job.id !== reqId)

      return deletedJob ? res(200, deletedJob) : res(404, { message: 'Job not found' })
    }

    return res(404, { message: 'Not found' }) // @todo - redirect to 404
  } catch (error) {
    console.error(error)

    return res(500, { message: 'Internal server error' })
  }
}
