"use client";

import { useEffect, useRef } from "react";

import { ESTATELIFT_SAMPLE_WALKTHROUGH_PREVIEW_AT_SECONDS } from "@/config/marketing/estatelift-landing.config";

type EstateLiftSampleVideoProps = {
  src: string;
  posterUrl?: string;
  captionsSrc: string;
};

export function EstateLiftSampleVideo({
  src,
  posterUrl,
  captionsSrc,
}: EstateLiftSampleVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (posterUrl) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    let cancelled = false;

    const seekToPreview = () => {
      if (cancelled) {
        return;
      }

      try {
        const t = ESTATELIFT_SAMPLE_WALKTHROUGH_PREVIEW_AT_SECONDS;

        const end = Number.isFinite(video.duration)
          ? video.duration
          : Number.POSITIVE_INFINITY;

        if (t < end) {
          video.currentTime = t;
        }
      } catch {
        return;
      }
    };

    const onLoadedData = () => {
      seekToPreview();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      seekToPreview();
    } else {
      video.addEventListener("loadeddata", onLoadedData, { once: true });
    }

    return () => {
      cancelled = true;

      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [posterUrl, src]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-default-950">
      <video
        ref={videoRef}
        controls
        playsInline
        className="size-full object-contain"
        poster={posterUrl}
        preload="auto"
        src={src}
      >
        <track kind="captions" label="English" src={captionsSrc} srcLang="en" />
      </video>
    </div>
  );
}
