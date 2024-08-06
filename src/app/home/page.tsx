"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>HomePage</div>;
};

export default HomePage;
