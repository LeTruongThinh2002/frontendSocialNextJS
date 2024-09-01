"use client";
import { FC, ReactNode } from "react";
import SidebarLeft from "./Sidebar-left";
import SidebarBottom from "./Sidebar-bottom";
import { AuthGuard } from "./AuthGuard";

type LayoutProps = {
  children: ReactNode;
};

const LayoutHome: FC<LayoutProps> = ({ children }) => {
  return (
    <AuthGuard>
      <div className="h-screen w-screen max-h-screen grid lg:grid-cols-12 grid-rows-12">
        <SidebarLeft className="py-4 hidden lg:block lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-13 lg:border-r lg:border-gray-600" />
        <div className="lg:col-start-2 lg:col-end-13 lg:row-start-1 lg:row-end-13 row-start-1 row-end-12 overflow-hidden">
          {children}
        </div>
        <SidebarBottom className="lg:hidden block row-start-12 row-end-13 w-full h-full" />
      </div>
    </AuthGuard>
  );
};

export default LayoutHome;
