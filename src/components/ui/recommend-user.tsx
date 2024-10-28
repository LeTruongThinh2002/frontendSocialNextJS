"use client";
import CardOtherUser from "./card-other-user";
import { Button } from "./button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { followUserAction } from "@/redux/user/user.action";
import { toast } from "sonner";
import Link from "next/link";

const RecommendUser = ({ user }: { user: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: authUser,
    loading,
    error,
  } = useSelector((state: RootState) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(
      authUser?.userFollow?.some((follow: any) => follow.id === user.id)
    );
  }, [authUser, user]);

  const handleFollow = useCallback(async () => {
    await dispatch(followUserAction(user.id));
  }, [dispatch, user]);

  if (error) {
    toast.error(error);
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <Link
        href={`/profile/${user.id}`}
        className="cursor-pointer flex flex-row gap-2 items-center"
      >
        <CardOtherUser user={user} />
      </Link>
      <Button
        onClick={handleFollow}
        className={`ml-auto text-sky-400 text-sm font-semibold ${
          loading ? "opacity-50 cursor-not-allowed spinner" : ""
        }`}
      >
        {loading ? "" : isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default RecommendUser;
