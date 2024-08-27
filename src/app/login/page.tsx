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
import { loginUserAction } from "@/redux/auth/auth.action";
import { AppDispatch, RootState } from "@/redux/store";

// Define the schema for the form using Zod
export const FormSchemaLogin = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters." })
    .max(255, { message: "Email must be at most 255 characters" })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(255, { message: "Password must be at most 255 characters." }),
});

const Login = () => {
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof FormSchemaLogin>>({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchemaLogin>) => {
    // Dispatch the login action and handle the result
    const resultAction = await dispatch(loginUserAction(data));

    if (loginUserAction.rejected.match(resultAction)) {
      // If login fails, show error message
      toast.error("Login error!", {
        description: resultAction.payload as string,
        action: {
          label: "Hide",
          onClick: () => {},
        },
      });
    } else if (loginUserAction.fulfilled.match(resultAction)) {
      // If login succeeds, redirect to the homepage or another route
      route.push("/home"); // Adjust the route as needed
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
        <Button
          className="w-full hover:bg-green-600 border-green-600"
          type="submit"
          variant={"outline"}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
            href={"/forgot-password"}
          >
            Forgot password!
          </Link>
        </Button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </Form>
  );
};

export default Login;
