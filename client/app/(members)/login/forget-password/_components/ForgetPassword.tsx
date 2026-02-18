/*   */
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/validation/login";
import { useRequestPasswordResetMutation } from "@/lib/features/api";

type FormValues = z.infer<typeof formSchema>;

export function ForgetPassword() {
  const router = useRouter();
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await requestPasswordReset(values).unwrap();

      toast.success("Password reset email sent!", {
        description: "We've sent a verification code to your email address.",
      });

      router.push("/login/forget-password/verify");
    } catch (error) {
      toast.error("Failed to send reset email", {
        description: (error as any)?.data?.message || "Please try again later.",
      });
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 md:p-10 lg:p-12 space-y-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter your email to receive a verification code
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="h-12 px-4 py-3 rounded-lg border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending code...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
