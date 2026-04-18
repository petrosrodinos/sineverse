import NextLink from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { ArrowRight, Check, Clapperboard, Home, Video } from "lucide-react";
import { Routes } from "@/config/routes";
import { environments } from "@/config/environments";
import { sineversePlans } from "@/config/marketing/sineverse-plans";
import { LandingHashScroll } from "./components/LandingHashScroll";

const products = [
  {
    name: "Sineverse",
    tagline: "AI-native film studio",
    description: "Turn one idea into a full cinematic film. Structure scenes, generate footage with tuned prompts, assemble on a timeline built for AI output, and publish without a traditional edit suite.",
    href: Routes.landing.sineverse,
    cta: "Explore Sineverse",
    icon: Clapperboard,
    accent: "from-primary/20 via-primary/5 to-transparent",
    borderAccent: "border-primary/25",
  },
  {
    name: "EstateLift",
    tagline: "AI property video tours",
    description: "Turn listing and Airbnb photos into cinematic walkthrough videos in seconds. Smart scene flow, music, captions, vertical and horizontal exports—built for hosts, agents, and managers.",
    href: Routes.landing.estatelift,
    cta: "Explore EstateLift",
    icon: Video,
    accent: "from-primary/12 via-primary/[0.03] to-transparent",
    borderAccent: "border-divider/60 hover:border-primary/25",
  },
] as const;

export function LandingPage() {
  return (
    <LandingHashScroll pathnameMatch="/">
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-divider/40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--heroui-primary-500)/0.22),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_20%,hsl(var(--heroui-primary-600)/0.12),transparent_50%),radial-gradient(ellipse_40%_35%_at_0%_30%,hsl(var(--heroui-primary-400)/0.08),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">{environments.APP_NAME}</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">Cinematic AI for films and property</h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-default-500 md:text-xl">Pro-grade motion for stories and listings—without a traditional video editor. Sineverse takes an idea through scenes and publish; EstateLift turns photos into walkthroughs with music, captions, and social-ready formats in under a minute.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button as={NextLink} href={Routes.landing.sineverse} color="primary" size="lg" radius="full" className="min-w-[200px] font-semibold shadow-lg shadow-primary/25" endContent={<ArrowRight className="size-4" />}>
                Sineverse
              </Button>
              <Button as={NextLink} href={Routes.landing.estatelift} variant="bordered" size="lg" radius="full" className="min-w-[200px] font-medium border-default-300" endContent={<Home className="size-4" />}>
                EstateLift
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:mt-14 lg:grid-cols-2 lg:gap-6">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.name} className={`group overflow-hidden rounded-2xl border bg-content1/30 shadow-none backdrop-blur-sm transition-transform duration-200 hover:scale-[1.01] dark:bg-content1/20 ${product.borderAccent}`}>
                  <div aria-hidden className={`h-1.5 w-full bg-gradient-to-r ${product.accent} opacity-90`} />
                  <CardBody className="flex flex-col gap-4 p-6 md:p-7">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{product.name}</h2>
                      <p className="mt-1 text-sm font-medium text-primary">{product.tagline}</p>
                    </div>
                    <p className="text-base leading-relaxed text-default-500">{product.description}</p>
                  </CardBody>
                  <CardFooter className="flex flex-col gap-3 border-t border-divider/40 px-6 pb-6 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <Button as={NextLink} href={product.href} color="primary" variant="shadow" radius="full" className="w-full font-semibold sm:w-auto" endContent={<ArrowRight className="size-4" />}>
                      {product.cta}
                    </Button>
                    <Button as={NextLink} href={Routes.auth.sign_up} variant="light" radius="full" className="w-full font-medium sm:w-auto">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <section id="pricing" className="scroll-mt-24 mt-8 border-t border-divider/40 pt-10 md:mt-10 md:pt-12">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Pricing</h2>
              </div>
              <div className="mt-5 grid gap-4 md:mt-8 md:gap-5 lg:grid-cols-3">
                {sineversePlans.map((plan) => (
                  <Card key={plan.name} className={`border shadow-none backdrop-blur-sm ${plan.highlighted ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20 dark:bg-primary/10" : "border-divider/50 bg-content1/30 dark:bg-content1/20"}`}>
                    <CardBody className="gap-4 p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                        <p className="mt-2 text-sm text-default-500">{plan.description}</p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        {plan.price !== "Custom" && <span className="text-sm font-medium text-default-500">$</span>}
                        <span className="text-4xl font-semibold tracking-tight text-foreground">{plan.price}</span>
                        {plan.period ? <span className="text-sm text-default-500">{plan.period}</span> : null}
                      </div>
                      <ul className="flex flex-col gap-3">
                        {plan.features.map((line) => (
                          <li key={line} className="flex gap-3 text-sm text-default-600">
                            <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button as={NextLink} href={Routes.auth.sign_up} color={plan.highlighted ? "primary" : "default"} variant={plan.highlighted ? "shadow" : "bordered"} radius="full" className="w-full font-medium">
                        {plan.price === "Custom" ? "Contact sales" : "Get started"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="border-t border-divider/50 bg-content1/40 backdrop-blur-sm dark:bg-content1/20">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 md:pb-16 md:pt-16">
          <div className="mb-14 flex flex-col gap-8 rounded-2xl border border-divider/50 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:mb-16 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10 lg:p-12">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Get started</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Create your account and open the studio</h2>
              <p className="mt-3 text-base text-default-500 md:text-lg">Free to sign up. Use Sineverse for films, EstateLift for listings—same login, same dashboard.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:w-auto md:flex-col md:justify-start lg:flex-row">
              <Button as={NextLink} href={Routes.auth.sign_up} color="primary" size="lg" radius="full" className="min-w-[200px] font-semibold shadow-lg shadow-primary/25" endContent={<ArrowRight className="size-4" />}>
                Create free account
              </Button>
              <Button as={NextLink} href={Routes.auth.sign_in} variant="bordered" size="lg" radius="full" className="min-w-[200px] font-medium border-default-300">
                Log in
              </Button>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-1">
              <p className="text-lg font-semibold tracking-tight text-foreground">{environments.APP_NAME}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-default-500">Cinematic AI for films and property.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-default-500">Products</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <NextLink href={Routes.landing.sineverse} className="text-sm text-default-600 transition-colors hover:text-primary">
                    Sineverse
                  </NextLink>
                </li>
                <li>
                  <NextLink href={Routes.landing.estatelift} className="text-sm text-default-600 transition-colors hover:text-primary">
                    EstateLift
                  </NextLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-default-500">Explore</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <NextLink href="/#pricing" className="text-sm text-default-600 transition-colors hover:text-primary">
                    Pricing
                  </NextLink>
                </li>
                <li>
                  <NextLink href={`${Routes.landing.sineverse}#features`} className="text-sm text-default-600 transition-colors hover:text-primary">
                    Sineverse features
                  </NextLink>
                </li>
                <li>
                  <NextLink href={`${Routes.landing.estatelift}#features`} className="text-sm text-default-600 transition-colors hover:text-primary">
                    EstateLift features
                  </NextLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-default-500">Account</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <NextLink href={Routes.auth.sign_in} className="text-sm text-default-600 transition-colors hover:text-primary">
                    Log in
                  </NextLink>
                </li>
                <li>
                  <NextLink href={Routes.auth.sign_up} className="text-sm text-default-600 transition-colors hover:text-primary">
                    Register
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-divider/40 pt-8 text-sm text-default-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} {environments.APP_NAME}. All rights reserved.</span>
            <span className="sm:text-right">
              Powered by{" "}
              <NextLink href="https://logiqdev.com/" className="text-default-600 transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
                Logiqdev
              </NextLink>
            </span>
          </div>
        </div>
      </footer>
    </div>
    </LandingHashScroll>
  );
}
