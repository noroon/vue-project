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

const jobs: Job[] = jobsData.jobs

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
    const path = event.path

    // GET /api/jobs
    if (method === 'GET' && path.endsWith('/jobs')) {
      return res(200, jobs)
    }

    // GET /api/jobs/:id
    const reqId = path.match(/jobs\/(\d+)/)?.[1]

    if (method === 'GET' && reqId) {
      const job = jobs.find((job) => job.id === reqId)

      if (!job) {
        return res(404, { message: 'Job not found' })
      }

      return res(200, job)
    }
    // POST /api/jobs
    if (method === 'POST' && path.endsWith('/jobs')) {
      const body = JSON.parse(event.body || '{}')

      const newJob = {
        id: jobs.length,
        ...body,
      }

      jobs.push(newJob)

      return res(201, newJob)
    }
    return res(404, { message: 'Not found' }) // @todo - redirect to 404
  } catch (error) {
    console.error(error)

    return res(500, { message: 'Internal server error' })
  }
}
