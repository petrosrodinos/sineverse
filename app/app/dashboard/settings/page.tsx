"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUserProfile, useUpdateCurrentUserPassword, useUpdateCurrentUserProfile } from "@/features/users/hooks/use-users";

type ProfileFormValues = {
  full_name: string;
};

type PasswordFormValues = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export default function SettingsPage() {
  const { data: user, isLoading } = useCurrentUserProfile();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateCurrentUserProfile();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdateCurrentUserPassword();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    defaultValues: { full_name: "" },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    if (user?.full_name) {
      resetProfile({ full_name: user.full_name });
    }
  }, [user?.full_name, resetProfile]);

  const onSubmitProfile = (values: ProfileFormValues) => {
    updateProfile({ full_name: values.full_name });
  };

  const onSubmitPassword = (values: PasswordFormValues) => {
    if (values.new_password !== values.confirm_password) {
      return;
    }
    updatePassword(
      {
        current_password: values.current_password,
        new_password: values.new_password,
      },
      {
        onSuccess: () => {
          resetPassword();
        },
      },
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-default-500">Update your username and password.</p>
      </div>

      <Card className="border border-default-200 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Account</h2>
        </CardHeader>
        <CardBody className="gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </>
          ) : user ? (
            <>
              <div className="rounded-lg border border-default-200 bg-default-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-default-500">Email</p>
                <p className="mt-1 text-sm font-medium text-foreground">{user.email}</p>
              </div>
              <form className="flex flex-col gap-3" onSubmit={handleSubmitProfile(onSubmitProfile)}>
                <Input
                  {...registerProfile("full_name", { required: "Username is required" })}
                  label="Username"
                  placeholder="Your username"
                  variant="bordered"
                  isInvalid={!!profileErrors.full_name}
                  errorMessage={profileErrors.full_name?.message}
                />
                <div className="flex justify-end">
                  <Button type="submit" color="primary" isLoading={isUpdatingProfile}>
                    Save Username
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-sm text-default-500">Could not load account.</p>
          )}
        </CardBody>
      </Card>

      <Card className="border border-default-200 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Change Password</h2>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-3" onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <Input
              {...registerPassword("current_password", { required: "Current password is required" })}
              label="Current password"
              placeholder="Enter current password"
              type="password"
              variant="bordered"
              isInvalid={!!passwordErrors.current_password}
              errorMessage={passwordErrors.current_password?.message}
            />
            <Input
              {...registerPassword("new_password", {
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              label="New password"
              placeholder="Enter new password"
              type="password"
              variant="bordered"
              isInvalid={!!passwordErrors.new_password}
              errorMessage={passwordErrors.new_password?.message}
            />
            <Input
              {...registerPassword("confirm_password", {
                required: "Please confirm your new password",
                validate: (value) => value === watch("new_password") || "Passwords do not match",
              })}
              label="Confirm new password"
              placeholder="Confirm new password"
              type="password"
              variant="bordered"
              isInvalid={!!passwordErrors.confirm_password}
              errorMessage={passwordErrors.confirm_password?.message}
            />
            <div className="flex justify-end">
              <Button type="submit" color="primary" isLoading={isUpdatingPassword}>
                Update Password
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
