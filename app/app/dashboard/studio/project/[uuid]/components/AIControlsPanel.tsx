"use client";

import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";

import { globalStyles, tones, cameraStyles, lightingOptions } from "@/config/studio";

interface AIControlsPanelProps {
  settings: any;
  onChange: (settings: Partial<any>) => void;
  onSave: () => void;
  hasScene: boolean;
}

export function AIControlsPanel({ settings, onChange, onSave, hasScene }: AIControlsPanelProps) {
  return (
    <div className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4 space-y-5">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">AI Controls</h3>
      <Select
        label="Global style"
        selectedKeys={[settings.globalStyle]}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          if (v) onChange({ globalStyle: v });
        }}
        variant="bordered"
        classNames={{ trigger: "rounded-xl" }}
      >
        {globalStyles.map((g) => (
          <SelectItem key={g.value}>{g.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Tone"
        selectedKeys={[settings.tone]}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          if (v) onChange({ tone: v });
        }}
        variant="bordered"
        classNames={{ trigger: "rounded-xl" }}
      >
        {tones.map((t) => (
          <SelectItem key={t.value}>{t.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Camera style"
        selectedKeys={[settings.cameraStyle]}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          if (v) onChange({ cameraStyle: v });
        }}
        variant="bordered"
        classNames={{ trigger: "rounded-xl" }}
      >
        {cameraStyles.map((c) => (
          <SelectItem key={c.value}>{c.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Lighting"
        selectedKeys={[settings.lighting]}
        onSelectionChange={(keys) => {
          const v = Array.from(keys)[0] as string;
          if (v) onChange({ lighting: v });
        }}
        variant="bordered"
        classNames={{ trigger: "rounded-xl" }}
      >
        {lightingOptions.map((l) => (
          <SelectItem key={l.value}>{l.label}</SelectItem>
        ))}
      </Select>
      <div className="space-y-2">
        <label className="text-sm text-foreground">Creativity / Temperature</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={settings.temperature}
          onChange={(e) => onChange({ temperature: Number(e.target.value) })}
          className="w-full h-2 rounded-full appearance-none bg-default-200 accent-primary dark:bg-default-100/30"
        />
      </div>
      {hasScene && (
        <Button color="primary" variant="flat" onPress={onSave} className="w-full rounded-xl">
          Save settings for scene
        </Button>
      )}
    </div>
  );
}
