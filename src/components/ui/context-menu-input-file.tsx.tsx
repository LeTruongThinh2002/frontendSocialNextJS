import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const ContextMenuInputFile = ({
  children,
  type,
  setFiles,
}: {
  children: React.ReactNode;
  type: any; // Cụ thể các loại type
  setFiles: any;
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
      setFiles(files);
    }
  };

  // Thiết lập thuộc tính cho file input dựa vào type
  const getFileInputAttributes = () => {
    switch (type) {
      case "news":
        return { accept: "image/*,video/*", multiple: false }; // Chỉ một file ảnh hoặc video
      case "reel":
        return { accept: "video/*", multiple: false }; // Chỉ một file video
      case "post":
      default:
        return { accept: "image/*,video/*", multiple: true }; // Chấp nhận nhiều file ảnh và video
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div onClick={openFileInput}>{children}</div>
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

export default ContextMenuInputFile;
