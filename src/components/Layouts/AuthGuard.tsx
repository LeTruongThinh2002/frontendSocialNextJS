"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import LayoutAuthentication from "./Layout-Authentication";
import LoadingPage from "./Loading-page";
import { fetchUserProfileAction, logoutAction } from "@/redux/auth/auth.action";
import Cookies from "js-cookie";
import { fetchAuthUserInfoAction } from "@/redux/user/user.action";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const {
    userAuth,
    loading: userLoading,
    error,
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkAuthAndFetch = () => {
      const accessToken = Cookies.get("access_token");
      const refreshToken = Cookies.get("refresh_token");

      // Check if the user is not authenticated
      if (!accessToken && !refreshToken && user) {
        dispatch(logoutAction());
        redirect("/login");
      }

      // Check if the user is authenticated
      if (!user && !loading) {
        if (accessToken || refreshToken) {
          dispatch(fetchUserProfileAction());
        } else {
          redirect("/login");
        }
      }
    };

    checkAuthAndFetch();
  }, [user, loading, dispatch, router]);

  // Show loading page while checking authentication
  if (loading) {
    return <LoadingPage />;
  }

  if (!userAuth && !userLoading) {
    dispatch(fetchAuthUserInfoAction());
  }

  // Show authentication page if the user is not authenticated
  if (!user) {
    return (
      <LayoutAuthentication>
        <div className="flex flex-col gap-2 items-center justify-center">
          <span>Verifying your authentication...</span>
        </div>
      </LayoutAuthentication>
    );
  }

  return <>{children}</>;
};
