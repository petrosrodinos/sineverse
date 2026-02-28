"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Accordion, AccordionItem } from "@heroui/accordion";
import type { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";

import {
  StylesOptions,
  CameraMovementOptions,
  LensTypeOptions,
  DepthOfFieldOptions,
  TimeOfDayOptions,
  CameraStyleOptions,
  ShotTypeOptions,
  LightingOptions,
  ColorGradeOptions,
  AudioStyleOptions,
  MotionStrengthSliderOptions,
  GuidanceScaleSliderOptions,
  CreativitySliderOptions,
  DurationSliderOptions,
  FpsSliderOptions,
} from "@/config/dropdowns/project/scene-variations.options";

interface VariationSettingsAdvancedProps {
  settings: Partial<SceneVariation>;
  onChange: (updates: Partial<SceneVariation>) => void;
}

export function VariationSettingsAdvanced({ settings, onChange }: VariationSettingsAdvancedProps) {
  const handleDropdownChange = (field: keyof SceneVariation, value: any) => {
    onChange({ [field]: value });
  };

  const handleSliderChange = (field: keyof SceneVariation, value: number | number[]) => {
    onChange({ [field]: Array.isArray(value) ? value[0] : value });
  };

  return (
    <div className="space-y-6">
      <Accordion variant="bordered" className="px-0">
        <AccordionItem key="visuals" aria-label="Visual Style & Lighting" title="Visual Style & Lighting" classNames={{ title: "text-sm font-semibold" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <Select
              label="Style"
              selectedKeys={settings.style ? [settings.style] : []}
              onSelectionChange={(keys) => handleDropdownChange("style", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {StylesOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Lighting"
              selectedKeys={settings.lighting ? [settings.lighting] : []}
              onSelectionChange={(keys) => handleDropdownChange("lighting", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {LightingOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Color Grade"
              selectedKeys={settings.color_grade ? [settings.color_grade] : []}
              onSelectionChange={(keys) => handleDropdownChange("color_grade", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {ColorGradeOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Time of Day"
              selectedKeys={settings.time_of_day ? [settings.time_of_day] : []}
              onSelectionChange={(keys) => handleDropdownChange("time_of_day", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {TimeOfDayOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>
          </div>
        </AccordionItem>
        
        <AccordionItem key="camera" aria-label="Camera & Lens" title="Camera & Lens" classNames={{ title: "text-sm font-semibold" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <Select
              label="Camera Style"
              selectedKeys={settings.camera ? [settings.camera] : []}
              onSelectionChange={(keys) => handleDropdownChange("camera", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {CameraStyleOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Shot Type"
              selectedKeys={settings.shot_type ? [settings.shot_type] : []}
              onSelectionChange={(keys) => handleDropdownChange("shot_type", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {ShotTypeOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Camera Movement"
              selectedKeys={settings.camera_movement ? [settings.camera_movement] : []}
              onSelectionChange={(keys) => handleDropdownChange("camera_movement", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {CameraMovementOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Lens Type"
              selectedKeys={settings.lens_type ? [settings.lens_type] : []}
              onSelectionChange={(keys) => handleDropdownChange("lens_type", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {LensTypeOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="Depth of Field"
              selectedKeys={settings.depth_of_field ? [settings.depth_of_field] : []}
              onSelectionChange={(keys) => handleDropdownChange("depth_of_field", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {DepthOfFieldOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>
          </div>
        </AccordionItem>
        
        <AccordionItem key="audio" aria-label="Audio & Sound" title="Audio & Sound" classNames={{ title: "text-sm font-semibold" }}>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <Select
              label="Audio Style"
              selectedKeys={settings.audio_style ? [settings.audio_style] : []}
              onSelectionChange={(keys) => handleDropdownChange("audio_style", Array.from(keys)[0])}
              variant="bordered"
              classNames={{ trigger: "rounded-xl" }}
            >
              {AudioStyleOptions.map((opt) => (
                <SelectItem key={opt.value}>{opt.label}</SelectItem>
              ))}
            </Select>
           </div>
        </AccordionItem>

        <AccordionItem key="advanced" aria-label="Generation Tuning" title="Generation Tuning" classNames={{ title: "text-sm font-semibold" }}>
          <div className="space-y-8 px-2 pb-6 pt-2">
            <Slider
              label="Motion Strength"
              step={MotionStrengthSliderOptions.step}
              maxValue={MotionStrengthSliderOptions.max}
              minValue={MotionStrengthSliderOptions.min}
              // marks={MotionStrengthSliderOptions.marks}
              defaultValue={MotionStrengthSliderOptions.defaultValue}
              value={settings.motion_strength ?? MotionStrengthSliderOptions.defaultValue}
              onChange={(v) => handleSliderChange("motion_strength", v)}
              className="max-w-md"
              size="sm"
            />

            <Slider
              label="Guidance Scale"
              step={GuidanceScaleSliderOptions.step}
              maxValue={GuidanceScaleSliderOptions.max}
              minValue={GuidanceScaleSliderOptions.min}
              // marks={GuidanceScaleSliderOptions.marks}
              defaultValue={GuidanceScaleSliderOptions.defaultValue}
              value={settings.guidance_scale ?? GuidanceScaleSliderOptions.defaultValue}
              onChange={(v) => handleSliderChange("guidance_scale", v)}
              className="max-w-md"
              size="sm"
            />

            <Slider
              label="Creativity"
              step={CreativitySliderOptions.step}
              maxValue={CreativitySliderOptions.max}
              minValue={CreativitySliderOptions.min}
              // marks={CreativitySliderOptions.marks}
              defaultValue={CreativitySliderOptions.defaultValue}
              value={settings.creativity ?? CreativitySliderOptions.defaultValue}
              onChange={(v) => handleSliderChange("creativity", v)}
              className="max-w-md"
              size="sm"
            />
            
            <Slider
              label="Duration (sec)"
              step={DurationSliderOptions.step}
              maxValue={DurationSliderOptions.max}
              minValue={DurationSliderOptions.min}
              // marks={DurationSliderOptions.marks}
              defaultValue={DurationSliderOptions.defaultValue}
              value={settings.duration_sec ?? DurationSliderOptions.defaultValue}
              onChange={(v) => handleSliderChange("duration_sec", v)}
              className="max-w-md"
              size="sm"
            />

            <Slider
              label="FPS"
              step={FpsSliderOptions.step}
              maxValue={FpsSliderOptions.max}
              minValue={FpsSliderOptions.min}
              // marks={FpsSliderOptions.marks}
              defaultValue={FpsSliderOptions.defaultValue}
              value={settings.fps ?? FpsSliderOptions.defaultValue}
              onChange={(v) => handleSliderChange("fps", v)}
              className="max-w-md"
              size="sm"
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
