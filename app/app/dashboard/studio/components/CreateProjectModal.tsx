import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { useCreateProject } from "@/features/projects/hooks/use-projects";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";

export function CreateProjectModal({ isOpen, onOpenChange, onClose }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onClose: () => void }) {
    const { mutate: createProject, isPending } = useCreateProject();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [concept, setConcept] = useState("");

    const handleCreate = () => {
        if (!title || !concept) return;
        createProject({ title, original_concept: concept }, {
            onSuccess: (project) => {
                onClose();
                router.push(Routes.project(project.uuid));
            }
        });
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create New Project</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Title"
                                placeholder="Enter project title"
                                variant="bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                label="Concept"
                                placeholder="Describe your creative vision"
                                variant="bordered"
                                value={concept}
                                onChange={(e) => setConcept(e.target.value)}
                                minRows={4}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleCreate} isLoading={isPending} isDisabled={!title || !concept}>
                                Create Project
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
