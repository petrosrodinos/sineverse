"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@heroui/button";
import { Image, Upload, X } from "lucide-react";
import { Spinner } from "@heroui/spinner";

interface ImageUploadProps {
  value?: string;
  onChange?: (file: File) => void;
  onRemove?: () => void;
  isLoading?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  isLoading,
  label,
  description,
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange?.(e.target.files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onChange?.(e.dataTransfer.files[0]);
      }
    },
    [onChange]
  );

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      {description && <p className="text-xs text-default-500">{description}</p>}

      <div
        className={`relative group border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden min-h-[160px] flex items-center justify-center
          ${dragActive ? "border-primary bg-primary/5" : "border-default-200 hover:border-primary/50"}
          ${value ? "border-solid" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative w-full h-full aspect-video">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-white/20 text-white backdrop-blur-md"
                  startContent={<Upload className="size-4" />}
                  as="div"
                >
                  Change
                </Button>
              </label>
              <Button
                size="sm"
                color="danger"
                variant="flat"
                className="backdrop-blur-md"
                onPress={onRemove}
                isIconOnly
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 p-6 cursor-pointer w-full h-full">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <div className="p-3 rounded-full bg-default-100 text-default-500 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <Image className="size-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-default-400">PNG, JPG or WEBP (max. 5MB)</p>
            </div>
          </label>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-default-50/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
            <Spinner size="md" color="primary" />
            <p className="text-xs font-medium text-primary">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
