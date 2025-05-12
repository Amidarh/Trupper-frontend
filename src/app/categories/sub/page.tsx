import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger ,SelectScrollUpButton } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DurationData } from "@/constants/data";

const CreateCategoryPage = () => {
    return (
        <DashboardLayout 
            pageTitle="Create a new category"
            subHeading="Manage your categories here"
        >
            <Card className="p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <BackButton title="Categories"/>

                    <Button>Create Category</Button>
                </div>

                <CardContent className="p-0">
                    <div>
                        <div className="h-25 w-25 border rounded-sm"></div>
                    </div>

                    <Separator className="my-5"/>

                    <main 
                        className="grid sm:grid-cols-2 grid-cols-1 gap-5"
                    >
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">Name</Label>
                            <Input type="email" id="email" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="mb-2">Category</Label>
                            <Select>
                                <SelectTrigger className="w-full h-20">
                                    Select Category
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectScrollUpButton />
                                    <SelectGroup>
                                        <SelectItem value="olevel">O level</SelectItem>
                                        <SelectItem value="olevel">O level</SelectItem>
                                        <SelectItem value="olevel">O level</SelectItem>
                                        <SelectItem value="olevel">O level</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </main>
                    <div>
                        <h1 className="text-xl">Status</h1>
                        <div className="flex flex-row items-center justify-c gap-5 mt-4">
                            <h1>Active</h1>
                            <Switch className="cursor-pointer"/>
                        </div>
                    </div>

                    <Separator className="my-5"/>

                </CardContent>

            </Card>
            {/* Add your form component here */}
        </DashboardLayout>
    )
}
export default CreateCategoryPage;