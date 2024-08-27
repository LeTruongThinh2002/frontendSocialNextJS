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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";
import resetPasswordSchema from "@/schema/resetPasswordSchema";
import LoadingCircle from "@/components/ui/loadingCircle";

const ResetPassword = () => {
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // State để lưu giá trị token và email
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Sử dụng form hook với schema xác định
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Lấy giá trị token và email từ URL sau khi trang được render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    const emailParam = params.get("email");

    if (!tokenParam || !emailParam) {
      route.push("/login");
    } else {
      setToken(tokenParam);
      setEmail(emailParam);
      form.setValue("token", tokenParam);
      form.setValue("email", emailParam);
    }
  }, [route, form]);

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      const resultAction = await dispatch(resetPasswordAction(data));
      const result = resetPasswordAction.fulfilled.match(resultAction);

      if (result) {
        toast.success("Notification!", {
          description: "Password reset successfully",
        });
        route.push("/login");
      } else {
        toast.error("Notification!", {
          description: "Password reset failed",
        });
      }
    } catch (error: any) {
      toast.error("Error resetting password!", {
        description: error.message,
      });
    }
  };

  if (!token || !email) {
    return <LoadingCircle />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled
                  type="hidden"
                  placeholder={token || ""}
                  {...field}
                />
              </FormControl>
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
                <Input disabled placeholder={email || ""} {...field} />
              </FormControl>
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
              <FormDescription>Enter your new password.</FormDescription>
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
              <FormDescription>Confirm your new password.</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          className="w-full hover:bg-green-600 border-green-600"
          type="submit"
          variant={"outline"}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset password"}
        </Button>
        {error && <div className="text-red-600 mt-4">{error}</div>}
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
