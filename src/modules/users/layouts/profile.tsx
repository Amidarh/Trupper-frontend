import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IUser } from "@/types/user.types";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import moment from "moment";

export const UserProfile = ({ user }: { user:IUser | null }) => {
    return (
        <main className="flex flex-col gap-5">
            <Card className="mt-5 px-5">
                <div>
                    <div className="flex flex-row max-lg:justify-center">
                        <Avatar className="size-24 md:size-30">
                            <AvatarFallback className="text-2xl md:text-6xl font-bold">{user?.firstName?.slice(0,1)}{user?.lastName?.slice(0,1)}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2 w-full">
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">First Name :</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Last Name :</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Email :</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Date joined :</p>
                            <p>{moment(user?.createdAt).format("MMMM D, YYYY")}</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Category One:</p>
                            <p>Tap</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Category Two :</p>
                            <p>Taptip</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Verification :</p>
                             {getStatusBadge(user?.isVerified ? "verified" : "not verified")}
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Status :</p>
                            {user?.isBlocked ? <p className="text-red-500">Blocked</p> : <p className="text-green-500">Active</p> }
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="gap-0">
                <CardHeader>
                    <h1 className="font-bold">Login Activities</h1>
                    <p className="text-gray-200">Last Login : Sun Apr 27 2025</p>
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-2 mt-0 lg:grid-cols-2">
                    <div className="mt-4 grid grid-cols-2 gap-5 max-md:grid-cols-1 border border-dash rounded-sm p-3">
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Time :</p>
                            <p>12:00</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Device :</p>
                            <p>Samsung A51</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Browser :</p>
                            <p>Chrome</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Location :</p>
                            <p>My House</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-5 border border-dash max-md:grid-cols-1 rounded-sm p-3">
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Time :</p>
                            <p>12:00</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Device :</p>
                            <p>Samsung A51</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Browser :</p>
                            <p>Chrome</p>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <p className="font-bold">Location :</p>
                            <p>My House</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}