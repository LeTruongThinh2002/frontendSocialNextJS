"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BiSolidCheckShield, BiSolidShieldX } from "react-icons/bi";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";

const VerifyEmail = () => {
  const route = useRouter();
  const url = usePathname();
  const id = url.split("/")[2];
  const token = url.split("/")[3];

  const router = useSearchParams();
  const expires = router.get("expires");
  const signature = router.get("signature");

  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    verifyEmail();
  }, [id, token, router]);

  const verifyEmail = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://spider.jp/api/auth/email/verify/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expires, signature }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setCheck(false);
        throw new Error(responseData.message || "An unknown error occurred");
      }

      setCheck(true);
      console.log("Success:", responseData);
      alert("Verify successfully");
      setLoading(false);
    } catch (error: any) {
      setCheck(false);
      setLoading(false);

      console.error("Error:", error.message);
      toast.error("Error reset password account!", {
        description: error.message,
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div className="text-center">
      {loading ? (
        <div className="spinner-loading"></div>
      ) : check ? (
        <>
          <div className="flex justify-center py-2">
            <BiSolidCheckShield className="text-yellow-500" size={"3em"} />
          </div>
          <div>Email verify successfully!</div>
        </>
      ) : (
        <>
          <div className="flex justify-center py-2">
            <BiSolidShieldX className="text-red-500" size={"3em"} />
          </div>
          <div>
            Email verify failed. Please try again refresh page or try a new link
            verify!
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
