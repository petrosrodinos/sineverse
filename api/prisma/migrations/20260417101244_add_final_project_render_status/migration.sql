-- AlterTable
ALTER TABLE "final_projects" ADD COLUMN     "render_status" TEXT NOT NULL DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE "timeline_music" ALTER COLUMN "volume" SET DEFAULT 1.0;
