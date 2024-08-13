import CardOrtherUser from "./card-orther-user";
import { Button } from "./button";

const RecommendUser = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <CardOrtherUser />
      <Button className="ml-auto text-sky-400 text-sm font-semibold">
        Follow
      </Button>
    </div>
  );
};

export default RecommendUser;
