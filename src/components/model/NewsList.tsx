"use client";

import * as React from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CarouselNews from "../ui/carousel-news";

const NewsList = ({
  children,
  listNews,
  currentUser,
  innerCurrentNews = 0,
}: {
  children: React.ReactNode;
  listNews: any;
  currentUser: number | null;
  innerCurrentNews: number | null;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </DialogTrigger>
      <DialogContent
        className="h-[100vh] w-[100vw] max-h-[100vh] max-w-[100vw] border-0 p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <CarouselNews
          apiData={listNews}
          currentUser={currentUser}
          innerCurrentNews={innerCurrentNews}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewsList;
