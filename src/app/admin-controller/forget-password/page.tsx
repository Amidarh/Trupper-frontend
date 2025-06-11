"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAdminAuthService } from "@/modules/admin-controller/services";
import { useAltStore } from "@/lib/zustand/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgottenPasswordPage = () => {
    const { organization } = useAltStore();
    const router = useRouter();

    useEffect(() => {
        if(organization && !organization?.isOnboarded){
            router.push("/onboarding/personnel")
        }
    }, [organization])
    const {
        forgetPasswordForm: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting }
        },
        forgetPassword,
        serverError,
        successMessage
    } = useAdminAuthService()

    return (
        <div className="flex pt-10 sm:items-center justify-center h-screen w-full">
            <Card className="w-full max-w-120 p-2 max-sm:bg-transparent border-none sm:border sm:p-8">
                <div className="flex flex-col items-center justify-center mb-4 cursor-pointer"
                    onClick={() => router.push("/admin-controller/login")}
                >
                    {organization?.logo && 
                        <Image src={organization.logo} height={40} width={40} className="rounded-lg mb-1" alt={`${organization.name} logo`}/>
                    }
                    <h2 className="text-2xl font-bold mb-1">{organization?.name}</h2>
                    <h2 className="text-md font-bold">Can't Login</h2>
                    <p className="text-sm">Enter the email you used to create account</p>
                    {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}
                    {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}
                </div>
                <form onSubmit={handleSubmit(forgetPassword)}>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="h-12"
                            { ...register("email") }
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mt-8 flex">
                        <Button type="submit" className="w-full cursor-pointer h-10">
                            { isSubmitting ? "Send Link..." : "Send Link" }
                        </Button>
                    </div>

                    <div
                        className="flex flex-row justify-center items-center mt-4 gap-4"
                    >
                        <Link href="/admin-controller/login" className="hover:underline mt-4">
                            return to Login
                        </Link>
                    </div>

                    <div className="mt-5 flex flex-col justify-center gap-5 items-center">
                        <Separator/>
                        <p className="text-center max-w-90 text-xs dark:text-gray-300 text-gray-800">By loging in you agree to all <b>Amidarh</b> terms and conditions @ {organization?.name} 2025</p>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default ForgottenPasswordPage;