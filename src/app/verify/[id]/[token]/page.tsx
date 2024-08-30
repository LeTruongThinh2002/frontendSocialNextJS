"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BiSolidCheckShield, BiSolidShieldX } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { verifyEmailAction } from "@/redux/auth/auth.action";

const VerifyEmail = () => {
  const router = useRouter();
  const { id, token } = useParams();
  const searchParams = useSearchParams();
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  useEffect(() => {
    if (id && token && expires && signature) {
      dispatch(
        verifyEmailAction({
          id: id.toString(),
          token: token.toString(),
          expires,
          signature,
        })
      )
        .then(() => {
          setVerificationAttempted(true);
          toast.success("Verification successful", {
            description: "Email verified successfully",
          });
        })
        .catch((err) => {
          setVerificationAttempted(true);
          toast.error("Verification failed", {
            description: err.message,
            action: {
              label: "Retry",
              onClick: () => {
                dispatch(
                  verifyEmailAction({
                    id: Array.isArray(id) ? id[0] : id,
                    token: Array.isArray(token) ? token[0] : token,
                    expires,
                    signature,
                  })
                );
              },
            },
          });
        });
    }
  }, [id, token, expires, signature, dispatch]);

  return (
    <div className="text-center">
      {loading ? (
        <div className="spinner-loading">Verifying email...</div>
      ) : !error && verificationAttempted ? (
        <>
          <div className="flex justify-center py-2">
            <BiSolidCheckShield className="text-yellow-500" size={"3em"} />
          </div>
          <div>Email verified successfully!</div>
        </>
      ) : error ? (
        <>
          <div className="flex justify-center py-2">
            <BiSolidShieldX className="text-red-500" size={"3em"} />
          </div>
          <div>
            Email verification failed. Please try refreshing the page or using a
            new verification link.
          </div>
        </>
      ) : null}
      {!loading && (
        <Button
          variant={"outline"}
          className="mt-3 hover:bg-green-600 border-green-600"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </Button>
      )}
    </div>
  );
};

export default VerifyEmail;
