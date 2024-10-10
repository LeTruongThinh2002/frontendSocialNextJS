"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useRef, useState } from "react";

const ImageLargeView = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({ x: (0.5 - x) * 100, y: (0.5 - y) * 100 });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[90vw] max-h-[90vh] overflow-hidden p-0 border-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          ref={containerRef}
          className={`relative w-full h-[80vh] ${
            isZoomed ? "cursor-move" : "cursor-zoom-in"
          } overflow-hidden`}
          onClick={toggleZoom}
          onMouseMove={isZoomed ? handleMouseMove : undefined}
        >
          <Image
            src={url}
            alt="image"
            fill
            className={`object-contain transition-transform duration-300`}
            style={{
              transform: isZoomed
                ? `scale(2) translate(${position.x / 2}%, ${position.y / 2}%)`
                : "scale(1)",
              transformOrigin: "center",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLargeView;
