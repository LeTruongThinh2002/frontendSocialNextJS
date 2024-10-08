const cloud_name = "dihtpxtxy";
const upload_preset = "spider";

export const uploadToCLoudinary = async (pics: any, fileType: string) => {
  if (pics && fileType && pics.length > 0) {
    // Check for empty array and file presence
    const promises = [];
    for (let i = 0; i < pics.length; i++) {
      const file = pics[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      formData.append("cloud_name", cloud_name);

      promises.push(
        fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
          { method: "post", body: formData }
        )
          .then((res) => res.json())
          .then((fileData) => {
            // Chuyển đổi URL từ http sang https
            const secureUrl = fileData.url.replace(/^http:/, "https:");
            return secureUrl;
          })
          .catch((error) => {
            console.error("Upload error for file:", file, error);
            // Handle individual upload errors (optional)
          })
      );
    }

    const uploadedUrls = await Promise.all(promises);
    return uploadedUrls;
  } else {
    return ["error"];
  }
};
