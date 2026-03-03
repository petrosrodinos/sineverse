"use client";

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Maximize2 } from "lucide-react";
import { useDisclosure } from "@heroui/modal";
import { Modal } from "./modal";

export function ExpandableTextarea(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="group relative w-full">
      <Textarea
        {...props}
        classNames={{
          ...props.classNames,
          input: `pr-10 ${props.classNames?.input || ""}`,
        }}
      />
      <div className="absolute top-1.5 right-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          className="bg-default-100/80 backdrop-blur-sm border border-default-200 hover:bg-default-200/80"
          onPress={onOpen}
          aria-label="Expand text"
        >
          <Maximize2 className="size-3.5 text-default-600" />
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={props.label || "Text Editor"}
        size="4xl"
      >
        <div className="w-full">
          <Textarea
            {...props}
            label=""
            minRows={12}
            maxRows={25}
            variant="flat"
            autoFocus
            classNames={{
              input: "text-lg leading-relaxed px-2 py-1",
              inputWrapper: "bg-transparent border-none shadow-none",
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
