"use client";
import { Modal } from "@/components/ui/modal";
import { ProjectAsset } from "@/features/project-assets/interfaces/project-assets.interfaces";

interface ProjectAssetImageDetailsModalProps {
  asset: ProjectAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectAssetImageDetailsModal({ asset, isOpen, onClose }: ProjectAssetImageDetailsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Image Details"
      size="4xl"
    >
      <div className="flex flex-col md:flex-row gap-6 p-2">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {asset?.document?.url && (
            <img 
              src={asset.document.url} 
              alt="Prompt Preview" 
              className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg border border-default-200" 
            />
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5 pt-2">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest">AI Model</p>
            <div className="inline-flex px-2.5 py-1 rounded-lg bg-default-100 border border-default-200">
              <p className="text-sm font-semibold text-default-700">{asset?.metadata?.ai_model || "Uploaded Image"}</p>
            </div>
          </div>
          <div className="space-y-1.5 flex-grow">
            <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest">Generation Prompt</p>
            <div className="bg-default-50/50 p-4 rounded-2xl border border-default-100 max-h-[40vh] overflow-y-auto no-scrollbar">
              <p className="text-sm text-default-700 leading-relaxed italic">
                {asset?.metadata?.prompt_text || "This image was uploaded manually and does not have generation metadata."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
