import type { InsufficientCreditsMessageInput } from "@/lib/insufficient-credits-message.utils";

import { create } from "zustand";

interface ApiErrorModalState {
  insufficientCreditsOpen: boolean;
  insufficientCreditsDetail: InsufficientCreditsMessageInput | null;
  openInsufficientCredits: (detail: InsufficientCreditsMessageInput) => void;
  closeInsufficientCredits: () => void;
}

export const useApiErrorModalStore = create<ApiErrorModalState>((set) => ({
  insufficientCreditsOpen: false,
  insufficientCreditsDetail: null,
  openInsufficientCredits: (detail) =>
    set({
      insufficientCreditsOpen: true,
      insufficientCreditsDetail: detail,
    }),
  closeInsufficientCredits: () =>
    set({
      insufficientCreditsOpen: false,
      insufficientCreditsDetail: null,
    }),
}));
