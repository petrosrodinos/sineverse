"use client";

import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import type { Key } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTimelineMusic, useUpsertTimelineMusic } from "@/features/timeline-music/hooks/use-timeline-music";
import {
  ESTATE_AUDIO_TRACK_OPTIONS,
  ESTATE_DEFAULT_AUDIO_TRACK_ID,
} from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";

const ESTATE_AUDIO_TRACK_ID_BY_FILENAME: Record<string, string> = {
  "soft-ambient.mp3": "soft_ambient",
  "minimal-piano.mp3": "minimal_piano",
  "light-upbeat.mp3": "light_upbeat",
  "cinematic-pad.mp3": "cinematic_pad",
  "nostalgic-soft.mp3": "nostalgic_soft",
};

type FinalRenderStepProps = {
  finalProjectUuid: string | null;
};

export function FinalRenderStep({ finalProjectUuid }: FinalRenderStepProps) {
  const [audioTrackId, setAudioTrackId] = useState<string>(ESTATE_DEFAULT_AUDIO_TRACK_ID);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: timelineMusic } = useTimelineMusic(finalProjectUuid ?? "");
  const { mutate: upsertTimelineMusic } = useUpsertTimelineMusic();

  const selectedAudioOption = useMemo(
    () => ESTATE_AUDIO_TRACK_OPTIONS.find((opt) => opt.id === audioTrackId) ?? ESTATE_AUDIO_TRACK_OPTIONS[0],
    [audioTrackId],
  );

  const currentMusic = timelineMusic?.[0] ?? null;

  useEffect(() => {
    if (!currentMusic?.audio?.filename) {
      return;
    }
    const mappedTrackId = ESTATE_AUDIO_TRACK_ID_BY_FILENAME[currentMusic.audio.filename];
    if (mappedTrackId) {
      setAudioTrackId(mappedTrackId);
    }
    setVolume(currentMusic.volume ?? 1);
  }, [currentMusic]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.volume = volume;
  }, [volume]);

  const handleAudioChange = useCallback((keys: "all" | Iterable<Key>) => {
    if (keys === "all") return;
    const first = Array.from(keys)[0];
    if (typeof first === "string") {
      setAudioTrackId(first);
      if (!finalProjectUuid) {
        return;
      }
      upsertTimelineMusic({
        finalProjectUuid,
        dto: {
          track_id: first,
          volume,
          start_sec: 0,
          end_sec: currentMusic?.end_sec ?? 4,
        },
      });
    }
  }, [finalProjectUuid, upsertTimelineMusic, volume, currentMusic]);

  const handleAudioMetadata = useCallback(() => {
    const duration = audioRef.current?.duration;
    if (!finalProjectUuid || !duration || !Number.isFinite(duration) || audioTrackId === "none") {
      return;
    }
    upsertTimelineMusic({
      finalProjectUuid,
      dto: {
        track_id: audioTrackId,
        volume,
        start_sec: 0,
        end_sec: duration,
      },
    });
  }, [finalProjectUuid, audioTrackId, volume, upsertTimelineMusic]);

  return (
    <div className="flex flex-col items-stretch gap-6">
      <Select
        label="Audio"
        size="sm"
        selectedKeys={new Set([audioTrackId])}
        onSelectionChange={handleAudioChange}
        classNames={{ trigger: "min-h-10" }}
      >
        {ESTATE_AUDIO_TRACK_OPTIONS.map((opt) => (
          <SelectItem key={opt.id}>{opt.label}</SelectItem>
        ))}
      </Select>

      {selectedAudioOption.id !== "none" && selectedAudioOption.src && (
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          src={selectedAudioOption.src}
          onLoadedMetadata={handleAudioMetadata}
        />
      )}

      <Button color="secondary" size="lg" className="font-semibold" isDisabled>
        Generate Video (coming soon)
      </Button>
    </div>
  );
}
