"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Coins, Sparkles } from "lucide-react";

import { Routes } from "@/config/routes";
import { useApiErrorModalStore } from "@/stores/api-error-modal.store";
import { CreditPacks } from "@/components/ui/CreditPacks";
import { buildInsufficientCreditsMessage } from "@/lib/insufficient-credits-message.utils";

export function InsufficientCreditsModal() {
  const router = useRouter();

  const open = useApiErrorModalStore((s) => s.insufficientCreditsOpen);

  const detail = useApiErrorModalStore((s) => s.insufficientCreditsDetail);

  const close = useApiErrorModalStore((s) => s.closeInsufficientCredits);

  const message = useMemo(
    () => (detail ? buildInsufficientCreditsMessage(detail) : ""),
    [detail],
  );

  const goBuyCredits = useCallback(() => {
    close();

    router.push(Routes.billing);
  }, [close, router]);

  return (
    <Modal
      backdrop="blur"
      classNames={{ backdrop: "bg-black/50 backdrop-blur-sm" }}
      isOpen={open}
      placement="center"
      onOpenChange={(next) => {
        if (!next) {
          close();
        }
      }}
    >
      <ModalContent className="max-w-3xl border border-default-200 shadow-2xl">
        <ModalHeader className="flex flex-col gap-3 border-b border-default-200/80 bg-gradient-to-br from-primary/15 via-default-100 to-secondary/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-inner">
              <Sparkles className="size-6" strokeWidth={2} />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-default-500">
                Credits
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Not enough credits
              </h2>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="max-h-[min(70vh,560px)] gap-4 overflow-y-auto px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl border border-default-200 bg-default-100/60 px-4 py-3">
            <Coins
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-primary"
            />
            <p className="text-sm leading-relaxed text-default-600">
              {message}
            </p>
          </div>
          <p className="text-sm text-default-500">
            Add credits to continue generating assets in your projects.
          </p>
          <div className="border-t border-default-200/80 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-default-500">
              Credit packs
            </p>
            <CreditPacks className="mt-3" variant="compact" />
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-default-200/80 px-6 py-4">
          <Button className="font-medium" variant="flat" onPress={close}>
            Close
          </Button>
          <Button
            className="font-semibold"
            color="primary"
            onPress={goBuyCredits}
          >
            Buy credits
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
