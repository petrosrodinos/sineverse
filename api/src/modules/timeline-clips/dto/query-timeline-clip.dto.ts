import { z } from 'zod';

export const TimelineClipQuerySchema = z.object({
  final_project_uuid: z.string(),
  project_asset_uuid: z.string().optional(),
});

export type TimelineClipQueryDto = z.infer<typeof TimelineClipQuerySchema>;
