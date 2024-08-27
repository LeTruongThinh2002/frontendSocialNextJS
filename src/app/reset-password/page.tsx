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
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";
import resetPasswordSchema from "@/schema/resetPasswordSchema";
import LoadingCircle from "@/components/ui/loadingCircle";

const ResetPassword = () => {
  const route = useRouter();
  const router = useSearchParams();
  const token = router.get("token");
  const email = router.get("email");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Redirect to login if token or email is missing
  if (!token || !email) {
    route.push("/login");
    redirect("/login");
  }

  // Set token and email in the form's default values
  useEffect(() => {
    if (token && email) {
      form.setValue("token", token as string);
      form.setValue("email", email as string);
    }
  }, [token, email, form]);

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      const resultAction = await dispatch(resetPasswordAction(data));
      const result = resetPasswordAction.fulfilled.match(resultAction);

      if (result) {
        toast.success("Notification!", {
          description: "Password reset successfully",
          action: {
            label: "Hide",
            onClick: () => {},
          },
        });
        route.push("/login");
      } else {
        toast.error("Notification!", {
          description: "Password reset failed",
          action: {
            label: "Hide",
            onClick: () => {},
          },
        });
      }
    } catch (error: any) {
      toast.error("Error resetting password!", {
        description: error.message,
        action: {
          label: "Hide",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <Suspense fallback={<LoadingCircle />}>
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
                    defaultValue={token}
                    placeholder={token}
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
                  <Input
                    disabled
                    defaultValue={email}
                    placeholder={email}
                    {...field}
                  />
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
    </Suspense>
  );
};

export default ResetPassword;
