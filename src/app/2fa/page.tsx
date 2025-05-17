"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAltStore } from "@/lib/zustand/userStore";
// import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useTwoFactor } from "@/modules/2fa/service/2fa";

const TwoFactorAuthPage = () => {
    const { organization } = useAltStore()
    const {
        form: {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          setValue,
          watch,
        },
        twoFactor,
        serverError,
        resendTwoFactorCode,
        resendLoading
      } = useTwoFactor();

     // Watch OTP value for controlled input
    const otpValue = watch("verificationCode");

    // Update form value when OTP changes
    const handleOtpChange = (value: string) => {
        setValue("verificationCode", value, { shouldValidate: true });
    };
    return (
        <ScrollArea className="w-full">
            <div className="flex pt-10 sm:items-center justify-center pb-5">
               <Card className="max-w-120 w-full p-2 max-sm:bg-transparent border-none sm:border sm:p-8">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <h2 className="text-2xl font-bold mb-1">{organization?.name}</h2>
                        <h2 className="text-md font-bold">Two factor Authentication</h2>
                        <p className="text-sm">Enter OTP to continue to your account</p>
                        {serverError && (
                        <p className="text-red-600 text-sm text-center mt-2">
                            {serverError}
                        </p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit(twoFactor)}>
                        <div className="mb-4">
                            <Label htmlFor="otp" className="mb-2">Enter OTP</Label>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                value={otpValue}
                                onChange={handleOtpChange}
                                id="verificationCode"
                            >
                                <InputOTPGroup className="w-full flex gap-1">
                                {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="w-full h-[52px] border rounded-md text-center text-lg"
                                    {...register("verificationCode", {
                                        required: "OTP is required",
                                        pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "OTP must be 6 digits",
                                        },
                                    })}
                                    />
                                ))}
                                </InputOTPGroup>
                            </InputOTP>
                            {errors.verificationCode && (
                                <p className="text-red-500 text-sm mt-2">
                                {errors.verificationCode.message}
                                </p>
                            )}
                        </div>

                        <div className="mt-10">
                            <Button
                                type="submit"
                                className="w-full h-10"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Verifying Code..." : "Continue"}
                            </Button>
                        </div>

                        <div className="text-center mt-3">
                            <p
                                className="cursor-pointer hover:underline duration-200"
                                onClick={() => resendTwoFactorCode()}
                                aria-disabled={resendLoading}
                            >{resendLoading ? "Loading..." : "Resend Code"}</p>
                        </div>

                        <div className="mt-5 flex flex-col justify-center gap-5 items-center">
                            <Separator/>
                            <p className="text-center max-w-90 text-xs dark:text-gray-300 text-gray-800">By logging in you agree to all <b>Amidarh</b> terms and conditions @ {organization?.name} 2025</p>
                        </div>
                    </form>
                </Card>
            </div>
        </ScrollArea>
    )
}

export default TwoFactorAuthPage;