/*
  Warnings:

  - You are about to drop the column `duration_sec` on the `scenes` table. All the data in the column will be lost.
  - Added the required column `title` to the `scene_variations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scene_variations" ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "prompt_text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "scenes" DROP COLUMN "duration_sec";
