import PostCard from "@/components/ui/post";

const Posts = async () => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    return Array.from({ length: 10 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();
  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        {newsItems.map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
    </>
    // <div>post</div>
  );
};

export default Posts;
