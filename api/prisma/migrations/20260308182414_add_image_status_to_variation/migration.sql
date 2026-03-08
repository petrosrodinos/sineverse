-- AlterTable
ALTER TABLE "scene_variations" ADD COLUMN     "image_generation_error" TEXT,
ADD COLUMN     "image_generation_status" TEXT DEFAULT 'IDLE';
