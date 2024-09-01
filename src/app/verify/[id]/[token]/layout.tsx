import LayoutHome from "@/components/Layouts/Layout-Home";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutHome>{children}</LayoutHome>;
};

export default Layout;
