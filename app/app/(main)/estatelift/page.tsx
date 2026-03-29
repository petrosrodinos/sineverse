import { EstateLiftLandingPage } from "@/app/(main)/estatelift/components/EstateLiftLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EstateLift — AI property video tours",
  description: "Turn Airbnb and real estate photos into cinematic AI walkthrough videos in seconds. More bookings, faster sales.",
};

export default function EstateLiftPage() {
  return <EstateLiftLandingPage />;
}
