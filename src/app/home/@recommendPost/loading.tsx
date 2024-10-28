import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const RecommendPostLoading = () => (
  <Card className="w-full border-0 rounded-none ">
    <CardHeader className="flex flex-row items-center">
      <Skeleton className="h-12 w-12 rounded-full " />
      <div className="ml-4 space-y-2">
        <Skeleton className="h-4 w-[200px] " />
        <Skeleton className="h-4 w-[150px] " />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full " />
    </CardContent>
    <CardContent className="flex flex-row gap-4">
      <Skeleton className="h-6 w-6 " />
      <Skeleton className="h-6 w-6 " />
      <Skeleton className="h-6 w-6 " />
      <Skeleton className="h-4 w-20 ml-auto " />
    </CardContent>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-[250px] " />
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-[100px] " />
    </CardContent>
    <CardFooter className="flex flex-row gap-2">
      <Skeleton className="h-10 w-10 rounded-full " />
      <Skeleton className="h-10 flex-grow " />
      <Skeleton className="h-6 w-6 " />
    </CardFooter>
  </Card>
);

const RecommendPostsLoading = () => {
  return (
    <div className="md:w-[70%] w-full space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <RecommendPostLoading key={index} />
      ))}
    </div>
  );
};

export default RecommendPostsLoading;
