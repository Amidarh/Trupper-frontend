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
import { Trash2 } from "lucide-react";

export const ViewCategoryPage = () => {
    return (
        <DashboardLayout 
            pageTitle="LL category"
            subHeading="Manage your categories here"
        >
            <Card className="p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <BackButton title="Categories"/>

                    <div className="flex gap-2 flex-row">
                        <Button variant="destructive" className="cursor-pointer">
                            <Trash2/>
                            <p> Delete Category</p>
                        </Button>
                        <Button className="cursor-pointer">Edit Category</Button>
                    </div>
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
                    </main>
                    <div>
                        <h1 className="text-xl">Status</h1>
                        <div>
                            <p className="text-sm">Active</p>
                        </div>
                    </div>

                    <Separator className="my-5"/>

                    <section className="flex flex-col gap-5">
                        <div className="flex flex-row items-center justify-c gap-5">
                            <h1 className="text-xl">Exam Mode</h1>
                            <Switch className="cursor-pointer"/>
                        </div>

                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                            <div>
                                <Label htmlFor="email" className="mb-2">Sub Category</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        Exam Mode
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">Exam</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        Exam Mode
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">Duration</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        Exam Duration
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">No Of Subjects to Be written</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        No Of Subjects to Be written
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">No Of Questions</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        Exam Duration
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">Score Multiplier</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        Exam Duration
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectScrollUpButton />
                                        <SelectGroup>
                                            {DurationData.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Button className="cursor-pointer">Save</Button>
                        </div>

                    </section>

                </CardContent>

            </Card>
            {/* Add your form component here */}
        </DashboardLayout>
    )
}
export default ViewCategoryPage;