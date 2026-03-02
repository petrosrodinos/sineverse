"use client";

import { Modal as HeroModal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { ReactNode } from "react";

interface ReusableModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  scrollBehavior?: "inside" | "outside" | "normal";
}

export function Modal({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
  size = "md",
  scrollBehavior = "inside",
}: ReusableModalProps) {
  return (
    <HeroModal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      size={size} 
      placement="center"
      scrollBehavior={scrollBehavior}
      classNames={{
        base: "bg-background border border-default-200 dark:border-default-100/20",
        header: "border-b border-default-200 dark:border-default-100/10",
        footer: "border-t border-default-200 dark:border-default-100/10",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody className="py-6">
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </HeroModal>  
  );
}
