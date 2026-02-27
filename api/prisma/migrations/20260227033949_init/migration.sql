-- CreateEnum
CREATE TYPE "AuthRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'ENRICHED', 'SCENES_GENERATED', 'PROMPTS_GENERATED', 'VIDEOS_GENERATING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "VideoProvider" AS ENUM ('VEO3', 'RUNWAY', 'PIKA', 'STABILITY');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('VIDEO', 'IMAGE', 'AUDIO', 'DOCUMENT', 'THUMBNAIL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" "AuthRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "title" TEXT,
    "original_concept" TEXT NOT NULL,
    "enriched_concept" TEXT,
    "genre" TEXT,
    "tone" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "project_uuid" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "duration_sec" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scene_prompt_variations" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "scene_uuid" TEXT NOT NULL,
    "prompt_image_uuid" TEXT,
    "style" TEXT,
    "mood" TEXT,
    "genre_style" TEXT,
    "camera_style" TEXT,
    "shot_type" TEXT,
    "camera_movement" TEXT,
    "lens_type" TEXT,
    "depth_of_field" TEXT,
    "lighting" TEXT,
    "color_grade" TEXT,
    "time_of_day" TEXT,
    "aspect_ratio" TEXT,
    "resolution" TEXT,
    "fps" INTEGER,
    "duration_sec" INTEGER,
    "ai_model" "VideoProvider",
    "seed" INTEGER,
    "creativity" DOUBLE PRECISION,
    "motion_strength" DOUBLE PRECISION,
    "guidance_scale" DOUBLE PRECISION,
    "audio_style" TEXT,
    "include_sound" BOOLEAN NOT NULL DEFAULT false,
    "prompt_text" TEXT NOT NULL,
    "negative_prompt" TEXT,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scene_prompt_variations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scene_videos" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "prompt_variation_uuid" TEXT NOT NULL,
    "provider" "VideoProvider" NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "provider_job_id" TEXT,
    "video_uuid" TEXT,
    "duration_sec" INTEGER,
    "resolution" TEXT,
    "status" "VideoStatus" NOT NULL DEFAULT 'PENDING',
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scene_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_projects" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "project_uuid" TEXT NOT NULL,
    "title" TEXT,
    "duration_sec" INTEGER,
    "video_uuid" TEXT,
    "thumbnail_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "final_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL DEFAULT 'DOCUMENT',
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_uuid_idx" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "projects_uuid_key" ON "projects"("uuid");

-- CreateIndex
CREATE INDEX "projects_uuid_idx" ON "projects"("uuid");

-- CreateIndex
CREATE INDEX "projects_user_uuid_idx" ON "projects"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "scenes_uuid_key" ON "scenes"("uuid");

-- CreateIndex
CREATE INDEX "scenes_uuid_idx" ON "scenes"("uuid");

-- CreateIndex
CREATE INDEX "scenes_project_uuid_idx" ON "scenes"("project_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "scenes_project_uuid_order_key" ON "scenes"("project_uuid", "order");

-- CreateIndex
CREATE UNIQUE INDEX "scene_prompt_variations_uuid_key" ON "scene_prompt_variations"("uuid");

-- CreateIndex
CREATE INDEX "scene_prompt_variations_uuid_idx" ON "scene_prompt_variations"("uuid");

-- CreateIndex
CREATE INDEX "scene_prompt_variations_scene_uuid_idx" ON "scene_prompt_variations"("scene_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "scene_videos_uuid_key" ON "scene_videos"("uuid");

-- CreateIndex
CREATE INDEX "scene_videos_uuid_idx" ON "scene_videos"("uuid");

-- CreateIndex
CREATE INDEX "scene_videos_prompt_variation_uuid_idx" ON "scene_videos"("prompt_variation_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "scene_videos_prompt_variation_uuid_selected_key" ON "scene_videos"("prompt_variation_uuid", "selected");

-- CreateIndex
CREATE UNIQUE INDEX "final_projects_uuid_key" ON "final_projects"("uuid");

-- CreateIndex
CREATE INDEX "final_projects_uuid_idx" ON "final_projects"("uuid");

-- CreateIndex
CREATE INDEX "final_projects_project_uuid_idx" ON "final_projects"("project_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "documents_uuid_key" ON "documents"("uuid");

-- CreateIndex
CREATE INDEX "documents_uuid_idx" ON "documents"("uuid");

-- CreateIndex
CREATE INDEX "documents_type_idx" ON "documents"("type");

-- CreateIndex
CREATE INDEX "documents_order_idx" ON "documents"("order");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_prompt_variations" ADD CONSTRAINT "scene_prompt_variations_scene_uuid_fkey" FOREIGN KEY ("scene_uuid") REFERENCES "scenes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_prompt_variations" ADD CONSTRAINT "scene_prompt_variations_prompt_image_uuid_fkey" FOREIGN KEY ("prompt_image_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_prompt_variation_uuid_fkey" FOREIGN KEY ("prompt_variation_uuid") REFERENCES "scene_prompt_variations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene_videos" ADD CONSTRAINT "scene_videos_video_uuid_fkey" FOREIGN KEY ("video_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_projects" ADD CONSTRAINT "final_projects_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_projects" ADD CONSTRAINT "final_projects_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_projects" ADD CONSTRAINT "final_projects_video_uuid_fkey" FOREIGN KEY ("video_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_projects" ADD CONSTRAINT "final_projects_thumbnail_uuid_fkey" FOREIGN KEY ("thumbnail_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
