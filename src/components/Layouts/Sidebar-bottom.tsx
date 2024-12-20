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
import { IoIosAddCircleOutline } from "react-icons/io";
import StoreMedia from "../model/StoreMedia";
import { BiSearchAlt } from "react-icons/bi";
import SearchUser from "../model/SearchUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SidebarBottom = ({ ...props }) => {
  const path = usePathname();
  const { userAuth } = useSelector((state: RootState) => state.user);

  return (
    <div {...props}>
      <div className="border-t border-gray-700 w-full h-full flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-2">
            {/* <NavigationMenuItem></NavigationMenuItem> */}
            <NavigationMenuItem>
              <Link href="/home" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/home" && `text-sky-400`
                  }`}
                >
                  <TbHomeEco size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/reel" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/reel" && `text-sky-400`
                  }`}
                >
                  <PiFilmReel size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <StoreMedia>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/add" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <IoIosAddCircleOutline size={"2em"} />
                </NavigationMenuLink>
              </StoreMedia>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <SearchUser>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/search" ? `text-sky-400` : `text-white`
                  }`}
                >
                  <BiSearchAlt size={"2em"} />
                </NavigationMenuLink>
              </SearchUser>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/message" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    path === "/message" && `text-sky-400`
                  }`}
                >
                  <TiMessages size={"2em"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile/1" legacyBehavior passHref>
                <NavigationMenuLink>
                  <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
                    <AvatarImage
                      className="rounded-full border-2 border-black "
                      src={userAuth?.avatar}
                      alt={userAuth?.first_name}
                    />
                    <AvatarFallback>
                      {userAuth?.first_name[0]}
                      {userAuth?.last_name[0]}
                    </AvatarFallback>
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

export default SidebarBottom;
