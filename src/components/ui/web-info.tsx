import Link from "next/link";

const WebInfo = () => {
  return (
    <div className="flex flex-col gap-8 mt-5 text-sm font-light text-gray-500">
      <div className="flex flex-row gap-2">
        <Link
          className="hover:underline"
          href="https://github.com/LeTruongThinh2002"
          target="_blank"
        >
          Github
        </Link>
        {" - "}
        <Link
          className="hover:underline"
          href="https://join.skype.com/invite/uR360VfBGa4e"
          target="_blank"
        >
          Skype
        </Link>
        {" - "}

        <Link
          className="hover:underline"
          href="https://www.facebook.com/le.truong.thinh.2002/"
          target="_blank"
        >
          Facebook
        </Link>
      </div>
      <span className="uppercase">© 2024 Instagram from Meta</span>
    </div>
  );
};

export default WebInfo;
