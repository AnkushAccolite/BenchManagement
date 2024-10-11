import { z } from 'zod'

// Keeping a simple non-relational schema here.
export const taskSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  projectHead: z.string(),
  dept: z.string(),
  deptHead: z.string(),
  location: z.string(),
  startdate: z.date(), 
  enddate: z.date(),   
})

export type Projects = z.infer<typeof taskSchema>
