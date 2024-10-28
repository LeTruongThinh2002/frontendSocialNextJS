"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import New from "@/components/ui/new";
import { fetchLatestNews } from "@/redux/news/news.action";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import NewsLoading from "./loading";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import NewsList from "@/components/model/NewsList";

const News = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latestNews, error, loading } = useSelector(
    (state: RootState) => state.news
  );

  const fetchNews = useCallback(async () => {
    try {
      await dispatch(fetchLatestNews()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (error && !loading && !latestNews) {
    toast.error(error);
    fetchNews();
  }
  if ((error && loading) || (loading && !latestNews)) {
    return <NewsLoading />;
  }

  if (!latestNews && !loading && !error) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-row gap-5 w-full px-2 select-none">
        <Carousel className="w-full max-h-[30em]">
          <CarouselContent>
            {latestNews.map((news, index) => (
              <NewsList
                listNews={latestNews}
                key={index}
                currentUser={index}
                innerCurrentNews={0}
              >
                <CarouselItem
                  className="basis-[18%] md:basis-[12%]"
                  key={index}
                >
                  <New user={news.user} />
                </CarouselItem>
              </NewsList>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default News;
