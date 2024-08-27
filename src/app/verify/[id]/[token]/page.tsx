"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { BiSolidCheckShield, BiSolidShieldX } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { verifyEmailAction } from "@/redux/auth/auth.action";

const VerifyEmail = () => {
  const route = useRouter();
  const url = usePathname();
  const id = url.split("/")[2];
  const token = url.split("/")[3];
  const router = useSearchParams();
  const expires = router.get("expires");
  const signature = router.get("signature");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id && token && expires && signature) {
      dispatch(verifyEmailAction({ id, token, expires, signature }));
    }
  }, [id, token, expires, signature, dispatch]);

  useEffect(() => {
    if (error && expires && signature) {
      toast.error("Verification failed", {
        description: error,
        action: {
          label: "Retry",
          onClick: () => {
            dispatch(verifyEmailAction({ id, token, expires, signature }));
          },
        },
      });
    }

    if (!error) {
      toast.success("Verification successful", {
        description: "Email verified successfully",
        action: {
          label: "Hide",
          onClick: () => {},
        },
      });
    }
  }, [error, dispatch]);

  return (
    <div className="text-center">
      {loading ? (
        <div className="spinner-loading"></div>
      ) : !error ? (
        <>
          <div className="flex justify-center py-2">
            <BiSolidCheckShield className="text-yellow-500" size={"3em"} />
          </div>
          <div>Email verified successfully!</div>
        </>
      ) : (
        <>
          <div className="flex justify-center py-2">
            <BiSolidShieldX className="text-red-500" size={"3em"} />
          </div>
          <div>
            Email verification failed. Please try refreshing the page or using a
            new verification link.
          </div>
        </>
      )}
      <Button
        variant={"outline"}
        className="mt-3 hover:bg-green-600 border-green-600"
        onClick={() => {
          route.push("/login");
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default VerifyEmail;
