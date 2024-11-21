import { useState, useRef, useEffect } from "react";

interface TruncatedTextProps {
  text: string;
  textSize: string;
  maxWidth?: string | number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxWidth = "100%",
  textSize = "text-sm",
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const clone = textRef.current.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.whiteSpace = "nowrap";
        clone.style.width = `${maxWidth}`;
        document.body.appendChild(clone);

        const isOverflowing =
          clone.scrollWidth > clone.clientWidth ||
          clone.scrollHeight > clone.clientHeight;
        setIsTruncated(isOverflowing);

        if (showFullText) {
          setIsTruncated(true);
        }

        document.body.removeChild(clone);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [text, maxWidth, showFullText]);

  return (
    <div className={`max-w-[${maxWidth}]`}>
      <div
        ref={textRef}
        className={
          textSize +
          ` font-light whitespace-${
            showFullText ? "normal" : "nowrap"
          } overflow-hidden`
        }
        style={{ maxHeight: showFullText ? "none" : "1.2em" }}
      >
        <div className="prose" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      {isTruncated && (
        <button
          className={
            textSize +
            ` font-light cursor-pointer text-gray-400 hover:underline`
          }
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "See less" : "See more..."}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
