"use client";

import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import { Info } from "lucide-react";
import { SceneVariation } from "@/features/scene-variations/interfaces/scene-variations.interfaces";
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
    AiModelOptions,
    MotionStrengthSliderOptions,
    GuidanceScaleSliderOptions,
    CreativitySliderOptions,
    DurationSliderOptions,
    FpsSliderOptions
} from "@/config/dropdowns/project/scene-variations.options";

interface VideoGenerationOptionsProps {
    sceneVariation?: Partial<SceneVariation>;
    onChange?: (field: string, value: any) => void;
}

const LabelWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
    <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <Tooltip content={tooltip} placement="top" className="max-w-[250px]" delay={0} closeDelay={0}>
            <span className="pointer-events-auto flex items-center">
                <Info className="w-3.5 h-3.5 text-default-400 cursor-help" />
            </span>
        </Tooltip>
    </div>
);

export function VideoGenerationOptions({ sceneVariation, onChange }: VideoGenerationOptionsProps) {
    const handleValueChange = (field: string, value: any) => {
        if (onChange) {
            onChange(field, value);
        }
    };

    return (
        <div className="flex flex-col w-full pb-8">
            <div className="flex flex-col gap-6">
                
                {/* Format & Model */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-medium font-semibold text-foreground">Model & Format</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Select
                            label={<LabelWithTooltip label="AI Model" tooltip="Select the underlying AI model used for video generation." />}
                            defaultSelectedKeys={sceneVariation?.ai_model ? [sceneVariation.ai_model] : undefined}
                            onChange={(e) => handleValueChange("ai_model", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {AiModelOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Aspect Ratio" tooltip="The framing format for the final video." />}
                            defaultSelectedKeys={sceneVariation?.aspect_ratio ? [sceneVariation.aspect_ratio] : undefined}
                            onChange={(e) => handleValueChange("aspect_ratio", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {AspectRatioOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Resolution" tooltip="The output quality and pixel dimensions." />}
                            defaultSelectedKeys={sceneVariation?.resolution ? [sceneVariation.resolution] : undefined}
                            onChange={(e) => handleValueChange("resolution", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {ResolutionOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <Divider />

                {/* Cinematography */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-medium font-semibold text-foreground">Cinematography</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Select
                            label={<LabelWithTooltip label="Camera Movement" tooltip="How the camera physically moves through the scene." />}
                            defaultSelectedKeys={sceneVariation?.camera_movement ? [sceneVariation.camera_movement] : undefined}
                            onChange={(e) => handleValueChange("camera_movement", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {CameraMovementOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Lens Type" tooltip="The physical characteristics of the simulated camera lens." />}
                            defaultSelectedKeys={sceneVariation?.lens_type ? [sceneVariation.lens_type] : undefined}
                            onChange={(e) => handleValueChange("lens_type", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {LensTypeOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Camera Style" tooltip="The mounting or handling style of the camera." />}
                            defaultSelectedKeys={sceneVariation?.camera ? [sceneVariation.camera] : undefined}
                            onChange={(e) => handleValueChange("camera", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {CameraStyleOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Shot Type" tooltip="The scale and framing of the subject." />}
                            defaultSelectedKeys={sceneVariation?.shot_type ? [sceneVariation.shot_type] : undefined}
                            onChange={(e) => handleValueChange("shot_type", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {ShotTypeOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Depth of Field" tooltip="The range of distance that appears acceptably sharp." />}
                            defaultSelectedKeys={sceneVariation?.depth_of_field ? [sceneVariation.depth_of_field] : undefined}
                            onChange={(e) => handleValueChange("depth_of_field", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {DepthOfFieldOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <Divider />

                {/* Lighting & Style */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-medium font-semibold text-foreground">Lighting & Style</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Select
                            label={<LabelWithTooltip label="Style" tooltip="The core artistic or visual style of the generation." />}
                            defaultSelectedKeys={sceneVariation?.style ? [sceneVariation.style] : undefined}
                            onChange={(e) => handleValueChange("style", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {StylesOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Lighting" tooltip="The artificial or natural lighting setup." />}
                            defaultSelectedKeys={sceneVariation?.lighting ? [sceneVariation.lighting] : undefined}
                            onChange={(e) => handleValueChange("lighting", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {LightingOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Color Grade" tooltip="The post-processing color treatment." />}
                            defaultSelectedKeys={sceneVariation?.color_grade ? [sceneVariation.color_grade] : undefined}
                            onChange={(e) => handleValueChange("color_grade", e.target.value)}
                            variant="bordered"
                            className="w-full"
                        >
                            {ColorGradeOptions.map((option) => (
                                <SelectItem key={option.value}>{option.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label={<LabelWithTooltip label="Time of Day" tooltip="The simulated time of day affecting natural light." />}
                            defaultSelectedKeys={sceneVariation?.time_of_day ? [sceneVariation.time_of_day] : undefined}
                            onChange={(e) => handleValueChange("time_of_day", e.target.value)}
                            variant="bordered"
                            className="w-full"
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
                    <h4 className="text-medium font-semibold text-foreground">Generation Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-2 px-2 pb-6">
                        <Slider
                            label={<LabelWithTooltip label="Motion Strength" tooltip="How much movement occurs in the generated video." />}
                            step={MotionStrengthSliderOptions.step}
                            maxValue={MotionStrengthSliderOptions.max}
                            minValue={MotionStrengthSliderOptions.min}
                            defaultValue={sceneVariation?.motion_strength ?? (typeof MotionStrengthSliderOptions.defaultValue === "number" ? MotionStrengthSliderOptions.defaultValue : 0.5)}
                            marks={MotionStrengthSliderOptions.marks}
                            onChangeEnd={(val) => handleValueChange("motion_strength", val)}
                            className="w-full"
                        />

                        <Slider
                            label={<LabelWithTooltip label="Guidance Scale" tooltip="How strictly the AI follows your prompt vs its own creativity." />}
                            step={GuidanceScaleSliderOptions.step}
                            maxValue={GuidanceScaleSliderOptions.max}
                            minValue={GuidanceScaleSliderOptions.min}
                            defaultValue={sceneVariation?.guidance_scale ?? (typeof GuidanceScaleSliderOptions.defaultValue === "number" ? GuidanceScaleSliderOptions.defaultValue : 7.5)}
                            marks={GuidanceScaleSliderOptions.marks}
                            onChangeEnd={(val) => handleValueChange("guidance_scale", val)}
                            className="w-full"
                        />

                        <Slider
                            label={<LabelWithTooltip label="Creativity" tooltip="The amount of variation and alternative ideas the AI applies." />}
                            step={CreativitySliderOptions.step}
                            maxValue={CreativitySliderOptions.max}
                            minValue={CreativitySliderOptions.min}
                            defaultValue={sceneVariation?.creativity ?? (typeof CreativitySliderOptions.defaultValue === "number" ? CreativitySliderOptions.defaultValue : 0.5)}
                            marks={CreativitySliderOptions.marks}
                            onChangeEnd={(val) => handleValueChange("creativity", val)}
                            className="w-full"
                        />

                        <Slider
                            label={<LabelWithTooltip label="Duration (Seconds)" tooltip="The length of the generated output video clip." />}
                            step={DurationSliderOptions.step}
                            maxValue={DurationSliderOptions.max}
                            minValue={DurationSliderOptions.min}
                            defaultValue={sceneVariation?.duration_sec ?? (typeof DurationSliderOptions.defaultValue === "number" ? DurationSliderOptions.defaultValue : 5)}
                            marks={DurationSliderOptions.marks}
                            onChangeEnd={(val) => handleValueChange("duration_sec", val)}
                            className="w-full"
                        />

                        <Slider
                            label={<LabelWithTooltip label="FPS" tooltip="The frame rate of the generated video." />}
                            step={FpsSliderOptions.step}
                            maxValue={FpsSliderOptions.max}
                            minValue={FpsSliderOptions.min}
                            defaultValue={sceneVariation?.fps ?? (typeof FpsSliderOptions.defaultValue === "number" ? FpsSliderOptions.defaultValue : 24)}
                            marks={FpsSliderOptions.marks}
                            onChangeEnd={(val) => handleValueChange("fps", val)}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
