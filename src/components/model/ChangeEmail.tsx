"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Input } from "../ui/input";
import { toast } from "sonner";
import changeEmailSchema from "@/schema/changeEmailSchema";
import { changeEmailAction } from "@/redux/user/user.action";

const ChangeEmail = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { userAuth, loading } = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof changeEmailSchema>>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: userAuth?.email || "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changeEmailSchema>) => {
    try {
      await dispatch(
        changeEmailAction({
          userId: userAuth?.id,
          newEmail: data.newEmail,
          password: data.password,
        })
      );
      toast.success("Email updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update email");
    }
  };

  return (
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
        className="max-h-[90vh] overflow-y-auto bg-slate-800"
      >
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Enter your new email address below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your new email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your new email address.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your password to confirm the change.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button variant="ghost" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="default"
            className="bg-green-500 hover:bg-green-600"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading ? <div className="spinner-loading" /> : "Update Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmail;
