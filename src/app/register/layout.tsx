import LayoutAuthentication from "@/components/Layouts/Layout-Authentication";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutAuthentication>{children}</LayoutAuthentication>;
};

export default Layout;
