import LayoutHome from "@/components/Layouts/Layout-Home";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  reel: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, reel }) => {
  return (
    <LayoutHome>
      {reel}
      {children}
    </LayoutHome>
  );
};

export default Layout;
