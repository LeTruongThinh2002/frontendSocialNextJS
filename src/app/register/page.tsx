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
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";

// Define the schema for the form using Zod
export const FormSchemaRegister = z
  .object({
    first_name: z
      .string()
      .max(255, { message: "First name must be at most 255 characters." })
      .min(1, { message: "First name must be at most 1 character." }),
    last_name: z
      .string()
      .max(255, { message: "Last name must be at most 255 characters." })
      .min(1, { message: "Last name must be at least 1 character." }),
    email: z
      .string()
      .max(255, { message: "Email must be at most 255 characters." })
      .email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
    date_of_birth: z.date({ message: "Invalid date of birth" }),
    country: z
      .string()
      .min(1, { message: "Please enter a valid country" })
      .max(255, { message: "Country must be at least 255 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password don't match",
    path: ["confirm_password"],
  });
const Register = () => {
  const route = useRouter();
  // Use the form hook with the defined schema
  const form = useForm<z.infer<typeof FormSchemaRegister>>({
    resolver: zodResolver(FormSchemaRegister),
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

  const onSubmit = async (data: z.infer<typeof FormSchemaRegister>) => {
    try {
      const res = await register(data);
      if (res) {
        toast.success("Register success!", {
          description: "Notification",
          action: {
            label: "Hide",
            onClick: () => {},
          },
        });
        route.push("/home");
      } else {
        toast.error("Register failed!", {
          description: "Notification",
          action: {
            label: "Hide",
            onClick: () => {},
          },
        });
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Error registering account!", {
        description: error.message,
        action: {
          label: "Hide",
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Hitler" {...field} />
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
                <Input placeholder="Adolf" {...field} />
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
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your confirm password.</FormDescription>
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
          variant={"outline"}
        >
          Register
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

export default Register;
