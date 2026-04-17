"use client";

import { EstateStepper } from "./components/EstateStepper";

export function EstateProjectPage() {
  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-auto p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Estate video workflow
          </h2>
          <p className="text-small text-default-500 md:text-base">
            Upload photos, refine clips, and render a polished property tour — all in one flow.
          </p>
        </div>
        <EstateStepper />
      </div>
    </div>
  );
}
