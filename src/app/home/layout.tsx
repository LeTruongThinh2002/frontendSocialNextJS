import HeaderTop from "@/components/Layouts/Header-top";
import LayoutHome from "@/components/Layouts/Layout-Home";
import SidebarRight from "@/components/Layouts/Sidebar-right";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  news: ReactNode;
  posts: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, news, posts }) => {
  return (
    <LayoutHome>
      <div className="grid lg:grid-cols-12 grid-rows-12 w-full h-full">
        <HeaderTop className="lg:hidden block row-start-1 row-end-2 col-start-1 col-end-13" />
        <div className="md:px-5 py-4 overflow-y-auto scrollable-content lg:col-start-1 lg:col-end-9 lg:row-start-1 col-start-1 col-end-13 row-start-2 row-end-13">
          <div className=" flex flex-col gap-5 justify-center items-center">
            {news}
            {children}
            <div className="md:w-[70%] w-full">{posts}</div>
          </div>
        </div>
        <SidebarRight className="py-10 px-10 lg:block hidden lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-13" />
      </div>
    </LayoutHome>
  );
};

export default Layout;
