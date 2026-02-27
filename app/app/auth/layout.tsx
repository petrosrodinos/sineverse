import { ReactNode } from "react";
import { Image } from "@heroui/react";
import { Navbar } from "@/components/layout/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden bg-background/50">
            <Navbar />
            <div className="flex flex-1 items-center justify-center w-full">
                <div className="flex w-full max-w-md flex-col gap-6 px-4 z-10 relative">
                    {children}
                </div>
            </div>
        </div>
    );
}
