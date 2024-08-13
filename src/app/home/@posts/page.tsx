import PostCard from "@/components/ui/post";

const Posts = () => {
  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        {[1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
          <PostCard key={item} />
        ))}
      </div>
    </>
    // <div>post</div>
  );
};

export default Posts;
