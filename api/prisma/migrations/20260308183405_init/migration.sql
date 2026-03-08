/*
  Warnings:

  - The `image_generation_status` column on the `scene_variations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "scene_variations" DROP COLUMN "image_generation_status",
ADD COLUMN     "image_generation_status" "MediaStatus" DEFAULT 'PENDING';
