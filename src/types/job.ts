export type Job = {
  id: string
  title: string
  type: 'Part-Time' | 'Full-Time' | 'Remote' | 'Internship'
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
