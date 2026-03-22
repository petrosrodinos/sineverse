import { z } from "zod";

export const ImagenAspectRatioEnum = z.enum([
    "1:1",
    "9:16",
    "16:9",
    "3:4",
    "4:3",
]);

export const Imagen4FastSchema = z.object({
    model: z.enum(["google/imagen-4.0-fast-generate-001"]).default("google/imagen-4.0-fast-generate-001"),
    prompt: z.string().max(4000),
    n: z.number().int().default(1),
    convert_base64_to_url: z.boolean().default(true),
    enhance_prompt: z.boolean().default(true),
    aspect_ratio: ImagenAspectRatioEnum.default("1:1"),
});


export const Imagen4Schema = z.object({
    model: z.enum(["google/imagen-4.0-generate-001"]).default("google/imagen-4.0-generate-001"),
    prompt: z.string().max(4000),
    n: z.number().int().default(1),
    convert_base64_to_url: z.boolean().default(true),
    enhance_prompt: z.boolean().default(true),
    aspect_ratio: ImagenAspectRatioEnum.default("1:1"),
});

export type Imagen4Input = z.infer<typeof Imagen4Schema>;
export type Imagen4FastInput = z.infer<typeof Imagen4FastSchema>;
