CREATE TYPE "ProjectType" AS ENUM ('FILM', 'ESTATE');

ALTER TABLE "projects" ADD COLUMN "type" "ProjectType" NOT NULL DEFAULT 'FILM';
