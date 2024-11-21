import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RadioSelectType = ({
  type,
  setType,
  setFiles,
}: {
  type: any;
  setType: any;
  setFiles: any;
}) => {
  const handleSetType = (typeChange: any) => {
    setType(typeChange);
    setFiles(null);
  };

  return (
    <RadioGroup defaultValue={type} className="w-full">
      <div
        onClick={() => handleSetType("post")}
        className={`${
          type === "post" &&
          `shadow-md bg-[url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2l4ZXZoNG9pMnM0dnNhaDNiam1waGYzZWJsZ2VpeXNra3kyM3g1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThuWcaa4U4XZQDgvm/giphy.webp')] bg-center backdrop-blur-lg`
        } flex items-center space-x-2 w-full border-white/20 rounded-md hover:bg-slate-800/20 p-4 `}
      >
        <RadioGroupItem value="post" id="post" />
        <Label
          className={type === "post" ? `font-bold text-black` : ``}
          htmlFor="post"
        >
          Add new post
        </Label>
      </div>
      <div
        onClick={() => handleSetType("news")}
        className={`${
          type === "news" &&
          `shadow-md bg-[url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2l4ZXZoNG9pMnM0dnNhaDNiam1waGYzZWJsZ2VpeXNra3kyM3g1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThuWcaa4U4XZQDgvm/giphy.webp')] bg-bottom backdrop-blur-lg`
        } flex items-center space-x-2 w-full border-white/20 rounded-md hover:bg-slate-800/20 p-4 `}
      >
        <RadioGroupItem value="news" id="news" />
        <Label
          className={type === "news" ? `font-bold text-black` : ``}
          htmlFor="news"
        >
          Share hot news
        </Label>
      </div>
      <div
        onClick={() => handleSetType("reel")}
        className={`${
          type === "reel" &&
          `shadow-md bg-[url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2l4ZXZoNG9pMnM0dnNhaDNiam1waGYzZWJsZ2VpeXNra3kyM3g1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThuWcaa4U4XZQDgvm/giphy.webp')] bg-center backdrop-blur-lg`
        } flex items-center space-x-2 w-full border-white/20 rounded-md hover:bg-slate-800/20 p-4 `}
      >
        <RadioGroupItem value="reel" id="reel" />
        <Label
          className={type === "reel" ? `font-bold text-black` : ``}
          htmlFor="reel"
        >
          Upload new reel
        </Label>
      </div>
    </RadioGroup>
  );
};

export default RadioSelectType;
