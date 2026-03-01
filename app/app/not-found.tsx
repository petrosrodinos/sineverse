import { Button } from "@heroui/button";
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        <div className="bg-default-100 p-4 rounded-full dark:bg-default-100/20">
          <FileQuestion className="w-16 h-16 text-default-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
          <p className="text-default-500 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
          </p>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4 pt-4 justify-center">
          <Button
            as={Link}
            href="/"
            size="lg"
            color="primary"
            variant="shadow"
            startContent={<Home className="w-5 h-5" />}
            className="w-full sm:w-auto font-medium"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
