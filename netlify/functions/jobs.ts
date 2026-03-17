import type { Handler } from '@netlify/functions'
import jobsData from '../../src/jobs.json'
import type { Job } from '../../src/types/job'

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
    // GET /api/jobs
    if (event.path.endsWith('/jobs')) {
      return res(200, jobs)
    }

    // GET /api/jobs/:id
    const reqId = event.path.match(/jobs\/(\d+)/)?.[1]

    if (reqId) {
      const job = jobs.find((job) => job.id === reqId)

      if (!job) {
        return res(404, { message: 'Job not found' })
      }

      return res(200, job)
    }

    return res(404, { message: 'Not found' }) // redirect to 404
  } catch (error) {
    console.error(error)

    return res(500, { message: 'Internal server error' })
  }
}
