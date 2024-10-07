import { z } from 'zod'

export const taskSchema = z.object({
  empId: z.string(),
  name: z.string(),
  skills: z.string(),
  experience: z.string(),
  doj: z.string(),
  baseLocation: z.string(),
  status: z.string(),
  client: z.string(),
  ageing: z.string(),
  benchedOn: z.string(),
  isDeleted:z.boolean(),
  actions:z.string(),
  
})

export type Task = z.infer<typeof taskSchema>
