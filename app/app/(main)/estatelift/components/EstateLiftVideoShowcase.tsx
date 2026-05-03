import { Film, Move3d, Volume2 } from "lucide-react";

import { EstateLiftCreateVideoLink } from "@/app/(main)/estatelift/components/EstateLiftCreateVideoLink";
import { EstateLiftSampleVideo } from "@/app/(main)/estatelift/components/EstateLiftSampleVideo";
import {
  ESTATELIFT_SAMPLE_WALKTHROUGH_POSTER_URL,
  ESTATELIFT_SAMPLE_WALKTHROUGH_VIDEO_URL,
} from "@/config/marketing/estatelift-landing.config";

const showcaseBullets = [
  {
    icon: Move3d,
    text: "Smooth camera motion across rooms, not a slideshow",
  },
  {
    icon: Volume2,
    text: "Music and pacing tuned for listings and social cuts",
  },
  {
    icon: Film,
    text: "One export you can drop on Airbnb, email, or Reels",
  },
] as const;

export function EstateLiftVideoShowcase() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden border-b border-divider/40 py-16 md:py-24"
      id="demo"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_110%,hsl(var(--heroui-primary-500)/0.14),transparent_55%),linear-gradient(to_bottom,transparent,hsl(var(--heroui-content1)/0.35))]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Watch the walkthrough
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Listings win when people see the flow, not just the frames
            </h2>
            <p className="mt-4 text-pretty text-lg text-default-500">
              A short tour carries layout, light, and how rooms connect in one
              viewing—so guests and buyers understand the space before they
              message you or step through the door.
            </p>
            <ul className="mt-10 flex flex-col gap-4">
              {showcaseBullets.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex gap-3 rounded-2xl border border-divider/50 bg-content1/25 px-4 py-3.5 backdrop-blur-sm dark:bg-content1/15"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-foreground md:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <EstateLiftCreateVideoLink
                className="min-w-[240px] font-semibold shadow-lg shadow-primary/25"
                label="Build your walkthrough"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-4xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--heroui-primary-500)/0.15),transparent_40%,hsl(var(--heroui-primary-400)/0.12),transparent_70%)] blur-2xl md:-inset-6"
              />
              <div className="relative rounded-2xl border border-divider/60 bg-gradient-to-b from-content1/50 to-content1/20 p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md dark:from-content1/30 dark:to-content1/10 md:p-3">
                <div className="flex items-center justify-between gap-3 border-b border-divider/40 px-3 pb-2 md:px-4 md:pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-danger/80" />
                    <span className="size-2.5 rounded-full bg-warning/80" />
                    <span className="size-2.5 rounded-full bg-success/70" />
                  </div>
                  <p className="truncate text-center text-xs font-medium text-default-500">
                    Walkthrough preview
                  </p>
                  <span aria-hidden className="w-14 shrink-0" />
                </div>
                <div className="overflow-hidden rounded-xl">
                  <EstateLiftSampleVideo
                    captionsSrc="/estatelift-sample-captions.vtt"
                    posterUrl={ESTATELIFT_SAMPLE_WALKTHROUGH_POSTER_URL}
                    src={ESTATELIFT_SAMPLE_WALKTHROUGH_VIDEO_URL}
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-default-500 md:text-sm">
                Your export uses your photos, room order, and style settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
