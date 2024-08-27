"use client";
import { FC, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const LayoutAuthentication: FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("access_token");
  const rf_token = Cookies.get("refresh_token");

  const route = useRouter();

  if (token || rf_token) {
    route.push("/home");
  }

  return (
    <div className="min-h-screen bg-center bg-fixed bg-cover bg-[url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1722414427/wp2239808-wallpaper-gif_wpkk8l.gif)]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="md:px-24 md:w-2/5 w-3/4 md:py-10 md:rounded-xl md:border-x-2 border-yellow-300/70 bg-transparent/5 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAuthentication;
