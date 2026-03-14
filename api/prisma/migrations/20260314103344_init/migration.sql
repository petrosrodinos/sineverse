/*
  Warnings:

  - You are about to drop the column `type` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `ai_model` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `aspect_ratio` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `audio_style` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `camera_movement` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `camera_style` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `color_grade` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `creativity` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `depth_of_field` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `duration_sec` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `fps` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `guidance_scale` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `include_sound` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `lens_type` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `lighting` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `motion_strength` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `negative_prompt` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_image_uuid` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_text` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `seed` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `shot_type` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `time_of_day` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `tone` on the `scene_variations` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetRole" AS ENUM ('PROMPT_IMAGE', 'GENERATED_IMAGE', 'GENERATED_VIDEO', 'UPSCALED_VIDEO', 'GENERATED_THUMBNAIL', 'GENERATED_VOICEOVER', 'GENERATED_MUSIC', 'GENERATED_CAPTION');

-- DropForeignKey
ALTER TABLE "scene_variations" DROP CONSTRAINT "scene_variations_prompt_image_uuid_fkey";

-- DropIndex
DROP INDEX "documents_type_idx";

-- DropIndex
DROP INDEX "project_assets_scene_variation_uuid_key";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "project_assets" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "role" "AssetRole" NOT NULL DEFAULT 'GENERATED_VIDEO',
ADD COLUMN     "selected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "scene_variations" DROP COLUMN "ai_model",
DROP COLUMN "aspect_ratio",
DROP COLUMN "audio_style",
DROP COLUMN "camera_movement",
DROP COLUMN "camera_style",
DROP COLUMN "color_grade",
DROP COLUMN "creativity",
DROP COLUMN "depth_of_field",
DROP COLUMN "duration_sec",
DROP COLUMN "fps",
DROP COLUMN "genre",
DROP COLUMN "guidance_scale",
DROP COLUMN "include_sound",
DROP COLUMN "lens_type",
DROP COLUMN "lighting",
DROP COLUMN "motion_strength",
DROP COLUMN "negative_prompt",
DROP COLUMN "prompt_image_uuid",
DROP COLUMN "prompt_text",
DROP COLUMN "resolution",
DROP COLUMN "seed",
DROP COLUMN "shot_type",
DROP COLUMN "style",
DROP COLUMN "time_of_day",
DROP COLUMN "tone";

-- CreateIndex
CREATE INDEX "final_projects_user_uuid_idx" ON "final_projects"("user_uuid");

-- CreateIndex
CREATE INDEX "project_assets_user_uuid_idx" ON "project_assets"("user_uuid");

-- CreateIndex
CREATE INDEX "project_assets_project_uuid_idx" ON "project_assets"("project_uuid");

-- CreateIndex
CREATE INDEX "project_assets_scene_uuid_idx" ON "project_assets"("scene_uuid");

-- CreateIndex
CREATE INDEX "project_assets_scene_variation_uuid_idx" ON "project_assets"("scene_variation_uuid");

-- CreateIndex
CREATE INDEX "scene_variations_user_uuid_idx" ON "scene_variations"("user_uuid");
