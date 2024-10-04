import { z } from 'zod'

// Keeping a simple non-relational schema here.
export const taskSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  projectHead: z.string(),
  department: z.string(),
  departmentHead: z.string(),
  location: z.string(),
})

export type Projects = z.infer<typeof taskSchema>;
