import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateScene } from "@/features/scenes/hooks/use-scenes";
import { Scene } from "@/features/scenes/interfaces/scenes.interfaces";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateSceneModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  projectUuid: string;
  scenes: Scene[];
}

export function CreateSceneModal({ isOpen, onOpenChange, onClose, projectUuid, scenes }: CreateSceneModalProps) {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate: createScene, isPending } = useCreateScene();

  const onSubmit = (data: FormValues) => {
    createScene(
      {
        project_uuid: projectUuid,
        title: data.title,
        description: data.description,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create New Scene</ModalHeader>
            <ModalBody>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Scene Title"
                    placeholder="Enter scene title"
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    label="Description (Optional)"
                    placeholder="Enter scene description..."
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={isPending}>
                Create Scene
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
