"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/lib/features/api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must be 6 characters.",
  }),
});

export function Verification() {
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();

  // Cleanly accessing state
  const userEmail = useSelector((state: RootState) => state?.auth?.user?.email);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!userEmail) {
        toast.error("Unable to verify: missing email.");
        return;
      }

      await verifyOtp({ email: userEmail, otp: data.pin }).unwrap();
      toast.success("Verification successful");
      router.push("/dashboard/home");
    } catch (error: any) {
      toast.error(error?.data?.error || error?.data?.message || "Invalid verification code.");
    }
  }

  async function handleResendOtp() {
    try {
      await resendOtp({ email: userEmail }).unwrap();
      toast.success("Code resent", { description: "Check your inbox." });
    } catch (error: any) {
      toast.error("Failed to resend");
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-10">

      {/* Header & Icon */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-4xl font-thin tracking-tighter text-text1">
            Verify <span className="font-normal">Account.</span>
          </h2>
            <p className="text-sm text-text2 font-light leading-relaxed">
            We&apos;ve sent a security code to
            <br />
            {mounted && userEmail ? (
              <span className="font-medium text-text1">{userEmail}</span>
            ) : (
              <span className="font-medium text-text1"> </span>
            )}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-3">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-16 text-2xl rounded-none font-light border-border  rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all text-text1"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription className="text-center text-xs font-light tracking-wide text-text2 uppercase">
                  Enter 6-digit code
                </FormDescription>
                <FormMessage className="text-center text-[10px]" />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-6">
            <Button
              type="submit"
              className=" font-bold tracking-[1px] bg-black text-white dark:bg-white dark:text-black p-3 rounded-full"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verifiy"
              )}
            </Button>

            <div className="text-center text-sm font-light text-text2">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="font-medium text-primary hover:underline underline-offset-4 transition-all"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
