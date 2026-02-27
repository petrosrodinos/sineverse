"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Link } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useSignin } from "@/app/features/auth/hooks/use-auth";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { mutate: signIn, isPending } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: SignInValues) => {
    signIn(data);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small border border-default-200/50">
      <div className="flex flex-col gap-1 items-center mb-4">
        <h1 className="text-2xl font-bold">
          Welcome Back
        </h1>
        <p className="text-small text-default-500">Sign in to your account</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message as string}
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
          startContent={<Mail className="text-default-400" size={20} />}
          classNames={{
            inputWrapper: "border-default-200 hover:border-primary transition-colors",
          }}
        />

        <Input
          {...register("password")}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message as string}
          isRequired
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          startContent={<Lock className="text-default-400" size={20} />}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" size={20} />
              ) : (
                <Eye className="text-2xl text-default-400 pointer-events-none" size={20} />
              )}
            </button>
          }
          classNames={{
            inputWrapper: "border-default-200 hover:border-primary transition-colors",
          }}
        />

        <div className="flex w-full items-center justify-between px-1 py-2">
          <span />
          <Link className="text-default-500 text-small" href="#" size="sm">
            Forgot password?
          </Link>
        </div>

        <Button
          className="mt-2 font-medium w-full"
          color="primary"
          isLoading={isPending}
          type="submit"
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-small text-default-500 mt-4">
        Need to create an account?&nbsp;
        <Link color="primary" href="/auth/sign-up" size="sm">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
