"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        <div className="bg-danger/10 p-4 rounded-full">
          <AlertCircle className="w-16 h-16 text-danger" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-default-500 text-lg">
            We apologize for the inconvenience. An unexpected error has occurred
            while processing your request.
          </p>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4 pt-4 justify-center">
          <Button
            className="w-full sm:w-auto font-medium"
            color="primary"
            size="lg"
            startContent={<RefreshCcw className="w-5 h-5" />}
            variant="shadow"
            onPress={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Button
            className="w-full sm:w-auto font-medium"
            size="lg"
            startContent={<Home className="w-5 h-5" />}
            variant="flat"
            onPress={() => router.push("/")}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
