"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <ScrollArea className="w-full">
            <div className="flex pt-10 sm:items-center justify-center pb-12">
                <Card className="w-full max-w-120 p-2 max-sm:bg-transparent border-none sm:border sm:p-8">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <h2 className="text-2xl font-bold mb-1">Trupper</h2>
                        <h2 className="text-md font-bold">Create a new account</h2>
                    </div>
                    <form>
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">First Name</Label>
                            <Input type="email" id="firstName" placeholder="Enter your First Name" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">Last Name</Label>
                            <Input type="email" id="lastName" placeholder="Enter your Last Name" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="mb-2">Password</Label>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    className="h-12 pr-10" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
                            <div className="relative">
                                <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    id="confirmPassword" 
                                    placeholder="Confirm your password" 
                                    className="h-12 pr-10" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button type="submit" className="w-full cursor-pointer h-10">Create Account</Button>
                        </div>

                        <div className="mt-8 flex items-center gap-5 justify-center">
                            <Separator className="w-full max-w-30"/>
                            <p>OR</p>
                            <Separator className="w-full max-w-30"/>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button className="cursor-pointer">Sign in with Google</Button>
                        </div>

                        <div
                            className="flex flex-row justify-center items-center mt-4 gap-2"
                        >
                            <p>Already have an account?</p>
                            <Link href="/login" className="hover:underline">
                                Login
                            </Link>
                        </div>

                        <div className="mt-5 flex flex-col justify-center gap-5 items-center">
                            <Separator/>
                            <p className="text-center max-w-90 text-xs dark:text-gray-300 text-gray-800">By creating this account you agree to all <b>Amidarh</b> terms and conditions @ Trupper 2025</p>
                        </div>
                    </form>
                </Card>
            </div>
        </ScrollArea>
    )
}

export default SignUpPage;