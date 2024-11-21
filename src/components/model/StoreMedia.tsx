import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import FileInputPopover from "@/components/ui/context-menu-input-file.tsx";
import RadioSelectType from "@/components/ui/radio-select-type";
import ImageList from "@/components/ui/image-list";
import NovelEditor from "@/components/ui/novel-editor";
import PostReview from "../ui/post-review";
import NewsReview from "../ui/news-review";
import ReelReview from "../ui/reel-review";
import { toast } from "sonner";
import { uploadToCLoudinary } from "@/services/uploadToCloudinary";
import { createPost } from "@/redux/post/post.action";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { createReel } from "@/redux/reel/reel.action";
import { createNews } from "@/redux/news/news.action";

function StoreMedia({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.post);
  const { loading: loadingReel, error: errorReel } = useSelector(
    (state: RootState) => state.reel
  );
  const { loading: loadingNews, error: errorNews } = useSelector(
    (state: RootState) => state.news
  );
  const { userAuth } = useSelector((state: RootState) => state.user);

  // Quản lý trạng thái nội dung hiện tại
  const [content, setContent] = useState("initial");

  // Chọn kiểu tạo bài viết
  const [type, setType] = useState("post");

  // Lưu trữ file
  const [files, setFiles] = useState<File[] | null>(null);

  // Lưu trữ description
  const [description, setDescription] = useState("");
  const [editor, setEditor] = useState<any>("");

  //handle clear all files
  const handleClearFiles = () => {
    setFiles(null);
    setDescription("");
    setEditor("");
    setContent("initial");
  };

  // handle store to api
  const handleStoreFiles = async () => {
    switch (type) {
      case "post": {
        await dispatch(
          createPost({
            description: JSON.stringify({
              html: description,
              json: editor,
            }),
            media: files
              ? (
                  await Promise.all(
                    Array.from(files).map((file: any) => {
                      return uploadToCLoudinary(
                        [file],
                        file.type.startsWith("image") ? "image" : "video"
                      );
                    })
                  )
                ).flat()
              : [],
          })
        );
        if (error) {
          toast.error(error);
        }
        if (!loading && !error) {
          toast.success("Create post success!");
          handleClearFiles();
          setOpen(false);
        }
        break;
      }
      case "reel": {
        await dispatch(
          createReel({
            description: description,
            media: files
              ? (
                  await Promise.all(
                    Array.from(files).map((file: any) => {
                      return uploadToCLoudinary([file], "video");
                    })
                  )
                ).flat()[0]
              : "",
          })
        );
        if (errorReel) {
          toast.error(errorReel);
        }
        if (!loadingReel && !errorReel) {
          toast.success("Create reel success!");
          handleClearFiles();
          setOpen(false);
        }
        break;
      }
      case "news": {
        await dispatch(
          createNews({
            description: description,
            media: files
              ? (
                  await Promise.all(
                    Array.from(files).map((file: any) => {
                      return uploadToCLoudinary(
                        [file],
                        file.type.startsWith("image") ? "image" : "video"
                      );
                    })
                  )
                ).flat()[0]
              : "",
          })
        );
        if (errorNews) {
          toast.error(errorNews);
        }
        if (!loadingNews && !errorNews) {
          toast.success("Create news success!");
          handleClearFiles();
          setOpen(false);
        }
        break;
      }
      default:
        toast.error("Please select the type of content you want to create!");
        break;
    }
  };

  // Nội dung ban đầu
  const InitialContent = () => {
    return (
      <div
        data-aos="fade-left"
        data-aos-once="false"
        className="flex flex-col justify-center items-center gap-5 cursor-pointer"
      >
        <RadioSelectType type={type} setType={setType} setFiles={setFiles} />
      </div>
    );
  };

  // Nội dung thứ hai
  const SecondaryContent = () => (
    <div
      data-aos="fade-right"
      data-aos-once="false"
      className="flex flex-col justify-center items-center gap-5"
    >
      {files ? (
        <div className="h-full w-full">
          <ImageList images={files} />
        </div>
      ) : (
        <FileInputPopover setFiles={setFiles} type={type}>
          <p className="cursor-pointer flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Upload you media for {type}
          </p>
        </FileInputPopover>
      )}
    </div>
  );

  // Nội dung thứ ba
  const TertiaryContent = () => (
    <div
      data-aos="fade-right"
      data-aos-once="false"
      className="flex flex-col justify-center items-center gap-5"
    >
      <NovelEditor
        description={description}
        setDescription={setDescription}
        editor={editor}
        setEditor={setEditor}
        type={type}
      />
    </div>
  );

  const QuaternaryContent = () => (
    <div
      data-aos="fade-right"
      data-aos-once="false"
      className="flex flex-col justify-center items-center gap-5"
    >
      {files &&
        (type === "post" ? (
          <PostReview
            post={{
              media: files,
              description: { html: description },
            }}
            userAuth={userAuth}
          />
        ) : type === "news" ? (
          <NewsReview
            apiData={{ media: files, description: description }}
            currentUser={userAuth}
          />
        ) : (
          <ReelReview reel={{ media: files, user: userAuth, description }} />
        ))}
    </div>
  );

  // Chọn nội dung dựa trên trạng thái
  const renderContent = () => {
    switch (content) {
      case "secondary":
        return <SecondaryContent />;
      case "tertiary":
        return <TertiaryContent />;
      case "quaternary":
        return <QuaternaryContent />;
      case "initial":
      default:
        return <InitialContent />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-lg rounded-md border-white/20 overflow-hidden">
        <DialogHeader className="flex flex-row justify-center w-full">
          <DialogTitle>
            {content === "initial"
              ? `💡 Select the option you want!`
              : content === "secondary"
              ? `Choose your favorite art content 📸`
              : content === "tertiary"
              ? `Create you description 📝`
              : `All done. Check your ${type}! 🔍`}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[70vh]">
          {loading || loadingReel || loadingNews ? (
            <div className="flex justify-center items-center h-[20vh]">
              <div className="spinner-loading"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
        <div className="flex flex-row justify-between ">
          {content !== "initial" && (
            <Button
              variant={"ghost"}
              onClick={() =>
                setContent(
                  content === "secondary"
                    ? "initial"
                    : content === "tertiary"
                    ? "secondary"
                    : "tertiary"
                )
              }
            >
              🏃‍♂️ Previous
            </Button>
          )}
          {files && content === "secondary" && (
            <FileInputPopover setFiles={setFiles} type={type}>
              <Button variant={"ghost"}>Replace media</Button>
            </FileInputPopover>
          )}
          <Button
            variant={"ghost"}
            onClick={() => {
              setContent(
                content === "initial"
                  ? "secondary"
                  : content === "secondary"
                  ? "tertiary"
                  : content === "tertiary"
                  ? "quaternary"
                  : "quaternary"
              );
              if (
                content === "quaternary" &&
                files &&
                description.trim() !== ""
              ) {
                handleStoreFiles();
              } else if (
                content === "quaternary" &&
                (!files || description.trim() === "")
              ) {
                console.log("check");
                toast.error("Please check your description or files!");
              }
            }}
            className={`${content === "initial" && `ml-auto`}`}
            disabled={content === "secondary" && !files}
          >
            {content !== "quaternary" ? "Next 👌" : `Save ${type}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StoreMedia;
