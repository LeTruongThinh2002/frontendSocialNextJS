"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { MdVideoLibrary } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { fetchUserPosts } from "@/redux/post/post.action";
import PostsLoading from "./loading";
import CurrentPost from "@/components/model/CurrentPost";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userPosts, error, loading } = useSelector(
    (state: RootState) => state.post
  );
  const {
    userById,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.user);
  const { userAuth } = useSelector((state: RootState) => state.user);

  const fetchPosts = useCallback(async () => {
    try {
      await dispatch(fetchUserPosts(userById?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userById?.id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (userLoading || userError) {
    return <PostsLoading />;
  }

  if (error && !loading) {
    fetchPosts();
    return <PostsLoading />;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {userPosts.length > 0 ? (
        userPosts.map((post, index) => (
          <CurrentPost key={post.id || index} type="post" post={post}>
            <AspectRatio
              ratio={1 / 1}
              className="bg-muted max-h-[30em] cursor-pointer relative aspect-ratio"
            >
              {post.media[0] && post.media[0].endsWith(".mp4") ? (
                <video
                  src={`https://res.cloudinary.com/dihtpxtxy/video/upload/c_scale,h_300,w_300/${post.media[0]
                    .split("/")
                    .pop()}`}
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={post.media[0] || post.media}
                  alt={
                    userById?.first_name + " " + userById?.last_name ||
                    "Post image"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
              <div className="overlay">
                <div className="flex flex-row gap-4">
                  <div className="text-sm items-center flex flex-row gap-1">
                    {post.like.some((like: any) => like.id === userAuth?.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaHeart />
                    )}
                    <span>{post.like.length}</span>
                  </div>
                  <div className="text-sm items-center flex flex-row gap-1">
                    <IoIosChatbubbles />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              {/* {post.type === "photo" ? (
                <GiCard4Hearts className="text-xl bg-opacity-10 absolute top-2 right-2" />
              ) : ( */}
              <MdVideoLibrary className="text-xl bg-opacity-10 absolute top-2 right-2" />
              {/* )} */}
            </AspectRatio>
          </CurrentPost>
        ))
      ) : (
        <div className="w-full col-span-3 py-5 text-center text-gray-500">
          No posts found
        </div>
      )}
    </div>
  );
};

export default Posts;
