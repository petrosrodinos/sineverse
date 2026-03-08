import { z } from "zod";


export const ModelEnum = z.enum(["klingai/image", "o1"]);

export const AspectRatioEnum = z.enum([
    "21:9",
    "16:9",
    "4:3",
    "3:2",
    "1:1",
    "2:3",
    "3:4",
    "9:16",
]);

export const ResolutionEnum = z.enum(["1K", "2K"]);

export const ImageUrlSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("http://") ||
            val.startsWith("https://") ||
            val.startsWith("data:image"),
        "Must be a valid URL or base64 encoded image"
    );

export const ImageUrlsSchema = z.array(ImageUrlSchema).min(1).max(10);

export const ImageGenerationSchema = z.object({
    model: z.enum(["klingai/image-o1"]).default("klingai/image-o1"),
    prompt: z.string().max(4000),
    image_urls: ImageUrlsSchema.default([]),
    n: z.number().int().default(1),
    aspect_ratio: AspectRatioEnum.default("16:9"),
    resolution: ResolutionEnum.default("1K"),
});

export type ImageGenerationInput = z.infer<typeof ImageGenerationSchema>;