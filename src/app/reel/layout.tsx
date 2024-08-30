import LayoutHome from "@/components/Layouts/Layout-Home";
import { FC, ReactNode, Suspense } from "react";
import ReelLoading from "./@reel/loading";

type LayoutProps = {
  children: ReactNode;
  reel: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, reel }) => {
  return (
    <LayoutHome>
      <Suspense fallback={<ReelLoading />}>{reel}</Suspense>
      {children}
    </LayoutHome>
  );
};

export default Layout;
