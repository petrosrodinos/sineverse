import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/use-projects";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { useEffect } from "react";

export function CreateProjectModal({ 
    isOpen, 
    onOpenChange, 
    onClose,
    project 
}: { 
    isOpen: boolean, 
    onOpenChange: (open: boolean) => void, 
    onClose: () => void,
    project?: Project
}) {
    const { mutate: createProject, isPending: isCreating } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [concept, setConcept] = useState("");

    const isPending = isCreating || isUpdating;

    useEffect(() => {
        if (isOpen) {
            setTitle(project?.title || "");
            setConcept(project?.original_concept || "");
        }
    }, [isOpen, project]);

    const handleSave = () => {
        if (!title || !concept) return;
        
        if (project) {
            updateProject(
                { uuid: project.uuid, project: { title, original_concept: concept } },
                {
                    onSuccess: () => {
                        onClose();
                    }
                }
            );
        } else {
            createProject(
                { title, original_concept: concept }, 
                {
                    onSuccess: (newProject) => {
                        onClose();
                        router.push(Routes.project(newProject.uuid));
                    }
                }
            );
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{project ? "Edit Project" : "Create New Project"}</ModalHeader>
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
                            <Button color="primary" onPress={handleSave} isLoading={isPending} isDisabled={!title || !concept}>
                                {project ? "Save Changes" : "Create Project"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
