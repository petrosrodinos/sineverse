import { ReactNode } from "react";
import { Image } from "@heroui/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background/50 relative overflow-hidden">
            <div className="flex w-full max-w-md flex-col gap-6 px-4 z-10 relative">
                {children}
            </div>
        </div>
    );
}
