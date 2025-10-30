"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

const credentialsFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpFormSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function LoginPage() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const credentialsForm = useForm<z.infer<typeof credentialsFormSchema>>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onVerifyCredentials(
    data: z.infer<typeof credentialsFormSchema>,
  ) {
    setLoading(true);
    setError("");

    try {
      // First verify the password
      const { error: passwordError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (passwordError) {
        setError(passwordError.message || "Invalid email or password");
        toast.error(passwordError.message || "Invalid email or password");
        return;
      }

      // If password is correct, send OTP
      const { error: otpError } = await authClient.emailOtp.sendVerificationOtp(
        {
          email: data.email,
          type: "sign-in" as const,
        },
      );

      if (otpError) {
        setError(otpError.message || "Failed to send OTP");
        toast.error(otpError.message || "Failed to send OTP");
        return;
      }

      setEmail(data.email);
      setStep("otp");
      toast.success("OTP sent to your email");
    } catch (err) {
      const errorMessage = "Authentication failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyOTP(data: z.infer<typeof otpFormSchema>) {
    setLoading(true);
    setError("");

    try {
      const { error: verifyOTPError } = await authClient.signIn.emailOtp({
        email: email,
        otp: data.otp,
      });

      if (verifyOTPError) {
        setError(verifyOTPError.message || "Invalid OTP");
        toast.error(verifyOTPError.message || "Invalid OTP");
        return;
      }

      toast.success("Login successful");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMessage = "OTP verification failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 md:min-h-[450px]">
          <Card className="flex-1 overflow-hidden p-0">
            <CardContent className="grid flex-1 p-0 md:grid-cols-2">
              {step === "credentials" ? (
                <div className="flex flex-col gap-6 p-6 md:p-8">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your FleetX account
                    </p>
                  </div>
                  <Form {...credentialsForm}>
                    <form
                      onSubmit={credentialsForm.handleSubmit(
                        onVerifyCredentials,
                      )}
                      className="flex flex-col gap-6"
                    >
                      <FormField
                        control={credentialsForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={credentialsForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel>Password</FormLabel>
                              <Link
                                href="#"
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                              >
                                Forgot?
                              </Link>
                            </div>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {error && (
                        <FieldDescription className="text-destructive text-center">
                          {error}
                        </FieldDescription>
                      )}
                      <Button type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Continue"}
                      </Button>
                    </form>
                  </Form>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link href="#">Sign up</Link>
                  </FieldDescription>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 md:p-8">
                  <FieldGroup className="w-full">
                    <Field className="items-center text-center">
                      <h1 className="text-2xl font-bold">
                        Enter verification code
                      </h1>
                      <p className="text-muted-foreground text-sm text-balance">
                        We sent a 6-digit code to {email}
                      </p>
                    </Field>
                    <Form {...otpForm}>
                      <form
                        onSubmit={otpForm.handleSubmit(onVerifyOTP)}
                        className="flex w-full flex-col gap-6"
                      >
                        <Field className="flex flex-col items-center gap-4">
                          <FieldLabel htmlFor="otp" className="sr-only">
                            Verification code
                          </FieldLabel>
                          <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem className="w-full items-center flex justify-center">
                                <FormControl className="">
                                  <InputOTP
                                    maxLength={6}
                                    id="otp"
                                    required
                                    containerClassName="gap-4"
                                    {...field}
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {error && (
                            <FieldDescription className="text-destructive w-full items-center flex justify-center">
                              {error}
                            </FieldDescription>
                          )}
                          <FieldDescription className="text-center">
                            Enter the 6-digit code sent to your email.
                          </FieldDescription>
                        </Field>
                        <div className="flex flex-col gap-4">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                          >
                            {loading ? "Verifying..." : "Verify OTP"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setStep("credentials");
                              setError("");
                              setEmail("");
                              credentialsForm.reset();
                              otpForm.reset();
                            }}
                            disabled={loading}
                          >
                            Back
                          </Button>
                          <FieldDescription className="text-center">
                            Didn&apos;t receive the code?{" "}
                            <Link
                              href="#"
                              onClick={async (e) => {
                                e.preventDefault();
                                const { error: otpError } =
                                  await authClient.emailOtp.sendVerificationOtp(
                                    {
                                      email: email,
                                      type: "sign-in",
                                    },
                                  );
                                if (otpError) {
                                  toast.error(
                                    otpError.message || "Failed to send OTP",
                                  );
                                } else {
                                  toast.success("OTP resent to your email");
                                }
                              }}
                            >
                              Resend
                            </Link>
                          </FieldDescription>
                        </div>
                      </form>
                    </Form>
                  </FieldGroup>
                </div>
              )}
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/fleetx_logo.png"
                  width={500}
                  height={500}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="text-center">
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
