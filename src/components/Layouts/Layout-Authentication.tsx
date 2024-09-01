"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

type LayoutProps = {
  children: ReactNode;
};

const LayoutAuthentication: FC<LayoutProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-center bg-fixed bg-cover bg-[url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1722414427/wp2239808-wallpaper-gif_wpkk8l.gif)]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center md:px-24 md:w-2/5 w-3/4 md:py-10 md:rounded-xl md:border-x-2 border-yellow-300/70 bg-transparent/5 shadow-xl">
          <h1 className="mb-2 text-2xl font-bold edu-vic-wa-nt-beginner-700 gradient-text">
            Spider
          </h1>
          {children}
          {user && (
            <div className="text-sm font-light flex flex-row items-center justify-center gap-2 bg-opacity-10 rounded-md">
              <span className="bg-[url('https://i.gifer.com/EAoe.gif')] bg-cover bg-center bg-no-repeat text-transparent bg-clip-text">
                Welcome, {user.first_name}!
              </span>
              <Button variant={"ghost"} onClick={() => router.push("/home")}>
                Go home!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutAuthentication;
