/*
  Warnings:

  - You are about to drop the column `status` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `image_generation_error` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `image_generation_status` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the `scene_videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentType" ADD VALUE 'CAPTION';
ALTER TYPE "DocumentType" ADD VALUE 'VOICEOVER';
ALTER TYPE "DocumentType" ADD VALUE 'MUSIC';

-- DropForeignKey
ALTER TABLE "scene_variations" DROP CONSTRAINT "scene_variations_prompt_image_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_scene_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_scene_variation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_video_uuid_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "scene_variations" DROP COLUMN "image_generation_error",
DROP COLUMN "image_generation_status";

-- DropTable
DROP TABLE "scene_videos";

-- DropEnum
DROP TYPE "MediaStatus";

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "VideoStatus";

-- CreateTable
CREATE TABLE "project_assets" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "project_uuid" TEXT NOT NULL,
    "scene_uuid" TEXT,
    "scene_variation_uuid" TEXT,
    "provider_job_id" TEXT,
    "document_uuid" TEXT,
    "status" "AssetStatus" NOT NULL DEFAULT 'PENDING',
    "type" "DocumentType" NOT NULL DEFAULT 'VIDEO',
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_assets_uuid_key" ON "project_assets"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "project_assets_scene_variation_uuid_key" ON "project_assets"("scene_variation_uuid");

-- CreateIndex
CREATE INDEX "project_assets_uuid_idx" ON "project_assets"("uuid");

-- AddForeignKey
ALTER TABLE "scene_variations" ADD CONSTRAINT "scene_variations_prompt_image_uuid_fkey" FOREIGN KEY ("prompt_image_uuid") REFERENCES "project_assets"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assets" ADD CONSTRAINT "project_assets_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assets" ADD CONSTRAINT "project_assets_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assets" ADD CONSTRAINT "project_assets_scene_uuid_fkey" FOREIGN KEY ("scene_uuid") REFERENCES "scenes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assets" ADD CONSTRAINT "project_assets_scene_variation_uuid_fkey" FOREIGN KEY ("scene_variation_uuid") REFERENCES "scene_variations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assets" ADD CONSTRAINT "project_assets_document_uuid_fkey" FOREIGN KEY ("document_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
