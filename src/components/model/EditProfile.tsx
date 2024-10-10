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
import editProfileSchema from "@/schema/editProfileSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Input } from "../ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { updateUserProfileAction } from "@/redux/user/user.action";
import { uploadToCLoudinary } from "@/services/uploadToCloudinary";

const EditProfile = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { userAuth, loading } = useSelector((state: RootState) => state.user);
  const [avatar, setAvatar] = useState<string | null>(userAuth?.avatar || null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [background, setBackground] = useState<string | null>(
    userAuth?.background || null
  );
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      first_name: userAuth?.first_name,
      last_name: userAuth?.last_name,
      avatar: userAuth?.avatar,
      background: userAuth?.background,
      date_of_birth: userAuth?.date_of_birth,
      country: userAuth?.country,
    },
  });

  const handleFileChange = async (
    file: File,
    setImage: (value: string | null) => void,
    setLoading: (value: boolean) => void
  ): Promise<void> => {
    if (!file) {
      toast.error("Please choose a file");
      return;
    }

    try {
      setLoading(true);
      const result = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setImage(result);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Error reading file");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileChange(file, setAvatar, setAvatarLoading);
    }
  };

  const handleBackgroundChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileChange(file, setBackground, setBackgroundLoading);
    }
  };

  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    if (avatar !== userAuth?.avatar) {
      data.avatar = (await uploadToCLoudinary([avatar], "image"))[0];
    }
    if (background !== userAuth?.background) {
      data.background = (await uploadToCLoudinary([background], "image"))[0];
    }
    console.log(data);
    await dispatch(
      updateUserProfileAction({ userId: userAuth?.id, userData: data })
    );
    setIsOpen(false);
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
          }
        }}
        className="max-h-[90vh] overflow-y-auto bg-slate-800"
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit your profile information here. About first name, last name,
            avatar, background, date of birth and country.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your first name.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your last name.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e);
                        handleAvatarChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload your avatar image.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <div>
              {avatarLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-loading" />
                </div>
              ) : avatar ? (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  onError={() => console.error("Failed to load avatar")}
                  unoptimized
                />
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e);
                        handleBackgroundChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload your background image.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <div>
              {backgroundLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-loading" />
                </div>
              ) : background ? (
                <Image
                  src={background}
                  alt="background"
                  width={100}
                  height={100}
                  onError={() => console.error("Failed to load background")}
                  unoptimized
                />
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your date of birth.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Your country" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your country.</FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Close
                </Button>
              </DialogClose>
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600"
                disabled={loading}
                type="submit"
              >
                {loading ? <div className="spinner-loading" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
