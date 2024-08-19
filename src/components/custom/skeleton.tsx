import { Skeleton } from "../ui/skeleton";

type Props = {
};

function PostSkeleton({}: Props) {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-[325px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] md:w-[550px]" />
          <Skeleton className="h-4 w-[150px] md:w-[500px]" />
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
