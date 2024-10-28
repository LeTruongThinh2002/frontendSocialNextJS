import { GiSpiderWeb } from "react-icons/gi";

const PostEndFollow = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <GiSpiderWeb className="text-[4em] text-yellow-400" />
      <p className="text-[1.2em] font-medium gradient-text underline decoration-sky-400">
        All following posts has been done!
      </p>
    </div>
  );
};

export default PostEndFollow;
