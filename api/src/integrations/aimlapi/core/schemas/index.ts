export * from './responses.schema';

import { z } from 'zod';
import {
  getVideoModelSchema,
  getImageModelSchema,
} from '../config/schemas.config';

/**
 * A dynamic schema that resolves the correct validation based on the 'model' field.
 */
export const CreateVideoSchema = z
  .record(z.any())
  .refine(
    (data) => {
      return typeof data.model === 'string';
    },
    {
      message: 'Model is required',
      path: ['model'],
    },
  )
  .transform((data, ctx) => {
    const schema = getVideoModelSchema(data.model);

    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => ctx.addIssue(issue));

      return z.NEVER;
    }

    return result.data;
  });

export const CreateImageSchema = z
  .record(z.any())
  .refine(
    (data) => {
      return typeof data.model === 'string';
    },
    {
      message: 'Model is required',
      path: ['model'],
    },
  )
  .transform((data, ctx) => {
    const schema = getImageModelSchema(data.model);

    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => ctx.addIssue(issue));

      return z.NEVER;
    }

    return result.data;
  });

export type CreateVideoRequest = any;

export type CreateImageRequest = any;
