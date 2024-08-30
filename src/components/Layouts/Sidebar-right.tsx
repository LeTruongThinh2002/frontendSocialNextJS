import { Button } from "../ui/button";
import CardOtherUser from "../ui/card-other-user";
import RecommendForYou from "../ui/recommend-for-you";
import WebInfo from "../ui/web-info";

const SidebarRight = async ({ ...prop }) => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    return Array.from({ length: 5 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();
  return (
    <div {...prop}>
      <div className="flex flex-row items-center gap-2">
        <CardOtherUser />
        <Button className="ml-auto text-sm font-semibold">Logout</Button>
      </div>
      <RecommendForYou arrays={newsItems} />
      <WebInfo />
    </div>
  );
};

export default SidebarRight;
