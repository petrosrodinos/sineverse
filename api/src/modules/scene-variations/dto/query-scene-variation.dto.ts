import { z } from 'zod';

export const SceneVariationQuerySchema = z.object({
  scene_uuid: z.string().uuid('Invalid scene UUID').optional(),
});

export type SceneVariationQueryDto = z.infer<typeof SceneVariationQuerySchema>;
