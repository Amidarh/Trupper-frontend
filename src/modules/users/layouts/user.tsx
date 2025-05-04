import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { UserProfile } from "./profile";
import { UserActivities } from "./activities";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/core/commons/navigation/backButton";

export const UserPage = () => {
    return (
        <main>
            <div className="flex flex-row justify-between mb-3">
                <BackButton title="User Profile" />
                <div>
                    <Button variant="destructive" className="cursor-pointer">Suspend</Button>
                </div>
            </div>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full max-w-[300px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <UserProfile />
                </TabsContent>
                <TabsContent value="activities">
                    <UserActivities />
                </TabsContent>
            </Tabs>
        </main>
    );
}