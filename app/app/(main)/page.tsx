import type { Metadata } from "next";
import { LandingPage } from "./landing";

export const metadata: Metadata = {
  title: "Sineverse — AI for film and property",
  description: "Sineverse film studio and EstateLift property tours—cinematic AI for creators, hosts, and real estate teams.",
};

export default function Home() {
  return <LandingPage />;
}
