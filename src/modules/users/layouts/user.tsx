"use client"

import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { UserProfile } from "./profile";
import { UserActivities } from "./activities";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Skeleton } from "@/components/ui/skeleton";
import { IUser } from "@/types/user.types";

export const User = (
    {
        userData,
        loading,
        blockUser,
        unBlockUser
    }:{
        userData: IUser | null;
        loading: boolean;
        blockUser: () => void,
        unBlockUser: () => void;
    }
) => {
    return (
        <main>
            <div className="flex flex-row justify-between mb-3">
                <BackButton title="User Profile" />
                <div>
                    {loading ?  
                        (<Button variant="ghost" className="cursor-pointer">Checking Data...</Button>) : 
                        (!userData?.isBlocked ?
                            <Button variant="destructive" className="cursor-pointer" onClick={() => blockUser()}>Block</Button> :
                            <Button variant="secondary" className="cursor-pointer" onClick={() => unBlockUser()}>UnBlock</Button>)
                    }
                </div>
            </div>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full max-w-[300px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    {
                        loading ? (
                            <Skeleton className="h-[400px]"/> 
                        ) : (
                            <UserProfile user={userData} />
                        )
                    }
                </TabsContent>
                <TabsContent value="activities">
                    <UserActivities />
                </TabsContent>
            </Tabs>
        </main>
    );
}