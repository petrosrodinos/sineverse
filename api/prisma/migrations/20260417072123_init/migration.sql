-- CreateEnum
CREATE TYPE "TimelineTrackType" AS ENUM ('VIDEO', 'AUDIO', 'VOICEOVER', 'MUSIC', 'CAPTION');

-- CreateEnum
CREATE TYPE "TimelineTransitionType" AS ENUM ('FADE', 'CROSSFADE', 'DISSOLVE', 'SLIDE_LEFT', 'SLIDE_RIGHT', 'ZOOM');

-- CreateTable
CREATE TABLE "timeline_tracks" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "final_project_uuid" TEXT NOT NULL,
    "type" "TimelineTrackType" NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_clips" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "track_uuid" TEXT NOT NULL,
    "project_asset_uuid" TEXT,
    "start_sec" DOUBLE PRECISION NOT NULL,
    "end_sec" DOUBLE PRECISION NOT NULL,
    "trim_start" DOUBLE PRECISION,
    "trim_end" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION DEFAULT 1.0,
    "speed" DOUBLE PRECISION DEFAULT 1.0,
    "transition_in_uuid" TEXT,
    "transition_out_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_clips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_transitions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "TimelineTransitionType" NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_captions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "clip_uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "start_sec" DOUBLE PRECISION NOT NULL,
    "end_sec" DOUBLE PRECISION NOT NULL,
    "position" JSONB,
    "style" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_captions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_music" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "final_project_uuid" TEXT NOT NULL,
    "audio_uuid" TEXT NOT NULL,
    "start_sec" DOUBLE PRECISION NOT NULL,
    "end_sec" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_music_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "timeline_tracks_uuid_key" ON "timeline_tracks"("uuid");

-- CreateIndex
CREATE INDEX "timeline_tracks_uuid_idx" ON "timeline_tracks"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_tracks_final_project_uuid_order_key" ON "timeline_tracks"("final_project_uuid", "order");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_clips_uuid_key" ON "timeline_clips"("uuid");

-- CreateIndex
CREATE INDEX "timeline_clips_uuid_idx" ON "timeline_clips"("uuid");

-- CreateIndex
CREATE INDEX "timeline_clips_track_uuid_idx" ON "timeline_clips"("track_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_transitions_uuid_key" ON "timeline_transitions"("uuid");

-- CreateIndex
CREATE INDEX "timeline_transitions_uuid_idx" ON "timeline_transitions"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_captions_uuid_key" ON "timeline_captions"("uuid");

-- CreateIndex
CREATE INDEX "timeline_captions_uuid_idx" ON "timeline_captions"("uuid");

-- CreateIndex
CREATE INDEX "timeline_captions_clip_uuid_idx" ON "timeline_captions"("clip_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_music_uuid_key" ON "timeline_music"("uuid");

-- CreateIndex
CREATE INDEX "timeline_music_uuid_idx" ON "timeline_music"("uuid");

-- AddForeignKey
ALTER TABLE "timeline_tracks" ADD CONSTRAINT "timeline_tracks_final_project_uuid_fkey" FOREIGN KEY ("final_project_uuid") REFERENCES "final_projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_track_uuid_fkey" FOREIGN KEY ("track_uuid") REFERENCES "timeline_tracks"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_project_asset_uuid_fkey" FOREIGN KEY ("project_asset_uuid") REFERENCES "project_assets"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_transition_in_uuid_fkey" FOREIGN KEY ("transition_in_uuid") REFERENCES "timeline_transitions"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_transition_out_uuid_fkey" FOREIGN KEY ("transition_out_uuid") REFERENCES "timeline_transitions"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_captions" ADD CONSTRAINT "timeline_captions_clip_uuid_fkey" FOREIGN KEY ("clip_uuid") REFERENCES "timeline_clips"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_music" ADD CONSTRAINT "timeline_music_final_project_uuid_fkey" FOREIGN KEY ("final_project_uuid") REFERENCES "final_projects"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_music" ADD CONSTRAINT "timeline_music_audio_uuid_fkey" FOREIGN KEY ("audio_uuid") REFERENCES "documents"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "currency_rate_snapshots_base_currency_quote_currency_fetched_at" RENAME TO "currency_rate_snapshots_base_currency_quote_currency_fetche_idx";
