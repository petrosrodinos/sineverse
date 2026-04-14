import { z } from 'zod';

const CameraConfigSchema = z.object({
  horizontal: z.number().min(-10).max(10).optional(),
  vertical: z.number().min(-10).max(10).optional(),
  pan: z.number().min(-10).max(10).optional(),
  tilt: z.number().min(-10).max(10).optional(),
  roll: z.number().min(-10).max(10).optional(),
  zoom: z.number().min(-10).max(10).optional(),
});

const CameraControlSchema = z.object({
  type: z.enum([
    'simple',
    'down_back',
    'forward_up',
    'right_turn_forward',
    'left_turn_forward',
  ]),
  config: CameraConfigSchema.optional(),
});

const TrajectorySchema = z.object({
  x: z.number(),
  y: z.number(),
});

const DynamicMaskSchema = z.object({
  mask: z.string(),
  trajectories: z.array(TrajectorySchema).min(2).max(77),
});

const DurationSchema = z.union([z.literal(5), z.literal(10)]).default(5);

const AspectRatioSchema = z
  .enum(['16:9', '9:16', '1:1', '2.35:1', '4:3'])
  .default('16:9');

const MovementTypeSchema = z.enum([
  'horizontal',
  'vertical',
  'pan',
  'tilt',
  'roll',
  'zoom',
]);

const AdvancedCameraControlSchema = z.object({
  movement_type: MovementTypeSchema,
  movement_value: z.number().min(-10).max(10),
});

const UriSchema = z.string().url().or(z.string());
const CFGScaleSchema = z.number().max(1);
const DynamicMasksSchema = z.array(DynamicMaskSchema).max(6);

const SinglePromptSchema = z.object({
  prompt: z.string(),
  multi_prompt: z.undefined().optional(),
});

const MultiPromptSchema = z.object({
  prompt: z.undefined().optional(),
  multi_prompt: z.array(z.string()).min(1),
});

const PromptUnionSchema = z.union([SinglePromptSchema, MultiPromptSchema]);

const KlingV3DurationSchema = z
  .union([
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(7),
    z.literal(8),
    z.literal(9),
    z.literal(10),
    z.literal(11),
    z.literal(12),
    z.literal(13),
    z.literal(14),
    z.literal(15),
  ])
  .default(5);

const ShotTypeSchema = z
  .enum(['customize', 'intelligent'])
  .default('customize');

const PromptSchema = z.union([SinglePromptSchema, MultiPromptSchema]);

const ImageElementSchema = z.object({
  frontal_image_url: UriSchema,
  reference_image_urls: z.array(UriSchema).min(1).max(4).optional(),
  video_url: z.undefined().optional(),
});

const VideoElementSchema = z.object({
  video_url: UriSchema,
  frontal_image_url: z.undefined().optional(),
  reference_image_urls: z.undefined().optional(),
});

const ElementSchema = z.union([ImageElementSchema, VideoElementSchema]);

export const KlingStandardTextToVideoSchema = z.object({
  model: z.literal('kling-video/v1/standard/text-to-video'),
  prompt: z.string(),
  aspect_ratio: AspectRatioSchema,
  duration: DurationSchema,
  negative_prompt: z.string().optional(),
  cfg_scale: z.number().max(1).optional(),
  camera_control: CameraControlSchema.optional(),
  advanced_camera_control: AdvancedCameraControlSchema.optional(),
});

export const KlingStandardImageToVideoSchema = z.object({
  model: z.enum(['kling-video/v1/standard/image-to-video']),
  image_url: z.string().url(),
  prompt: z.string(),
  tail_image_url: z.string().url().optional(),
  duration: z.union([z.literal(5), z.literal(10)]).default(5),
  negative_prompt: z.string().optional(),
  cfg_scale: z.number().max(1).optional(),
  static_mask: z.string().url().optional(),
  dynamic_masks: z.array(DynamicMaskSchema).max(6).optional(),
  camera_control: CameraControlSchema.optional(),
});

export const KlingImageToVideoV21Schema = z.object({
  model: z.literal('klingai/v2.1-master-image-to-video'),
  image_url: UriSchema,
  prompt: z.string(),
  duration: DurationSchema,
  negative_prompt: z.string().optional(),
  cfg_scale: CFGScaleSchema.optional(),
  static_mask: UriSchema.optional(),
  dynamic_masks: DynamicMasksSchema.optional(),
  camera_control: CameraControlSchema.optional(),
});

export const KlingV21TextToVideoSchema = z.object({
  model: z.literal('klingai/v2.1-master-text-to-video'),
  prompt: z.string(),
  aspect_ratio: AspectRatioSchema,
  duration: DurationSchema,
  negative_prompt: z.string().optional(),
  cfg_scale: CFGScaleSchema.optional(),
  camera_control: CameraControlSchema.optional(),
  advanced_camera_control: AdvancedCameraControlSchema.optional(),
});

export const KlingVideoV3TextToVideoSchema = z
  .object({
    model: z.enum([
      'klingai/video-v3-standard-text-to-video',
      'klingai/video-v3-pro-text-to-video',
    ]),
    aspect_ratio: AspectRatioSchema,
    duration: KlingV3DurationSchema,
    shot_type: ShotTypeSchema,
    generate_audio: z.boolean().default(true),
    negative_prompt: z.string().optional(),
    cfg_scale: CFGScaleSchema.optional(),
  })
  .and(PromptUnionSchema);

export const KlingVideoV3ImageToVideoSchema = z
  .object({
    model: z.literal('klingai/video-v3-standard-image-to-video'),
    image_url: UriSchema,
    tail_image_url: UriSchema.optional(),
    duration: KlingV3DurationSchema,
    elements: z.array(ElementSchema).max(4).optional(),
    shot_type: ShotTypeSchema,
    generate_audio: z.boolean().default(true),
    negative_prompt: z.string().optional(),
    cfg_scale: CFGScaleSchema.optional(),
  })
  .and(PromptSchema)
  .superRefine((data, ctx) => {
    if (!data.elements) return;

    const videoElements = data.elements.filter((e) => 'video_url' in e);

    if (videoElements.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only one element can contain a video_url',
        path: ['elements'],
      });
    }
  });

export type KlingVideoV3ImageToVideoRequest = z.infer<
  typeof KlingVideoV3ImageToVideoSchema
>;
export type KlingVideoV3TextToVideoRequest = z.infer<
  typeof KlingVideoV3TextToVideoSchema
>;
export type KlingV21TextToVideoRequest = z.infer<
  typeof KlingV21TextToVideoSchema
>;
export type KlingImageToVideoV21Request = z.infer<
  typeof KlingImageToVideoV21Schema
>;
export type KlingStandardImageToVideoInput = z.infer<
  typeof KlingStandardImageToVideoSchema
>;
export type KlingStandardTextToVideoInput = z.infer<
  typeof KlingStandardTextToVideoSchema
>;
