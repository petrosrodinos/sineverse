export * from './responses.schema';

import { z } from 'zod';
import { getModelSchema } from '../config/schemas.config';

/**
 * A dynamic schema that resolves the correct validation based on the 'model' field.
 */
export const CreateVideoSchema = z.record(z.any()).refine((data) => {
    return typeof data.model === 'string';
}, {
    message: "Model is required",
    path: ["model"]
}).transform((data, ctx) => {
    const schema = getModelSchema(data.model);

    // We need to handle the model name mismatch between internal IDs and provider IDs
    // The specific schemas expect provider IDs, but the input has internal IDs.
    const result = schema.safeParse(data);

    if (!result.success) {
        result.error.issues.forEach(issue => ctx.addIssue(issue));
        return z.NEVER;
    }

    return result.data;
});

// For backward compatibility and type safety
export type CreateVideoRequest = any; 
