"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  } else {
    console.log(user);
  }

  return <div>HomePage</div>;
};

export default HomePage;
