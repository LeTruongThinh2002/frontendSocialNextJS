"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserProfileAction } from "@/redux/user/user.action";
import { useEffect } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.user);
  const { userById } = useSelector((state: RootState) => state.user);
  // const { userAuth } = useSelector((state: RootState) => state.user);

  const fetchProfile = async () => {
    await dispatch(getUserProfileAction(Number(id)));
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (
    error === "Action not allowed due to block restrictions" ||
    error === "User not found"
  ) {
    toast.error(error);
    router.push("/home");
  }
  if ((!userById && !loading) || (error && !loading)) {
    fetchProfile();
  }

  // if (!userAuth) {
  //   dispatch(fetchAuthUserInfoAction());
  // }
  return <></>;
};

export default ProfilePage;
