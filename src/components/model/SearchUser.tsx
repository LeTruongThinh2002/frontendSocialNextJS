import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  recommendUserAction,
  searchUserAction,
} from "@/redux/user/user.action";
import RecommendForYou from "../ui/recommend-for-you";
import RecommendUser from "../ui/recommend-user";
import { toast } from "sonner";

const SearchUser = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const { searchUser, loading } = useSelector((state: RootState) => state.user);
  const { recommendUser } = useSelector((state: any) => state.user);

  const handleRecommendUser = useCallback(async () => {
    await dispatch(recommendUserAction());
  }, [dispatch]);

  useEffect(() => {
    handleRecommendUser();
  }, [handleRecommendUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.error("Please enter a username");
      setSearch("");
      return;
    }
    await dispatch(searchUserAction(search));
    setSearch("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div onClick={(e) => e.stopPropagation()} className="cursor-pointer">
          {children}
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-0 border-r h-full max-h-[100vh] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Search user by name</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            <form
              className="flex flex-row items-center gap-2 flex-grow bg-white/10 backdrop-blur-md rounded-md"
              onSubmit={handleSubmit}
            >
              <Input
                id="comment"
                className="placeholder:text-gray-400 border-0 "
                placeholder="Enter your comment..."
                onChange={(e): any => setSearch(e.target.value)}
                value={search}
              />
              <Button
                type="submit"
                className={
                  search
                    ? "cursor-pointer hover:text-sky-500"
                    : "text-gray-500 cursor-not-allowed"
                }
                disabled={search === ""}
              >
                {loading ? (
                  <div className="spinner-loading"></div>
                ) : (
                  <AiOutlineSend size={"1.5em"} />
                )}
              </Button>
            </form>
            {searchUser && (
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
                {searchUser.map((user: any) => (
                  <div key={user.id} className="flex flex-row gap-2 w-full">
                    <RecommendUser user={user} />
                  </div>
                ))}
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        {searchUser && Object.keys(searchUser).length === 0 && (
          <SheetHeader className="mt-auto">
            {recommendUser && <RecommendForYou arrays={recommendUser} />}
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchUser;
