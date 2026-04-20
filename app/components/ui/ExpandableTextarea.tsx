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
          aria-label="Expand text"
          className="bg-default-100/80 backdrop-blur-sm border border-default-200 hover:bg-default-200/80"
          size="sm"
          variant="flat"
          onPress={onOpen}
        >
          <Maximize2 className="size-3.5 text-default-600" />
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        size="4xl"
        title={props.label || "Text Editor"}
        onOpenChange={onOpenChange}
      >
        <div className="w-full">
          <Textarea
            {...props}
            classNames={{
              input: "text-lg leading-relaxed px-2 py-1",
              inputWrapper: "bg-transparent border-none shadow-none",
            }}
            label=""
            maxRows={25}
            minRows={12}
            variant="flat"
          />
        </div>
      </Modal>
    </div>
  );
}
