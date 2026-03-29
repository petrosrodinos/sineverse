"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { GripVertical } from "lucide-react";

type VideoReorderListProps = {
  orderedIds: readonly string[];
  renderItem: (clipId: string, index: number) => ReactNode;
  onReorder: (fromIndex: number, toIndex: number) => void;
  canReorder: boolean;
};

export function VideoReorderList({
  orderedIds,
  renderItem,
  onReorder,
  canReorder,
}: VideoReorderListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (index: number) => (event: React.DragEvent) => {
      if (!canReorder) {
        event.preventDefault();
        return;
      }
      setDragIndex(index);
      event.dataTransfer.setData("text/plain", String(index));
      event.dataTransfer.effectAllowed = "move";
    },
    [canReorder],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (targetIndex: number) => (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData("text/plain");
      const from = Number.parseInt(raw, 10);
      if (Number.isNaN(from)) {
        setDragIndex(null);
        return;
      }
      onReorder(from, targetIndex);
      setDragIndex(null);
    },
    [onReorder],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
  }, []);

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
    >
      {orderedIds.map((id, index) => (
        <div
          key={id}
          role="listitem"
          draggable={canReorder}
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
          onDragEnd={handleDragEnd}
          className={`min-w-0 rounded-2xl transition-opacity duration-200 ${
            dragIndex === index ? "opacity-60" : "opacity-100"
          }`}
        >
          <div className="flex gap-1.5">
            {canReorder && (
              <div
                className="flex shrink-0 cursor-grab items-start pt-2 text-default-400 active:cursor-grabbing"
                aria-hidden
              >
                <GripVertical className="h-4 w-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">{renderItem(id, index)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
