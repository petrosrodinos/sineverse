/*
  Warnings:

  - The `ai_model` column on the `scene_variations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[scene_uuid,selected]` on the table `scene_variations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "scene_variations" DROP COLUMN "ai_model",
ADD COLUMN     "ai_model" TEXT;

-- DropEnum
DROP TYPE "VideoProvider";

-- CreateIndex
CREATE UNIQUE INDEX "scene_variations_scene_uuid_selected_key" ON "scene_variations"("scene_uuid", "selected");
