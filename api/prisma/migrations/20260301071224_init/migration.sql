/*
  Warnings:

  - You are about to drop the column `genre` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `tone` on the `projects` table. All the data in the column will be lost.
  - Made the column `title` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `scenes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "genre",
DROP COLUMN "tone",
ADD COLUMN     "genres" JSONB,
ADD COLUMN     "tones" JSONB,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "scenes" ALTER COLUMN "title" SET NOT NULL;
