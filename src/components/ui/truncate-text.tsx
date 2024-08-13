import { useState, useRef, useEffect } from "react";

interface TruncatedTextProps {
  text: string;
  maxWidth?: string | number; // Chiều rộng tối đa của phần tử
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxWidth = "100%",
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        // Tạo một phần tử clone để đo chiều rộng tự nhiên của văn bản
        const clone = textRef.current.cloneNode(true) as HTMLElement;
        clone.style.visibility = "hidden";
        clone.style.whiteSpace = "nowrap";
        document.body.appendChild(clone);

        const naturalWidth = clone.offsetWidth;
        document.body.removeChild(clone);

        // Kiểm tra nếu chiều rộng tự nhiên của văn bản lớn hơn chiều rộng của phần tử chứa
        if (naturalWidth > textRef.current.offsetWidth) {
          setIsTruncated(true);
        } else {
          setIsTruncated(false);
        }
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [text]);

  return (
    <div style={{ maxWidth }}>
      <p
        ref={textRef}
        style={{
          whiteSpace: showFullText ? "normal" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        className="text-sm font-light"
      >
        {text}
      </p>
      {isTruncated && (
        <button
          className="text-sm font-light cursor-pointer text-gray-400 hover:underline"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "See less" : "See more..."}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
