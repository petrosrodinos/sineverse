import { SineversePage } from "./index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sineverse — AI film studio",
  description:
    "AI-native film studio: from idea to scenes, timeline assembly, and publish—without a traditional video editor.",
};

export default function SineverseLandingRoute() {
  return <SineversePage />;
}
