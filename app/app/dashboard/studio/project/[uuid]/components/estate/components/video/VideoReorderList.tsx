"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export type VideoReorderListRenderContext = {
  dragIndex: number | null;
  setDragIndex: (index: number | null) => void;
  canReorder: boolean;
  onReorder: (fromIndex: number, toIndex: number) => void;
};

type VideoReorderListProps = {
  orderedIds: readonly string[];
  renderItem: (clipId: string, index: number, ctx: VideoReorderListRenderContext) => ReactNode;
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

  const ctx: VideoReorderListRenderContext = {
    dragIndex,
    setDragIndex,
    canReorder,
    onReorder,
  };

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="list"
    >
      {orderedIds.map((id, index) => (
        <div key={id} role="listitem" className="min-w-0">
          {renderItem(id, index, ctx)}
        </div>
      ))}
    </div>
  );
}
