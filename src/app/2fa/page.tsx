"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

const TwoFactorAuthPage = () => {
    return (
        <ScrollArea className="w-full">
            <div className="flex pt-10 sm:items-center justify-center pb-5">
               <Card className="max-w-120 w-full p-2 max-sm:bg-transparent border-none sm:border sm:p-8">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <h2 className="text-2xl font-bold mb-1">Trupper</h2>
                        <h2 className="text-md font-bold">Two factor Authentication</h2>
                        <p className="text-sm">Enter OTP to continue to your account</p>
                    </div>
                    <form>
                        <div className="mb-4">
                            <Label htmlFor="otp" className="mb-2">Enter OTP</Label>
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                <InputOTPGroup className="w-full flex gap-1">
                                    <InputOTPSlot index={0} className="w-full h-13"/>
                                    <InputOTPSlot index={1} className="w-full h-13 border-l"/>
                                    <InputOTPSlot index={2} className="w-full h-13 border-l"/>
                                    <InputOTPSlot index={3} className="w-full h-13 border-l"/>
                                    <InputOTPSlot index={4} className="w-full h-13 border-l"/>
                                    <InputOTPSlot index={5} className="w-full h-13 border-l"/>
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <div className="mt-10">
                            <Button type="submit" className="w-full cursor-pointer h-10">Continue</Button>
                        </div>

                        <div className="mt-5 flex flex-col justify-center gap-5 items-center">
                            <Separator/>
                            <p className="text-center max-w-90 text-xs dark:text-gray-300 text-gray-800">By loging in you agree to all <b>Amidarh</b> terms and conditions @ Trupper 2025</p>
                        </div>
                    </form>
                </Card>
            </div>
        </ScrollArea>
    )
}

export default TwoFactorAuthPage;