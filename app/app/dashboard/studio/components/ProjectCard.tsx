import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Project, ProjectStatuses } from "@/features/projects/interfaces/projects.interfaces";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { ProjectStatusesLabels } from "@/config/dropdowns/project/project.options";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();

    return (
        <Card className="hover:scale-[1.02] cursor-pointer transition-transform">
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex flex-col">
                    <p className="text-md font-bold">{project.title}</p>
                    <p className="text-small text-default-500">
                        {new Date(project.created_at).toLocaleDateString()}
                    </p>
                </div>
                <Chip size="sm" color={project.status === ProjectStatuses.COMPLETED ? "success" : "primary"} variant="flat">
                    {ProjectStatusesLabels[project.status]}
                </Chip>
            </CardHeader>
            <CardBody>
                <p className="text-default-600 line-clamp-3">
                    {project.original_concept}
                </p>
            </CardBody>
            <CardFooter>
                <Button 
                   color="primary" 
                   variant="flat" 
                   className="w-full"
                   onPress={() => router.push(Routes.project(project.uuid))}
                >
                    Open Project
                </Button>
            </CardFooter>
        </Card>
    );
}
