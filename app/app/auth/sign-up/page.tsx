import React from "react";
import { SignUpForm } from "./components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
