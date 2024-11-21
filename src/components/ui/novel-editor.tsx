import { uploadToCLoudinary } from "@/services/uploadToCloudinary";
import { Editor } from "novel-lightweight";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

const NovelEditor = ({
  description,
  setDescription,
  editor,
  setEditor,
  type = "post",
}: any) => {
  const [content, setContent] = useState("");
  const [contentEditor, setContentEditor] = useState<any>();

  const handleSetContent = () => {
    setDescription(content); // Gọi hàm setContent từ cha
    setEditor(contentEditor);
  };
  const handleSetClearContent = () => {
    setDescription(""); // Gọi hàm setContent từ cha
    setEditor("");
  };

  return (
    <div className="max-h-[70vh] max-w-[80vw] overflow-y-auto">
      {type === "post" ? (
        <Editor
          className="max-h-[70vh] max-w-full overflow-y-auto"
          defaultValue={editor}
          disableLocalStorage={true}
          onUpdate={(editor) => {
            if (editor) {
              setContent(editor.getHTML()); // Lấy nội dung Markdown
              setContentEditor(editor.getJSON());
            }
          }}
          handleImageUpload={async (file) => {
            const image = (await uploadToCLoudinary([file], "image"))[0];
            return image || "www.example.com/failed-upload.png";
          }}
        />
      ) : (
        <Input
          defaultValue={description}
          onChange={(e) => {
            setContent(e.target.value);
            setContentEditor(e.target.value);
          }}
          placeholder={`Enter your ${type} description...`}
        />
      )}
      <div className="flex flex-row justify-between">
        <Button onClick={handleSetContent} variant={"ghost"}>
          Save
        </Button>
        <Button onClick={handleSetClearContent} variant={"ghost"}>
          Clear
        </Button>
      </div>
      <div
        className=" max-h-[70vh] max-w-[80vw] overflow-y-auto prose"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default NovelEditor;
