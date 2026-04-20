"use client";

import { useCallback } from "react";

export type VideoReorderItemArgs = {
  index: number;
  canReorder: boolean;
  onReorder: (fromIndex: number, toIndex: number) => void;
  setDragIndex: (index: number | null) => void;
};

export function useVideoReorderItem({
  index,
  canReorder,
  onReorder,
  setDragIndex,
}: VideoReorderItemArgs) {
  const handleDragStart = useCallback(
    (event: React.DragEvent) => {
      if (!canReorder) {
        event.preventDefault();

        return;
      }

      setDragIndex(index);

      event.dataTransfer.setData("text/plain", String(index));

      event.dataTransfer.effectAllowed = "move";
    },
    [canReorder, index, setDragIndex],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const raw = event.dataTransfer.getData("text/plain");

      const from = Number.parseInt(raw, 10);

      if (Number.isNaN(from)) {
        setDragIndex(null);

        return;
      }

      onReorder(from, index);

      setDragIndex(null);
    },
    [index, onReorder, setDragIndex],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
  }, [setDragIndex]);

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggable: canReorder,
  };
}
