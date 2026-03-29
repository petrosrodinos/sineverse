import { z } from 'zod';
import { ProjectType } from '@/generated/prisma';

export const ProjectsQuerySchema = z.object({
    type: z.nativeEnum(ProjectType).optional(),
});

export type ProjectsQueryDto = z.infer<typeof ProjectsQuerySchema>;
