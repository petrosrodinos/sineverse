import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export function ProjectSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-5 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
        </div>
      </CardBody>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}
