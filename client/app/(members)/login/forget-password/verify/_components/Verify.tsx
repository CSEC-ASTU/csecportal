/*   */
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

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function VerifyPasswordOtp() {
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();

  const userEmail = useSelector((state: RootState) => state?.auth?.user?.email);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!userEmail) {
        toast.error("Unable to verify: missing email.");
        return;
      }

      await verifyOtp({ email: userEmail, otp: data.pin }).unwrap();
      toast.success("Verification successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed.");
    }
  }

  async function handleResendOtp() {
    try {
      await resendOtp({ email: userEmail }).unwrap();
      toast.success("OTP sent again!");
      router.push("/dashboard/home");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend OTP.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col gap-3 items-start"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base lg:text-xl font-bold tracking-[1px]">
                Verify Your Account
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
                    <FormDescription>
                      Please enter the verification code we sent to your email.
                      {mounted && userEmail ? (
                        <div className="text-sm">Sent to: {userEmail}</div>
                      ) : null}
                    </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <span
          className="font-bold tracking-[1px] text-primary cursor-pointer"
          onClick={handleResendOtp}
        >
          {isResending ? "Sending..." : "Send Code Again"}
        </span>

        <Button type="submit" disabled={isVerifying}>
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}
