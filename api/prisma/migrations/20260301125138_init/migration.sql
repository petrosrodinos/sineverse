/*
  Warnings:

  - You are about to drop the column `duration_sec` on the `scene_videos` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `scene_videos` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `scene_videos` table. All the data in the column will be lost.
  - You are about to drop the column `selected` on the `scene_videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scene_uuid,selected]` on the table `scene_variations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scene_variation_uuid]` on the table `scene_videos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "scene_videos_scene_variation_uuid_idx";

-- DropIndex
DROP INDEX "scene_videos_scene_variation_uuid_selected_key";

-- AlterTable
ALTER TABLE "scene_videos" DROP COLUMN "duration_sec",
DROP COLUMN "provider",
DROP COLUMN "resolution",
DROP COLUMN "selected";

-- CreateIndex
CREATE UNIQUE INDEX "scene_variations_scene_uuid_selected_key" ON "scene_variations"("scene_uuid", "selected");

-- CreateIndex
CREATE UNIQUE INDEX "scene_videos_scene_variation_uuid_key" ON "scene_videos"("scene_variation_uuid");
