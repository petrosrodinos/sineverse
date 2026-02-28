/*
  Warnings:

  - Added the required column `scene_uuid` to the `scene_videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scene_videos" ADD COLUMN     "scene_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_scene_uuid_fkey" FOREIGN KEY ("scene_uuid") REFERENCES "scenes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
