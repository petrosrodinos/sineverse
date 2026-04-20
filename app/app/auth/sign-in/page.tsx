import React from "react";
import { Metadata } from "next";

import { SignInForm } from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return <SignInForm />;
}
