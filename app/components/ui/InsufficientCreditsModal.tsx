"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Coins, Sparkles } from "lucide-react";
import { Routes } from "@/config/routes";
import { useApiErrorModalStore } from "@/stores/api-error-modal.store";

export type InsufficientCreditsMessageInput = {
  required_credits: number;
  balance: number;
  items_count?: number;
  credits_per_item?: number;
};

export function buildInsufficientCreditsMessage(input: InsufficientCreditsMessageInput): string {
  const { required_credits, balance, items_count, credits_per_item } = input;
  const req = required_credits.toLocaleString();
  const bal = balance.toLocaleString();
  if (items_count !== undefined && credits_per_item !== undefined && items_count > 0) {
    const per = credits_per_item.toLocaleString();
    const noun = items_count === 1 ? "generation" : "generations";
    return `You need ${req} credits to start ${items_count} ${noun} (${per} credits each). Your balance is ${bal}.`;
  }
  return `You need ${req} credits. Your balance is ${bal}.`;
}

export function InsufficientCreditsModal() {
  const router = useRouter();
  const open = useApiErrorModalStore((s) => s.insufficientCreditsOpen);
  const detail = useApiErrorModalStore((s) => s.insufficientCreditsDetail);
  const close = useApiErrorModalStore((s) => s.closeInsufficientCredits);

  const message = useMemo(() => (detail ? buildInsufficientCreditsMessage(detail) : ""), [detail]);

  const goBuyCredits = useCallback(() => {
    close();
    router.push(Routes.billing);
  }, [close, router]);

  return (
    <Modal
      isOpen={open}
      onOpenChange={(next) => {
        if (!next) {
          close();
        }
      }}
      placement="center"
      backdrop="blur"
      classNames={{ backdrop: "bg-black/50 backdrop-blur-sm" }}
    >
      <ModalContent className="border border-default-200 shadow-2xl">
        <ModalHeader className="flex flex-col gap-3 border-b border-default-200/80 bg-gradient-to-br from-primary/15 via-default-100 to-secondary/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-inner">
              <Sparkles className="size-6" strokeWidth={2} />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-default-500">Credits</p>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Not enough credits</h2>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="gap-4 px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl border border-default-200 bg-default-100/60 px-4 py-3">
            <Coins className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm leading-relaxed text-default-600">{message}</p>
          </div>
          <p className="text-sm text-default-500">Add credits to continue generating assets in your projects.</p>
        </ModalBody>
        <ModalFooter className="border-t border-default-200/80 px-6 py-4">
          <Button variant="flat" onPress={close} className="font-medium">
            Close
          </Button>
          <Button color="primary" className="font-semibold" onPress={goBuyCredits}>
            Buy credits
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
