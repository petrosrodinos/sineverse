"use client";

import { Select, SelectItem } from "@heroui/select";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/autocomplete";
import { Slider } from "@heroui/slider";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Info } from "lucide-react";
import { useMemo } from "react";

import { VideoGenerationConfig } from "@/features/project-assets/interfaces/project-assets-metadata.interfaces";
import {
  StylesOptions,
  CameraMovementOptions,
  LensTypeOptions,
  DepthOfFieldOptions,
  TimeOfDayOptions,
  CameraStyleOptions,
  ShotTypeOptions,
  AspectRatioOptions,
  ResolutionOptions,
  LightingOptions,
  ColorGradeOptions,
  MotionStrengthSliderOptions,
  GuidanceScaleSliderOptions,
  CreativitySliderOptions,
  DurationSliderOptions,
  FpsSliderOptions,
} from "@/config/dropdowns/project/scene-variations.options";
import { VideoModels } from "@/config/dropdowns/project/video.options";

interface VideoGenerationOptionsProps {
  config?: Partial<VideoGenerationConfig>;
  onChange?: (field: string, value: any) => void;
}

const LabelWithTooltip = ({
  label,
  tooltip,
}: {
  label: string;
  tooltip: string;
}) => (
  <div className="flex items-center gap-1.5">
    <span>{label}</span>
    <Tooltip
      className="max-w-[250px]"
      closeDelay={0}
      content={tooltip}
      delay={0}
      placement="top"
    >
      <span className="pointer-events-auto flex items-center">
        <Info className="w-3.5 h-3.5 text-default-400 cursor-help" />
      </span>
    </Tooltip>
  </div>
);

const formatPrice = (price: {
  perSecond?: number;
  perGeneration?: number;
  perMillionTokens?: number;
}) => {
  if (price.perSecond !== undefined) return `$${price.perSecond}/s`;

  if (price.perGeneration !== undefined) return `$${price.perGeneration}/gen`;

  if (price.perMillionTokens !== undefined)
    return `$${price.perMillionTokens}/1M tokens`;

  return "";
};

export function VideoGenerationOptions({
  config,
  onChange,
}: VideoGenerationOptionsProps) {
  const groupedModels = useMemo(() => {
    const groups: Record<string, typeof VideoModels> = {};

    VideoModels.forEach((model) => {
      const provider = model.provider || "Other";

      if (!groups[provider]) groups[provider] = [];

      groups[provider].push(model);
    });

    return groups;
  }, []);

  const handleValueChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="flex flex-col gap-6">
        {/* Format & Model */}
        <div className="flex flex-col gap-6">
          <h4 className="text-medium font-semibold text-foreground">
            Model & Format
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <Autocomplete
              className="max-w-full w-full"
              defaultSelectedKey={config?.ai_model}
              label={
                <LabelWithTooltip
                  label="AI Model"
                  tooltip="Select the underlying AI model used for video generation."
                />
              }
              labelPlacement="outside"
              placeholder="Select a model"
              scrollShadowProps={{
                isEnabled: false,
              }}
              variant="bordered"
              onSelectionChange={(key) => handleValueChange("ai_model", key)}
            >
              {Object.entries(groupedModels).map(([provider, models]) => (
                <AutocompleteSection
                  key={provider}
                  showDivider
                  title={provider}
                >
                  {models.map((model) => (
                    <AutocompleteItem
                      key={model.name}
                      classNames={{
                        base: "py-2",
                        title: "text-small font-medium",
                        description: "text-tiny text-default-400",
                      }}
                      description={formatPrice(model.price)}
                      textValue={model.label}
                    >
                      {model.label}
                    </AutocompleteItem>
                  ))}
                </AutocompleteSection>
              ))}
            </Autocomplete>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.aspect_ratio ? [config.aspect_ratio] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Aspect Ratio"
                  tooltip="The framing format for the final video."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) =>
                handleValueChange("aspect_ratio", e.target.value)
              }
            >
              {AspectRatioOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.resolution ? [config.resolution] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Resolution"
                  tooltip="The output quality and pixel dimensions."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("resolution", e.target.value)}
            >
              {ResolutionOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Input
              className="max-w-full w-full"
              label={
                <LabelWithTooltip
                  label="Seed"
                  tooltip="Set a specific seed for reproducible results. Leave empty for random results."
                />
              }
              labelPlacement="outside"
              placeholder="Random"
              type="number"
              value={config?.seed?.toString() || ""}
              variant="bordered"
              onChange={(e) => handleValueChange("seed", e.target.value)}
            />
          </div>
        </div>

        <Divider />

        {/* Cinematography */}
        <div className="flex flex-col gap-6">
          <h4 className="text-medium font-semibold text-foreground">
            Cinematography
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.camera_movement ? [config.camera_movement] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Camera Movement"
                  tooltip="How the camera_style physically moves through the scene."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) =>
                handleValueChange("camera_movement", e.target.value)
              }
            >
              {CameraMovementOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.lens_type ? [config.lens_type] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Lens Type"
                  tooltip="The physical characteristics of the simulated camera_style lens."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("lens_type", e.target.value)}
            >
              {LensTypeOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.camera_style ? [config.camera_style] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Camera Style"
                  tooltip="The mounting or handling style of the camera_style."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) =>
                handleValueChange("camera_style", e.target.value)
              }
            >
              {CameraStyleOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.shot_type ? [config.shot_type] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Shot Type"
                  tooltip="The scale and framing of the subject."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("shot_type", e.target.value)}
            >
              {ShotTypeOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.depth_of_field ? [config.depth_of_field] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Depth of Field"
                  tooltip="The range of distance that appears acceptably sharp."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) =>
                handleValueChange("depth_of_field", e.target.value)
              }
            >
              {DepthOfFieldOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <Divider />

        {/* Lighting & Style */}
        <div className="flex flex-col gap-6">
          <h4 className="text-medium font-semibold text-foreground">
            Lighting & Style
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={config?.style ? [config.style] : undefined}
              label={
                <LabelWithTooltip
                  label="Style"
                  tooltip="The core artistic or visual style of the generation."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("style", e.target.value)}
            >
              {StylesOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.lighting ? [config.lighting] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Lighting"
                  tooltip="The artificial or natural lighting setup."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("lighting", e.target.value)}
            >
              {LightingOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.color_grade ? [config.color_grade] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Color Grade"
                  tooltip="The post-processing color treatment."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("color_grade", e.target.value)}
            >
              {ColorGradeOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-full w-full"
              defaultSelectedKeys={
                config?.time_of_day ? [config.time_of_day] : undefined
              }
              label={
                <LabelWithTooltip
                  label="Time of Day"
                  tooltip="The simulated time of day affecting natural light."
                />
              }
              labelPlacement="outside"
              variant="bordered"
              onChange={(e) => handleValueChange("time_of_day", e.target.value)}
            >
              {TimeOfDayOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <Divider />

        {/* Generation Parameters */}
        <div className="flex flex-col gap-4">
          <h4 className="text-medium font-semibold text-foreground">
            Generation Parameters
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-2 px-2 pb-6">
            <Slider
              className="max-w-full w-full"
              defaultValue={
                config?.motion_strength ??
                (typeof MotionStrengthSliderOptions.defaultValue === "number"
                  ? MotionStrengthSliderOptions.defaultValue
                  : 0.5)
              }
              label={
                <LabelWithTooltip
                  label="Motion Strength"
                  tooltip="How much movement occurs in the generated video."
                />
              }
              marks={MotionStrengthSliderOptions.marks}
              maxValue={MotionStrengthSliderOptions.max}
              minValue={MotionStrengthSliderOptions.min}
              step={MotionStrengthSliderOptions.step}
              onChangeEnd={(val) => handleValueChange("motion_strength", val)}
            />

            <Slider
              className="max-w-full w-full"
              defaultValue={
                config?.guidance_scale ??
                (typeof GuidanceScaleSliderOptions.defaultValue === "number"
                  ? GuidanceScaleSliderOptions.defaultValue
                  : 7.5)
              }
              label={
                <LabelWithTooltip
                  label="Guidance Scale"
                  tooltip="How strictly the AI follows your prompt vs its own creativity."
                />
              }
              marks={GuidanceScaleSliderOptions.marks}
              maxValue={GuidanceScaleSliderOptions.max}
              minValue={GuidanceScaleSliderOptions.min}
              step={GuidanceScaleSliderOptions.step}
              onChangeEnd={(val) => handleValueChange("guidance_scale", val)}
            />

            <Slider
              className="max-w-full w-full"
              defaultValue={
                config?.creativity ??
                (typeof CreativitySliderOptions.defaultValue === "number"
                  ? CreativitySliderOptions.defaultValue
                  : 0.5)
              }
              label={
                <LabelWithTooltip
                  label="Creativity"
                  tooltip="The amount of variation and alternative ideas the AI applies."
                />
              }
              marks={CreativitySliderOptions.marks}
              maxValue={CreativitySliderOptions.max}
              minValue={CreativitySliderOptions.min}
              step={CreativitySliderOptions.step}
              onChangeEnd={(val) => handleValueChange("creativity", val)}
            />

            <Slider
              className="max-w-full w-full"
              defaultValue={
                config?.duration_sec ??
                (typeof DurationSliderOptions.defaultValue === "number"
                  ? DurationSliderOptions.defaultValue
                  : 5)
              }
              label={
                <LabelWithTooltip
                  label="Duration (Seconds)"
                  tooltip="The length of the generated output video clip."
                />
              }
              marks={DurationSliderOptions.marks}
              maxValue={DurationSliderOptions.max}
              minValue={DurationSliderOptions.min}
              step={DurationSliderOptions.step}
              onChangeEnd={(val) => handleValueChange("duration_sec", val)}
            />

            <Slider
              className="max-w-full w-full"
              defaultValue={
                config?.fps ??
                (typeof FpsSliderOptions.defaultValue === "number"
                  ? FpsSliderOptions.defaultValue
                  : 24)
              }
              label={
                <LabelWithTooltip
                  label="FPS"
                  tooltip="The frame rate of the generated video."
                />
              }
              marks={FpsSliderOptions.marks}
              maxValue={FpsSliderOptions.max}
              minValue={FpsSliderOptions.min}
              step={FpsSliderOptions.step}
              onChangeEnd={(val) => handleValueChange("fps", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
