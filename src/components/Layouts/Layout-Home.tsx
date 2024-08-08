"use client";
import { UserProvider } from "@/context/UserContext";
import { FC, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SidebarLeft from "./Sidebar-left";
import SidebarBottom from "./Sidebar-bottom";

type LayoutProps = {
  children: ReactNode;
};

const LayoutHome: FC<LayoutProps> = ({ children }) => {
  const token = Cookies.get("access_token");
  const rf_token = Cookies.get("refresh_token");

  const route = useRouter();

  if (!token && !rf_token) {
    route.push("/login");
  }
  return (
    <UserProvider>
      <div className="h-screen w-screen grid lg:grid-cols-12 grid-rows-12">
        <SidebarLeft className="hidden lg:block lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-13 bg-slate-400" />
        <div className="lg:col-start-2 lg:col-end-13 lg:row-start-1 lg:row-end-13 row-start-1 row-end-12">
          {children}
        </div>
        <SidebarBottom className="bg-rose-400 lg:hidden block row-start-12 row-end-13" />
      </div>
    </UserProvider>
  );
};

export default LayoutHome;
