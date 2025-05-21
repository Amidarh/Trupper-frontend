import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { AdminProfile } from "../components/tabs/profile";
import { AdminPermissions } from "../components/tabs/permissions";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Button } from "@/components/ui/button";
import { IAdmin } from "@/types/admin.types";

export const AdminDetail = ({adminData }: { adminData: IAdmin | null }) => {
    return (
        <main>
            <div className="flex flex-row justify-between mb-3">
                <BackButton title="Sub Admins" />
                <div>
                    <Button variant="destructive" className="cursor-pointer">Suspend</Button>
                </div>
            </div>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full max-w-[300px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <AdminProfile admin={adminData} />
                </TabsContent>
                <TabsContent value="permissions">
                    <AdminPermissions />
                </TabsContent>
            </Tabs>
        </main>
    )
}