import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { TbHomeEco } from "react-icons/tb";
import { PiFilmReel } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SidebarLeft = ({ ...props }) => {
  const path = usePathname();

  return (
    <div {...props}>
      <div className="w-full h-full flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col justify-center gap-10">
            <NavigationMenuItem>
              <Link href="/home" legacyBehavior passHref>
                <NavigationMenuLink>
                  <h1 className="text-2xl font-bold edu-vic-wa-nt-beginner-700 gradient-text">
                    Spider
                  </h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/home" legacyBehavior passHref>
                <NavigationMenuLink>
                  <span
                    className={`${navigationMenuTriggerStyle()} ${
                      path === "/home" ? `text-sky-400` : `text-white`
                    }`}
                  >
                    <TbHomeEco size={"2em"} />
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/reel" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/reel" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <PiFilmReel size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/message" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/message" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <TiMessages size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/add" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/add" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <IoIosAddCircleOutline size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/search" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/search" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <BiSearchAlt size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <NavigationMenuLink>
                  <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
                    <AvatarImage
                      className="rounded-full border-2 border-black "
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default SidebarLeft;
