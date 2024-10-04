import { z } from 'zod'

// Keeping a simple non-relational schema here.
export const taskSchema = z.object({
  openingId: z.string(),
  projectName: z.string(),
  opening:z.string(),
  clientName: z.string(),
  requirements: z.string(),
  skills: z.string(),
  deadline: z.string(),
  location: z.string(),
})

export type Openings = z.infer<typeof taskSchema>;
