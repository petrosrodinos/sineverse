/*
  Warnings:

  - You are about to drop the `scene_prompt_variations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "scene_prompt_variations" DROP CONSTRAINT "scene_prompt_variations_prompt_image_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_prompt_variations" DROP CONSTRAINT "scene_prompt_variations_scene_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_prompt_variation_uuid_fkey";

-- DropTable
DROP TABLE "scene_prompt_variations";

-- CreateTable
CREATE TABLE "scene_variations" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "scene_uuid" TEXT NOT NULL,
    "prompt_image_uuid" TEXT,
    "style" TEXT,
    "mood" TEXT,
    "genre_style" TEXT,
    "camera_style" TEXT,
    "shot_type" TEXT,
    "camera_movement" TEXT,
    "lens_type" TEXT,
    "depth_of_field" TEXT,
    "lighting" TEXT,
    "color_grade" TEXT,
    "time_of_day" TEXT,
    "aspect_ratio" TEXT,
    "resolution" TEXT,
    "fps" INTEGER,
    "duration_sec" INTEGER,
    "ai_model" "VideoProvider",
    "seed" INTEGER,
    "creativity" DOUBLE PRECISION,
    "motion_strength" DOUBLE PRECISION,
    "guidance_scale" DOUBLE PRECISION,
    "audio_style" TEXT,
    "include_sound" BOOLEAN NOT NULL DEFAULT false,
    "prompt_text" TEXT NOT NULL,
    "negative_prompt" TEXT,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scene_variations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scene_variations_uuid_key" ON "scene_variations"("uuid");

-- CreateIndex
CREATE INDEX "scene_variations_uuid_idx" ON "scene_variations"("uuid");

-- CreateIndex
CREATE INDEX "scene_variations_scene_uuid_idx" ON "scene_variations"("scene_uuid");

-- AddForeignKey
ALTER TABLE "scene_variations" ADD CONSTRAINT "scene_variations_scene_uuid_fkey" FOREIGN KEY ("scene_uuid") REFERENCES "scenes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_variations" ADD CONSTRAINT "scene_variations_prompt_image_uuid_fkey" FOREIGN KEY ("prompt_image_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_prompt_variation_uuid_fkey" FOREIGN KEY ("prompt_variation_uuid") REFERENCES "scene_variations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
