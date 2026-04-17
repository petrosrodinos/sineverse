"use client";

import { Slider } from "@heroui/slider";
import { ESTATE_TRIM_SEC_MAX } from "../../../../../../../../../config/dropdowns/project/estate-workflow.constants";

type TrimRangeFieldProps = {
  start: number;
  end: number;
  maxSec?: number;
  onChange: (start: number, end: number) => void;
  isDisabled?: boolean;
};

export function TrimRangeField({ start, end, maxSec = ESTATE_TRIM_SEC_MAX, onChange, isDisabled }: TrimRangeFieldProps) {
  const handleChange = (raw: number | number[]) => {
    if (Array.isArray(raw) && raw.length >= 2) {
      const a = raw[0];
      const b = raw[1];
      if (typeof a === "number" && typeof b === "number") {
        const lo = Math.min(a, b);
        const hi = Math.max(a, b);
        if (hi - lo < 0.1) {
          return;
        }
        onChange(lo, hi);
      }
    }
  };

  return (
    <Slider
      aria-label="Trim range in seconds"
      label="Trim (seconds)"
      size="sm"
      minValue={0}
      maxValue={maxSec}
      step={0.1}
      value={[start, end]}
      onChange={handleChange}
      isDisabled={isDisabled}
      getValue={(v) => {
        if (Array.isArray(v)) {
          return `${v[0]?.toFixed(1)}s – ${v[1]?.toFixed(1)}s`;
        }
        return String(v);
      }}
    />
  );
}
