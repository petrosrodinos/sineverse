"use client";

import type { LucideIcon } from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  Quote,
  Star,
} from "lucide-react";

export type SocialProofIconId = "quote" | "home" | "building2";

export type SocialProofCarouselItem = {
  id: string;
  featured: boolean;
  quote: string;
  name: string;
  role: string;
  context: string;
  highlight?: string;
  icon: SocialProofIconId;
};

const socialProofIcons: Record<SocialProofIconId, LucideIcon> = {
  quote: Quote,
  home: Home,
  building2: Building2,
};

const starIndices = [1, 2, 3, 4, 5] as const;

function SocialProofStars({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx("flex gap-0.5", className)}>
      {starIndices.map((s) => (
        <Star
          key={s}
          className="size-4 fill-primary/90 text-primary"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  const parts = name.split(" ").filter(Boolean);

  const initials =
    parts.length >= 2
      ? `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase()
      : (parts[0]?.slice(0, 2).toUpperCase() ?? "?");

  return (
    <div
      aria-hidden
      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-sm font-semibold text-primary ring-1 ring-primary/20"
    >
      {initials}
    </div>
  );
}

type EstateLiftSocialProofCarouselProps = {
  items: readonly SocialProofCarouselItem[];
};

export function EstateLiftSocialProofCarousel({
  items,
}: EstateLiftSocialProofCarouselProps) {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 6400,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 28,
      skipSnaps: false,
    },
    [autoplayPlugin],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);

    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);

      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div
      aria-label="Customer testimonials"
      className="mx-auto mt-12 w-full max-w-7xl"
      role="region"
    >
      <div className="relative">
        <Button
          isIconOnly
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 border-divider/60 bg-background/80 backdrop-blur-sm lg:flex"
          radius="full"
          type="button"
          variant="bordered"
          onPress={scrollPrev}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </Button>
        <Button
          isIconOnly
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 z-10 hidden size-11 translate-x-1/2 -translate-y-1/2 border-divider/60 bg-background/80 backdrop-blur-sm lg:flex"
          radius="full"
          type="button"
          variant="bordered"
          onPress={scrollNext}
        >
          <ChevronRight className="size-5" strokeWidth={2} />
        </Button>

        <div ref={emblaRef} className="overflow-hidden px-1 sm:px-2 lg:px-12">
          <div className="flex touch-pan-y gap-3">
            {items.map((item) => {
              const Icon = socialProofIcons[item.icon];

              return (
                <div
                  key={item.id}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.375rem)] lg:flex-[0_0_calc((100%-1.5rem)/3)]"
                >
                  <Card
                    className={clsx(
                      "flex h-full w-full flex-col rounded-2xl border shadow-none backdrop-blur-sm transition-[transform,box-shadow] duration-300",
                      item.featured
                        ? "border-primary/30 bg-gradient-to-br from-primary/10 via-content1/40 to-content1/20 dark:from-primary/12 dark:via-content1/20 dark:to-content1/10"
                        : "border-divider/50 bg-content1/30 dark:bg-content1/20",
                    )}
                  >
                    <CardBody className="flex flex-1 flex-col gap-4 p-5 sm:gap-4 sm:p-5 lg:gap-5 lg:p-6">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-default-100 text-default-600 sm:size-10 dark:bg-default-50/10">
                            <Icon
                              className="size-[1.125rem] sm:size-5"
                              strokeWidth={1.75}
                            />
                          </div>
                          <AvatarInitials name={item.name} />
                        </div>
                        <SocialProofStars className="shrink-0 scale-90 opacity-90 sm:scale-100" />
                      </div>
                      {item.featured ? (
                        <span className="w-fit rounded-full border border-primary/35 bg-primary/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary sm:text-[10px]">
                          Featured
                        </span>
                      ) : null}
                      <blockquote className="min-h-0 flex-1">
                        <p className="text-pretty text-sm leading-relaxed text-default-600 sm:text-[0.9375rem] lg:text-sm lg:leading-relaxed xl:text-[0.9375rem]">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </blockquote>
                      {item.highlight ? (
                        <div className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5 dark:bg-primary/15 sm:px-4 sm:py-3">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-primary sm:text-xs">
                            Outcome
                          </p>
                          <p className="mt-0.5 text-xs font-semibold text-foreground sm:text-sm">
                            {item.highlight}
                          </p>
                        </div>
                      ) : null}
                      <div className="mt-auto border-t border-divider/40 pt-4">
                        <p className="truncate font-semibold leading-tight text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-default-500 sm:text-sm">
                          {item.role} · {item.context}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
        <Button
          isIconOnly
          aria-label="Previous testimonial"
          radius="full"
          size="sm"
          type="button"
          variant="bordered"
          onPress={scrollPrev}
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </Button>
        <Button
          isIconOnly
          aria-label="Next testimonial"
          radius="full"
          size="sm"
          type="button"
          variant="bordered"
          onPress={scrollNext}
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </Button>
      </div>

      <nav
        aria-label="Testimonial slides"
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            aria-label={`Show testimonial ${index + 1} of ${items.length}: ${item.name}`}
            aria-pressed={selectedIndex === index}
            className={clsx(
              "h-2 rounded-full transition-all duration-300 ease-out",
              selectedIndex === index
                ? "w-8 bg-primary shadow-sm shadow-primary/30"
                : "w-2 bg-default-300 hover:bg-default-400 dark:bg-default-600",
            )}
            type="button"
            onClick={() => scrollTo(index)}
          />
        ))}
      </nav>
    </div>
  );
}
