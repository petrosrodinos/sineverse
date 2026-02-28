/*
  Warnings:

  - You are about to drop the column `prompt_variation_uuid` on the `scene_videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scene_variation_uuid,selected]` on the table `scene_videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scene_variation_uuid` to the `scene_videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "scene_videos" DROP CONSTRAINT "scene_videos_prompt_variation_uuid_fkey";

-- DropIndex
DROP INDEX "scene_videos_prompt_variation_uuid_idx";

-- DropIndex
DROP INDEX "scene_videos_prompt_variation_uuid_selected_key";

-- AlterTable
ALTER TABLE "scene_videos" DROP COLUMN "prompt_variation_uuid",
ADD COLUMN     "scene_variation_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "scene_videos_scene_variation_uuid_idx" ON "scene_videos"("scene_variation_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "scene_videos_scene_variation_uuid_selected_key" ON "scene_videos"("scene_variation_uuid", "selected");

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_scene_variation_uuid_fkey" FOREIGN KEY ("scene_variation_uuid") REFERENCES "scene_variations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
