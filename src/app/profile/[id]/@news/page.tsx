"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserNews } from "@/redux/news/news.action";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileNew from "@/components/ui/profile-new";
import ProfileNewsLoading from "./loading";
import NewsList from "@/components/model/NewsList";

const News = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userNews, loading, error } = useSelector(
    (state: RootState) => state.news
  );
  const {
    userById,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.user);

  const fetchNews = useCallback(async () => {
    try {
      await dispatch(fetchUserNews(userById?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userById?.id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading || userLoading || userError) {
    return <ProfileNewsLoading />;
  }

  if (error && !loading) {
    fetchNews();
    return <ProfileNewsLoading />;
  }

  if (!userNews) {
    console.log(userNews);
    return <></>;
  }

  return (
    <div className="flex flex-row gap-5 w-full px-2">
      <Carousel className="w-full max-h-[30em]">
        <CarouselContent>
          {userNews[0]?.news?.map((item: any, index: any) => (
            <NewsList
              listNews={userNews}
              key={index}
              currentUser={0}
              innerCurrentNews={index}
            >
              <CarouselItem className="basis-[24%] md:basis-[18%]">
                <ProfileNew news={item} />
              </CarouselItem>
            </NewsList>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default News;
