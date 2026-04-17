import { z } from 'zod';

export const TimelineMusicQuerySchema = z.object({
  final_project_uuid: z.string(),
});

export type TimelineMusicQueryDto = z.infer<typeof TimelineMusicQuerySchema>;
