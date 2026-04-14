import { z } from 'zod';

export const SceneQuerySchema = z.object({
  project_uuid: z.string().uuid('Invalid project UUID').optional(),
});

export type SceneQueryDto = z.infer<typeof SceneQuerySchema>;
