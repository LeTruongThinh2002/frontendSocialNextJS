import { UserProvider } from "@/context/UserContext";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const LayoutHome: FC<LayoutProps> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default LayoutHome;
