import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const SpaceInputFile = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "post" | "news" | "reel"; // Cụ thể các loại type
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Hàm mở input file
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Xử lý khi chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("Selected files:", files);
      // Thực hiện các thao tác cần thiết với files tại đây
    }
  };

  // Thiết lập thuộc tính cho file input dựa vào type
  const getFileInputAttributes = () => {
    switch (type) {
      case "post":
        return { accept: "image/*,video/*", multiple: true }; // Chấp nhận nhiều file ảnh và video
      case "news":
        return { accept: "image/*,video/*", multiple: false }; // Chỉ một file ảnh hoặc video
      case "reel":
        return { accept: "video/*", multiple: false }; // Chỉ một file video
      default:
        return {};
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          onClick={openFileInput}
          className="cursor-pointer flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
        >
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <p className="text-sm">Chọn tệp từ thiết bị của bạn</p>
      </ContextMenuContent>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Ẩn input file
        {...getFileInputAttributes()} // Áp dụng thuộc tính cho input file
      />
    </ContextMenu>
  );
};

export default SpaceInputFile;
