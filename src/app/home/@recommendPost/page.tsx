"use client";
import PostCard from "@/components/ui/post";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useCallback, Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecommendPostsLoading from "./loading";
import { toast } from "sonner";
import { fetchPosts } from "@/redux/post/post.action";

const RecommendPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  const fetchPost = useCallback(async () => {
    try {
      await dispatch(fetchPosts()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (error && !loading && !posts) {
    toast.error(error);
    fetchPosts();
  }

  if ((error && loading) || (loading && !posts)) {
    return <RecommendPostsLoading />;
  }

  if (!posts && !loading && !error) {
    fetchPosts();
    return <RecommendPostsLoading />;
  }

  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        {posts?.data?.map((post: any, index: Key | null | undefined) => (
          <PostCard key={index} post={post} follow={false} />
        ))}
      </div>
    </>
    // <div>post</div>
  );
};

export default RecommendPosts;
