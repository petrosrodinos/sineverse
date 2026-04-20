import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { NextRequest } from "next/server";

const ALLOWED_AUDIO_FILES = new Set([
  "soft-ambient.mp3",
  "minimal-piano.mp3",
  "light-upbeat.mp3",
  "cinematic-pad.mp3",
  "nostalgic-soft.mp3",
]);

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params;

  if (!ALLOWED_AUDIO_FILES.has(filename)) {
    return new Response("Not found", { status: 404 });
  }

  const audioFilePath = path.join(
    process.cwd(),
    "assets",
    "estate-audios",
    filename,
  );

  try {
    await access(audioFilePath);

    const fileBuffer = await readFile(audioFilePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
