"use client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import CardOtherUser from "../ui/card-other-user";
import RecommendForYou from "../ui/recommend-for-you";
import WebInfo from "../ui/web-info";
import { AppDispatch, RootState } from "@/redux/store";
import { recommendUserAction } from "@/redux/user/user.action";
import { useEffect } from "react";
import { useCallback } from "react";
import SidebarRightLoading from "./Sidebar-right-loading";
import { toast } from "sonner";
import { logoutAction } from "@/redux/auth/auth.action";

const SidebarRight = ({ ...prop }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading: loadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const { recommendUser, loading, error } = useSelector(
    (state: any) => state.user
  );

  const handleRecommendUser = useCallback(async () => {
    await dispatch(recommendUserAction());
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    await dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    handleRecommendUser();
  }, [handleRecommendUser]);

  if (error && !loading && !recommendUser) {
    toast.error(error);
    handleRecommendUser();
  }
  if (loading) {
    return <SidebarRightLoading />;
  }

  if (!recommendUser) {
    return <></>;
  }

  return (
    <div {...prop}>
      <div className="flex flex-row items-center gap-2">
        <CardOtherUser user={user} />
        <Button
          onClick={handleLogout}
          className="ml-auto text-sm font-semibold"
          disabled={loadingAuth}
        >
          Logout
        </Button>
      </div>
      <RecommendForYou arrays={recommendUser} />
      <WebInfo />
    </div>
  );
};

export default SidebarRight;
