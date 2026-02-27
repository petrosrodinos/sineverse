import React from "react";
import { SignInForm } from "./components/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return <SignInForm />;
}
