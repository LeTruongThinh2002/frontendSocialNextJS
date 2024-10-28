import { CardContent } from "./card";
import ActionComment from "./action-comment";
import ActionLike from "./action-like";

const ActionCurrentPost = ({ post, type }: { post: any; type: string }) => {
  return (
    <CardContent className="flex flex-col gap-1 mt-auto">
      <ActionLike post={post} type={type} />
      <ActionComment post={post} type={type} />
    </CardContent>
  );
};

export default ActionCurrentPost;
