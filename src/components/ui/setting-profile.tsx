import { LiaUserEditSolid } from "react-icons/lia";
import { MdAlternateEmail } from "react-icons/md";
import { PiLockOpen, PiTrash } from "react-icons/pi";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar";
import EditProfile from "../model/EditProfile";
import ChangeEmail from "../model/ChangeEmail";
import ChangePassword from "../model/ChangePassword";
import DestroyAccount from "../model/DestroyAccount";

const SettingProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menubar className="absolute top-5 right-0 w-fit">
      <MenubarMenu>
        <MenubarTrigger className="p-2 border-0 cursor-pointer  bg-white hover:bg-slate-300 rounded-full">
          {children}
        </MenubarTrigger>
        <MenubarContent className="bg-slate-800">
          <MenubarItem>
            <EditProfile>
              <span className="flex flex-row items-center justify-center">
                Edit info{" "}
                <MenubarShortcut>
                  <LiaUserEditSolid />
                </MenubarShortcut>
              </span>
            </EditProfile>
          </MenubarItem>
          <MenubarItem>
            <ChangeEmail>
              <span className="flex flex-row items-center justify-center">
                Change email{" "}
                <MenubarShortcut>
                  <MdAlternateEmail />
                </MenubarShortcut>
              </span>
            </ChangeEmail>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <ChangePassword>
              <span className="flex flex-row items-center justify-center">
                Change password{" "}
                <MenubarShortcut>
                  <PiLockOpen />
                </MenubarShortcut>
              </span>
            </ChangePassword>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-red-500">
            <DestroyAccount>
              <span className="flex flex-row items-center justify-center">
                <p>Delete account</p>
                <MenubarShortcut className="ml-auto">
                  <PiTrash />
                </MenubarShortcut>
              </span>
            </DestroyAccount>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingProfile;
