import type { SocialProofIconId } from "@/app/(main)/estatelift/components/EstateLiftSocialProofCarousel";

import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  ArrowRight,
  Captions,
  Check,
  ImageIcon,
  Layers,
  Music,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";

import { LandingHashScroll } from "./LandingHashScroll";

import {
  EstateLiftSocialProofCarousel,
  type SocialProofCarouselItem,
} from "@/app/(main)/estatelift/components/EstateLiftSocialProofCarousel";
import { Routes } from "@/config/routes";

const openingAngles = [
  {
    title: "Listings need more than photos",
    body: "Your photos are not enough anymore. Listings with video get more views, more engagement, and more bookings. Our AI turns your property photos into professional video tours in seconds — helping you stand out and convert faster. Upload. Customize. Download. Done.",
  },
  {
    title: "For Airbnb hosts",
    body: "Get more bookings with better visuals. Turn your Airbnb photos into a beautiful video walkthrough that helps guests experience your space before they book. In less than a minute, you will have a professional video that makes your listing stand out.",
  },
  {
    title: "For real estate",
    body: "Sell properties faster with AI video tours. Create high-quality walkthrough videos from listing photos — without hiring a videographer. Impress clients, increase engagement, and close deals quicker.",
  },
] as const;

const problemIntro =
  "Most listings rely on static photos. But travelers and buyers want to experience a space — not just scroll through it.";

const problemPoints = [
  "Photos do not tell a story",
  "Videos are expensive and time-consuming",
  "Editing requires skills most hosts do not have",
] as const;

const solutionPoints = [
  "AI generates smooth walkthrough motion",
  "Adds transitions, camera movement, and depth",
  "Ready for Airbnb, booking platforms, or social media",
] as const;

const keyFeatures = [
  { icon: Video, title: "AI-generated walkthrough videos from photos" },
  {
    icon: Layers,
    title: "Smart scene ordering (living room to bedroom and more)",
  },
  { icon: Music, title: "Background music auto-added" },
  { icon: Captions, title: "Automatic captions for your tour" },
  {
    icon: Smartphone,
    title: "Vertical and horizontal formats (Reels, TikTok, listings)",
  },
  { icon: Zap, title: "Ready in under 60 seconds" },
] as const;

const benefitLines = [
  "Listings with video can increase engagement by up to 3x.",
  "More bookings on Airbnb",
  "Higher perceived property value",
  "Better conversion rates for real estate agents",
] as const;

const howItWorks = [
  { title: "Upload your property photos", step: 1 },
  { title: "Choose a style (modern, luxury, cozy)", step: 2 },
  { title: "Download your AI-generated video", step: 3 },
] as const;

const socialProofFeatured = {
  quote:
    "I dropped a walkthrough on my listing and inquiries doubled within two weeks. The whole thing took less time than editing one photo set.",
  name: "Marta Kowalski",
  role: "Superhost",
  context: "Lisbon · 2-bedroom apartment",
  highlight: "2× inquiries in 14 days",
} as const;

function socialProofItemId(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const socialProofTestimonials: readonly {
  quote: string;
  name: string;
  role: string;
  context: string;
  icon: SocialProofIconId;
}[] = [
  {
    quote:
      "Our cabin in the Highlands finally feels as warm on the listing as it does in person. The vertical cut goes straight to Instagram without a second export.",
    name: "James Reid",
    role: "Host",
    context: "Scottish Highlands",
    icon: "home",
  },
  {
    quote:
      "I attach a tour link before every viewing. Sellers see motion and depth; buyers show up already sold on the flow of the space.",
    name: "Elena Vásquez",
    role: "Broker associate",
    context: "Madrid",
    icon: "building2",
  },
  {
    quote:
      "Three furnished units refreshed before lunch—no crew, no scheduling. Property managers live or die on turnaround; this is the first tool that actually keeps up.",
    name: "Priya Shah",
    role: "Property manager",
    context: "Berlin · 28 units",
    icon: "building2",
  },
  {
    quote:
      "Guests reference the video in messages now. Fewer repetitive questions about layout and stairs, which means faster confirmations.",
    name: "Daniel Olsen",
    role: "Host",
    context: "Copenhagen",
    icon: "home",
  },
  {
    quote:
      "Scene order felt intentional—living room, kitchen, sleep spaces—without me touching a timeline. That is the bar for AI in our pitch decks.",
    name: "Sofia Lopes",
    role: "Short-term rental owner",
    context: "Porto",
    icon: "home",
  },
  {
    quote:
      "We ran the same floor plan with and without video on our listing microsite. Time on page tripled and callback requests followed within days.",
    name: "Amélie Bernard",
    role: "Marketing lead",
    context: "Regional brokerage · France",
    icon: "building2",
  },
  {
    quote:
      "Twelve keys across two buildings used to mean twelve separate shoots. Now refresh season is one upload batch and consistent branding across every tour.",
    name: "Marcus Chen",
    role: "Portfolio operator",
    context: "Vancouver · 12 units",
    icon: "home",
  },
];

const socialProofCarouselItems: SocialProofCarouselItem[] = [
  {
    id: socialProofItemId(socialProofFeatured.name),
    featured: true,
    quote: socialProofFeatured.quote,
    name: socialProofFeatured.name,
    role: socialProofFeatured.role,
    context: socialProofFeatured.context,
    highlight: socialProofFeatured.highlight,
    icon: "quote",
  },
  ...socialProofTestimonials.map((t) => ({
    id: socialProofItemId(t.name),
    featured: false,
    quote: t.quote,
    name: t.name,
    role: t.role,
    context: t.context,
    icon: t.icon,
  })),
];

const starIndices = [1, 2, 3, 4, 5] as const;

function SocialProofStars({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex gap-0.5 ${className ?? ""}`}>
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

export function EstateLiftLandingPage() {
  return (
    <LandingHashScroll pathnameMatch="/estatelift">
      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-divider/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--heroui-primary-500)/0.22),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_20%,hsl(var(--heroui-primary-600)/0.12),transparent_50%),radial-gradient(ellipse_40%_35%_at_0%_30%,hsl(var(--heroui-primary-400)/0.08),transparent_45%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Property video tours
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Turn Your Property Photos Into Stunning AI Video Tours in
                Seconds
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-default-500 md:text-xl">
                Upload your Airbnb or real estate photos and instantly create
                cinematic walkthrough videos that boost bookings and sales.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  as={NextLink}
                  className="min-w-[240px] font-semibold shadow-lg shadow-primary/25"
                  color="primary"
                  endContent={<ArrowRight className="size-4" />}
                  href={Routes.auth.sign_up}
                  radius="full"
                  size="lg"
                >
                  Create Your First Video
                </Button>
              </div>
              <p className="mt-4 text-sm text-default-500">
                No editing skills required
              </p>
            </div>
            <div className="mx-auto mt-16 grid gap-6 md:grid-cols-3">
              {openingAngles.map((block) => (
                <Card
                  key={block.title}
                  className="border border-divider/50 bg-content1/30 shadow-none backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-content1/20"
                >
                  <CardBody className="flex flex-col gap-3 p-6">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Sparkles className="size-5" strokeWidth={1.75} />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {block.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-default-500">
                      {block.body}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-divider/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                The problem with static listings
              </h2>
              <p className="mt-4 text-lg text-default-500">{problemIntro}</p>
            </div>
            <ul className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
              {problemPoints.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-2xl border border-divider/50 bg-content1/20 px-5 py-4 text-foreground dark:bg-content1/10"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-default-100 text-xs font-bold text-default-600">
                    —
                  </span>
                  <span className="text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-divider/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                The solution
              </h2>
              <p className="mt-4 text-lg text-default-500">
                We turn your photos into a professional video tour —
                automatically.
              </p>
            </div>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-1">
              {solutionPoints.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-foreground dark:bg-primary/10"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    strokeWidth={2.5}
                  />
                  <span className="text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="scroll-mt-24 border-b border-divider/40 py-20 md:py-28"
          id="features"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Key features
              </h2>
              <p className="mt-4 text-lg text-default-500">
                Everything you need to ship a tour in one flow.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {keyFeatures.map(({ icon: Icon, title }) => (
                <Card
                  key={title}
                  className="border border-divider/50 bg-content1/30 shadow-none backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-content1/20"
                >
                  <CardBody className="flex flex-row items-start gap-4 p-6">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <p className="text-base font-medium leading-snug text-foreground">
                      {title}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-divider/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Benefits
              </h2>
              <p className="mt-4 text-lg text-default-500">
                You are not selling AI video — you are selling more bookings and
                faster sales.
              </p>
            </div>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-3">
              {benefitLines.map((line) => (
                <li key={line} className="flex gap-3 text-lg text-default-600">
                  <TrendingUp
                    className="mt-1 size-5 shrink-0 text-primary"
                    strokeWidth={2}
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="relative scroll-mt-24 overflow-hidden border-b border-divider/40 py-20 md:py-28"
          id="about"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,hsl(var(--heroui-primary-500)/0.08),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Trusted by hosts, managers, and agents
              </h2>
              <p className="mt-4 text-lg text-default-500">
                Real outcomes from people who ship listings every week—not
                generic praise.
              </p>
              <div className="mx-auto mt-8 flex flex-col items-center gap-2">
                <SocialProofStars />
                <p className="text-sm font-medium text-foreground">
                  4.9 <span className="font-normal text-default-500">/ 5</span>
                  <span className="sr-only">Average rating 4.9 out of 5</span>
                </p>
              </div>
            </div>

            <EstateLiftSocialProofCarousel items={socialProofCarouselItems} />
          </div>
        </section>

        <section className="border-t border-divider/40 bg-content1/20 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-divider/50 bg-gradient-to-br from-primary/10 via-background to-background p-10 md:flex-row md:p-14 lg:p-16">
              <div className="max-w-xl text-center md:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-divider/60 bg-background/60 px-3 py-1 text-xs font-medium text-default-600 backdrop-blur-sm">
                  <ImageIcon className="size-3.5 text-primary" />
                  Cinematic listings
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Turn your listing into a cinematic experience
                </h2>
                <p className="mt-4 text-lg text-default-500">
                  Create your first video now.
                </p>
              </div>
              <Button
                as={NextLink}
                className="shrink-0 min-w-[240px] font-semibold shadow-lg shadow-primary/25"
                color="primary"
                endContent={<ArrowRight className="size-4" />}
                href={Routes.auth.sign_up}
                radius="full"
                size="lg"
              >
                Create your first video now
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t border-divider/50 bg-content1/40 backdrop-blur-sm dark:bg-content1/20">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-default-500 md:py-10">
            <p>
              Powered by{" "}
              <NextLink
                className="text-default-600 transition-colors hover:text-primary"
                href="https://logiqdev.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Logiqdev
              </NextLink>
            </p>
          </div>
        </footer>
      </div>
    </LandingHashScroll>
  );
}
