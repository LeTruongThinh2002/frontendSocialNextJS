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
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";
import forgotPasswordSchema from "@/schema/forgotPasswordSchema";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const resultAction = await dispatch(forgotPasswordAction(data));
      if (forgotPasswordAction.fulfilled.match(resultAction)) {
        toast.success("Reset link sent", {
          description: "Please check your email for the reset link.",
        });
        router.push("/login");
      } else {
        toast.error("Failed to send reset link", {
          description: resultAction.payload as string,
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourname@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter the email address associated with your account.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          className="w-full hover:bg-green-600 border-green-600"
          type="submit"
          variant="outline"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset link"}
        </Button>
        <div className="flex justify-between">
          <Button variant="link" asChild>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </Form>
  );
};

export default ForgotPassword;
