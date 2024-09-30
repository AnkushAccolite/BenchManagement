import { z } from 'zod'

export const taskSchema = z.object({
  empId: z.string(),
  empName: z.string(),
  skills: z.string(),
  experience: z.string(),
  accoliteDOJ: z.string(),
  baseLocation: z.string(),
  status: z.string(),
  clientName: z.string(),
  ageing: z.string(),
  benchDOJ: z.string(),
})

export type Task = z.infer<typeof taskSchema>
