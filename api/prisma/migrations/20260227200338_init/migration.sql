/*
  Warnings:

  - You are about to drop the column `genre_style` on the `scene_variations` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `scene_variations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scene_variations" DROP COLUMN "genre_style",
DROP COLUMN "mood",
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "tone" TEXT;
