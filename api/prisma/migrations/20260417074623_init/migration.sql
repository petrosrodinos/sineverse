/*
  Warnings:

  - You are about to drop the column `track_uuid` on the `timeline_clips` table. All the data in the column will be lost.
  - You are about to drop the `timeline_tracks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `final_project_uuid` to the `timeline_clips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_uuid` to the `timeline_clips` table without a default value. This is not possible if the table is not empty.
  - Made the column `project_asset_uuid` on table `timeline_clips` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "timeline_clips" DROP CONSTRAINT "timeline_clips_project_asset_uuid_fkey";

-- DropForeignKey
ALTER TABLE "timeline_clips" DROP CONSTRAINT "timeline_clips_track_uuid_fkey";

-- DropForeignKey
ALTER TABLE "timeline_tracks" DROP CONSTRAINT "timeline_tracks_final_project_uuid_fkey";

-- DropIndex
DROP INDEX "timeline_clips_track_uuid_idx";

-- AlterTable
ALTER TABLE "timeline_clips" DROP COLUMN "track_uuid",
ADD COLUMN     "final_project_uuid" TEXT NOT NULL,
ADD COLUMN     "project_uuid" TEXT NOT NULL,
ALTER COLUMN "project_asset_uuid" SET NOT NULL;

-- DropTable
DROP TABLE "timeline_tracks";

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_final_project_uuid_fkey" FOREIGN KEY ("final_project_uuid") REFERENCES "final_projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_project_asset_uuid_fkey" FOREIGN KEY ("project_asset_uuid") REFERENCES "project_assets"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
