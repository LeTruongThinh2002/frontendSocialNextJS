"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { RiSettings3Fill } from "react-icons/ri";
import SettingProfile from "@/components/ui/setting-profile";

const Settings = () => {
  const { userById } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {userById?.id === user?.id ? (
        <SettingProfile>
          <RiSettings3Fill
            size={"1.5em"}
            className={`text-slate-800 spinner`}
          />
        </SettingProfile>
      ) : (
        <></>
      )}
    </>
  );
};

export default Settings;
