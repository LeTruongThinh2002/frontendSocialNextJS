"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/router";

// Define the schema for the form using Zod
const FormSchema = z
  .object({
    token: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(255, { message: "Password must be at most 255 characters" }),
    password_confirmation: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." })
      .max(255, { message: "Confirm password must be at most 255 characters" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Confirm password don't match",
    path: ["password_confirmation"],
  });

const ResetPassword = () => {
  const route = useRouter();
  const router = useSearchParams();
  const token = router.get("token");
  const email = router.get("email");

  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  if (!token || !email) {
    route.push("/login");
    redirect("/login");
  }

  useEffect(() => {
    if (token && email) {
      form.setValue("token", token as string);
      form.setValue("email", email as string);
    }
  }, [token, email, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);

      const response = await fetch("http://spider.jp/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "An unknown error occurred");
      }

      console.log("Success:", responseData);
      alert("Password reset successfully");
      route.push("/login");
    } catch (error: any) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input
                  disabled
                  type="hidden"
                  defaultValue={token}
                  placeholder={token}
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                Please enter your email address.
              </FormDescription> */}
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled
                  defaultValue={email}
                  placeholder={email}
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                Please enter your email address.
              </FormDescription> */}
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
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your confirm password.</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          className="w-full hover:bg-green-600 border-green-600"
          type="submit"
          variant={"outline"}
        >
          Reset password
        </Button>
        <Button asChild>
          <Link
            className="text-sky-500 hover:underline hover:text-sky-600"
            href={"/register"}
          >
            Register?
          </Link>
        </Button>
        <Button asChild>
          <Link
            className="text-sky-500 hover:underline hover:text-sky-600"
            href={"/login"}
          >
            Login?
          </Link>
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
