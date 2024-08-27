import PostCard from "@/components/ui/post";

const Posts = () => {
  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
    </>
    // <div>post</div>
  );
};

export default Posts;
