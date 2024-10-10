"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { MdVideoLibrary } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { fetchUserReels } from "@/redux/reel/reel.action";
import ReelsLoading from "./loading";
import CurrentPost from "@/components/model/CurrentPost";

const Reels = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userReels, error, loading } = useSelector(
    (state: RootState) => state.reel
  );
  const {
    userById,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.user);
  const { userAuth } = useSelector((state: RootState) => state.user);
  const fetchReels = useCallback(async () => {
    try {
      await dispatch(fetchUserReels(userById?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userById?.id]);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  if (userLoading || userError) {
    return <ReelsLoading />;
  }

  if (error && !loading) {
    fetchReels();
    return <ReelsLoading />;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {userReels.length > 0 ? (
        userReels.map((reel, index) => (
          <CurrentPost key={reel.id || index} type="reel" post={reel}>
            <div key={reel.id || index}>
              <AspectRatio
                ratio={1 / 1.5}
                className="bg-muted max-h-[30em] cursor-pointer relative aspect-ratio"
              >
                <Image
                  src={reel.media}
                  alt={reel.description || "Reel thumbnail"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="overlay">
                  <div className="flex flex-row gap-4">
                    <div className="text-sm items-center flex flex-row gap-1">
                      {reel.like.some(
                        (like: any) => like.id === userAuth?.id
                      ) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaHeart />
                      )}
                      <span>{reel.like.length}</span>
                    </div>
                    <div className="text-sm items-center flex flex-row gap-1">
                      <IoIosChatbubbles />
                      <span>{reel.comments}</span>
                    </div>
                  </div>
                </div>
                <MdVideoLibrary className="text-xl bg-opacity-10 absolute top-2 right-2" />
              </AspectRatio>
            </div>
          </CurrentPost>
        ))
      ) : (
        <div className="w-full col-span-3 py-5 text-center text-gray-500">
          No reels found
        </div>
      )}
    </div>
  );
};

export default Reels;
