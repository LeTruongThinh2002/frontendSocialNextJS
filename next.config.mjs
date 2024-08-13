/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.pexels.com",
      "i.gifer.com",
      "images.pexels.com",
      "images.unsplash.com",
    ], // Thêm hostname của hình ảnh bên ngoài vào đây
  },
};

export default nextConfig;
