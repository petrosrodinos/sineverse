import { z } from 'zod';

export const TimelineCaptionQuerySchema = z.object({
  clip_uuid: z.string(),
});

export type TimelineCaptionQueryDto = z.infer<typeof TimelineCaptionQuerySchema>;
