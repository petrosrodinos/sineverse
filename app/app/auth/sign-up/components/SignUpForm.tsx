"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Link } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useSignup } from "@/app/features/auth/hooks/use-auth";

const signUpSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { mutate: signUp, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onSubmit = (data: SignUpValues) => {
    signUp({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small border border-default-200/50">
      <div className="flex flex-col gap-1 items-center mb-4">
        <h1 className="text-2xl font-bold">
          Create an Account
        </h1>
        <p className="text-small text-default-500">Sign up to get started</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("full_name")}
          isInvalid={!!errors.full_name}
          errorMessage={errors.full_name?.message as string}
          isRequired
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          variant="bordered"
          startContent={<User className="text-default-400" size={20} />}
          classNames={{
            inputWrapper: "border-default-200 hover:border-secondary transition-colors",
          }}
        />

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
            inputWrapper: "border-default-200 hover:border-secondary transition-colors",
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
            inputWrapper: "border-default-200 hover:border-secondary transition-colors",
          }}
        />

        <Input
          {...register("confirmPassword")}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message as string}
          isRequired
          label="Confirm Password"
          placeholder="Confirm your password"
          type={isConfirmVisible ? "text" : "password"}
          variant="bordered"
          startContent={<Lock className="text-default-400" size={20} />}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfirmVisibility}
            >
              {isConfirmVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" size={20} />
              ) : (
                <Eye className="text-2xl text-default-400 pointer-events-none" size={20} />
              )}
            </button>
          }
          classNames={{
            inputWrapper: "border-default-200 hover:border-secondary transition-colors",
          }}
        />

        <Button
          className="mt-6 font-medium w-full"
          color="primary"
          isLoading={isPending}
          type="submit"
        >
          Sign Up
        </Button>
      </form>

      <p className="text-center text-small text-default-500 mt-4">
        Already have an account?&nbsp;
        <Link color="primary" href="/auth/sign-in" size="sm">
          Sign In
        </Link>
      </p>
    </div>
  );
};
