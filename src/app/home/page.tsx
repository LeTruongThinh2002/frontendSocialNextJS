"use client";

import HeaderTop from "@/components/Layouts/Header-top";
import SidebarRight from "@/components/Layouts/Sidebar-right";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid lg:grid-cols-12 grid-rows-12 w-full h-full">
      <HeaderTop className="bg-yellow-700 lg:hidden block row-start-1 row-end-2 col-start-1 col-end-13" />
      <div className="bg-gray-700 lg:col-start-1 lg:col-end-10 lg:row-start-1 col-start-1 col-end-13 row-start-2 row-end-13">
        HomePage
      </div>
      <SidebarRight className=" hidden lg:block lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-13 bg-red-400" />
    </div>
  );
};

export default HomePage;
