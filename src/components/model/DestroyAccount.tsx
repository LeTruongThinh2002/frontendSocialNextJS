"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { destroyAccountAction } from "@/redux/auth/auth.action";

const DestroyAccount = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const handleDestroy = async () => {
    try {
      await dispatch(destroyAccountAction({ userId: user?.id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            {children}
          </div>
        </DialogTrigger>
        <DialogContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DialogTitle>Destroy Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to destroy your account?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={handleDestroy}
              disabled={loading}
            >
              {loading ? "Destroying..." : "Destroy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DestroyAccount;
