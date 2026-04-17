import { z } from 'zod';

export const FinalProjectQuerySchema = z.object({
  project_uuid: z.string().optional(),
});

export type FinalProjectQueryDto = z.infer<typeof FinalProjectQuerySchema>;
