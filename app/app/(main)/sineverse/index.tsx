import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Clapperboard, Film, Layers, Sparkles, Share2, Play, ArrowRight } from "lucide-react";
import { Routes } from "@/config/routes";
import { environments } from "@/config/environments";
import { LandingHashScroll } from "./components/LandingHashScroll";

const steps = [
  { title: "Describe your idea", body: "One sentence is enough. We expand it into a structured story." },
  { title: "Generate scenes", body: "AI produces cinematic clips with tuned prompts and variations." },
  { title: "Assemble on the timeline", body: "Arrange, trim, and refine without traditional frame editing." },
  { title: "Publish", body: "Ship your film and prepare it for discovery and streaming." },
] as const;

const features = [
  {
    icon: Sparkles,
    title: "AI-first workflow",
    body: "From concept to scenes without a conventional edit suite. Focus on story, not codecs.",
  },
  {
    icon: Layers,
    title: "Structured scenes",
    body: "Each beat lives in its own scene with prompts you can iterate until it feels right.",
  },
  {
    icon: Film,
    title: "Cinematic assembly",
    body: "A lightweight timeline built for arranging generated footage, not manual production.",
  },
  {
    icon: Share2,
    title: "Built to publish",
    body: "Export and share with a path toward streaming-style discovery and analytics.",
  },
] as const;

export function SineversePage() {
  return (
    <LandingHashScroll pathnameMatch="/sineverse">
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-divider/40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--heroui-primary-500)/0.22),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_20%,hsl(var(--heroui-primary-600)/0.12),transparent_50%),radial-gradient(ellipse_40%_35%_at_0%_30%,hsl(var(--heroui-primary-400)/0.08),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">AI-native film studio</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">Turn a single idea into a full cinematic film</h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-default-500 md:text-xl">{environments.APP_NAME} enriches your concept, breaks it into scenes, generates optimized prompts, and helps you assemble and publish without a traditional video editor.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button as={NextLink} href={Routes.auth.sign_up} color="primary" size="lg" radius="full" className="min-w-[200px] font-semibold shadow-lg shadow-primary/25" endContent={<ArrowRight className="size-4" />}>
                Start creating
              </Button>
              <Button as={NextLink} href={Routes.auth.sign_in} variant="bordered" size="lg" radius="full" className="min-w-[200px] font-medium border-default-300">
                Sign in
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-2xl border border-divider/60 bg-content1/40 p-1 shadow-2xl shadow-black/20 backdrop-blur-sm dark:bg-content1/30">
              <div className="flex aspect-[21/9] min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-background-100 via-background to-background-200 dark:from-background-200 dark:via-background dark:to-background-100 md:min-h-[280px]">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary md:size-20">
                  <Clapperboard className="size-8 md:size-10" strokeWidth={1.5} />
                </div>
                <p className="text-center text-sm text-default-500 md:text-base">Your studio canvas preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 border-b border-divider/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Built for filmmakers, not admin panels</h2>
            <p className="mt-4 text-lg text-default-500">Premium, minimal, and immersive by design.</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border border-divider/50 bg-content1/30 shadow-none backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] dark:bg-content1/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-default-500">{body}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-divider/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-default-500">A linear path from idea to finished film.</p>
          </div>
          <ol className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full border border-divider/50 bg-content1/30 shadow-none backdrop-blur-sm dark:bg-content1/20">
                  <CardBody className="gap-3 p-6 md:p-8">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary">{i + 1}</span>
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-default-500 leading-relaxed">{step.body}</p>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-divider/40 bg-content1/20 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">About {environments.APP_NAME}</h2>
            <p className="mt-6 text-lg leading-relaxed text-default-500">
              We build software for people who want films to emerge from ideas, not from months in a traditional edit suite. Our pipeline is scene-first: structure the story, generate with the right prompts, refine variations, and assemble on a timeline made for AI footage. Streaming and discovery are on the roadmap so finished work can reach an audience the way audiences expect today.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-divider/50 bg-gradient-to-br from-primary/10 via-background to-background p-10 md:flex-row md:p-14 lg:p-16">
            <div className="max-w-xl text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-divider/60 bg-background/60 px-3 py-1 text-xs font-medium text-default-600 backdrop-blur-sm">
                <Play className="size-3.5 text-primary" />
                Streaming-ready roadmap
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Ready when you are</h2>
              <p className="mt-4 text-lg text-default-500">Create an account, open the studio, and move from first prompt to first cut in one session.</p>
            </div>
            <Button as={NextLink} href={Routes.auth.sign_up} color="primary" size="lg" radius="full" className="shrink-0 min-w-[220px] font-semibold shadow-lg shadow-primary/25" endContent={<ArrowRight className="size-4" />}>
              Open studio
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-divider/50 bg-content1/40 backdrop-blur-sm dark:bg-content1/20">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-default-500 md:py-10">
          <p>
            Powered by{" "}
            <NextLink href="https://logiqdev.com/" className="text-default-600 transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
              Logiqdev
            </NextLink>
          </p>
        </div>
      </footer>
    </div>
    </LandingHashScroll>
  );
}
