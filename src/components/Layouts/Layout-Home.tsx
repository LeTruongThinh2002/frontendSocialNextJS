"use client";

import { UserProvider } from "@/context/UserContext";
import { FC, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
  return <UserProvider>{children}</UserProvider>;
};

export default LayoutHome;
