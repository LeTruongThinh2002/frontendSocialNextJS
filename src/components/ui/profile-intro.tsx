import TruncatedText from "./truncate-text";
import Link from "next/link";
import { FaCakeCandles } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";

const ProfileIntro = () => {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-white/10 p-4">
      <span className="font-bold text-lg">Intro</span>
      <div className="py-1 flex flex-col gap-1">
        <TruncatedText
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.`}
        />
        <div className="flex flex-row gap-1 text-sm items-center">
          <FaCakeCandles />
          <span>15-10-2002</span>
        </div>
        <div className="flex flex-row gap-1 text-sm items-center">
          <MdLocationOn />
          <span>Vietnamese</span>
        </div>
        <div className="flex flex-row gap-1 text-sm items-center">
          <FaGraduationCap />
          <span>Trường cao đẳng kỹ thuật Cao Thắng</span>
        </div>
        <div className="flex flex-row gap-1 text-sm items-center">
          <FaLink />
          <Link
            className="hover:underline hover:text-sky-500 text-sm "
            href="https://github.com/LeTruongThinh2002"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntro;
