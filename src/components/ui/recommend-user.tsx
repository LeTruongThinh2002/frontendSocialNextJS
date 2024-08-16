import CardOtherUser from "./card-other-user";
import { Button } from "./button";

const RecommendUser = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <CardOtherUser />
      <Button className="ml-auto text-sky-400 text-sm font-semibold">
        Follow
      </Button>
    </div>
  );
};

export default RecommendUser;
