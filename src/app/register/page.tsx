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
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";
import registerSchema from "@/schema/registerSchema";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      date_of_birth: new Date(),
      country: "",
    },
  });

  // Submit form
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      // Dispatch register user action
      const resultAction = await dispatch(registerUserAction(data));

      // Check if the action is fulfilled
      if (registerUserAction.fulfilled.match(resultAction)) {
        toast.success("Registration successful!", {
          description: "You can now log in to your account.",
        });
        router.push("/home");
      } else {
        toast.error("Registration failed", {
          description: resultAction.error?.message || "Unknown error occurred",
        });
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Error registering account", {
        description: error.message || "Unknown error occurred",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>Enter your first name</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>Enter your last name</FormDescription>
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
                <Input placeholder="yourname@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your email address.
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
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Confirm your password.</FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="w-fit"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  max={new Date().toISOString().split("T")[0]}
                />
              </FormControl>
              <FormDescription>Enter your date of birth.</FormDescription>
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
                <Input placeholder="US..." {...field} />
              </FormControl>
              <FormDescription>Enter your country.</FormDescription>
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
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button variant="link" asChild>
          <Link href="/login">Already have an account? Log in</Link>
        </Button>
      </form>
      {error && error !== "No refresh token found. Please log in again." && (
        <div className="text-red-600 mt-4">{error}</div>
      )}
    </Form>
  );
};

export default Register;
