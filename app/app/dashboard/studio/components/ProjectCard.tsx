import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Project } from "@/features/projects/interfaces/projects.interfaces";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/routes";
import { GenreOptionsLabels, TypeOptionsLabels } from "@/config/dropdowns/project/project.options";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();

    return (
        <Card className="hover:scale-[1.02] cursor-pointer transition-transform">
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-md font-bold">{project.title}</p>
                    <p className="text-small text-default-500">
                        {new Date(project.created_at).toLocaleDateString()}
                    </p>
                    <Chip size="sm" variant="flat" color="primary">
                        {TypeOptionsLabels[project.type]}
                    </Chip>
                </div>
            </CardHeader>
            <CardBody>
                {project.genres && project.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {project.genres.map((genre, idx) => (
                            <Chip key={idx} size="sm" variant="flat" color="secondary">
                                {GenreOptionsLabels[genre] || genre}
                            </Chip>
                        ))}
                    </div>
                )}
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
