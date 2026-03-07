-- DropForeignKey
ALTER TABLE "scene_variations" DROP CONSTRAINT "scene_variations_prompt_image_uuid_fkey";

-- AddForeignKey
ALTER TABLE "scene_variations" ADD CONSTRAINT "scene_variations_prompt_image_uuid_fkey" FOREIGN KEY ("prompt_image_uuid") REFERENCES "documents"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
