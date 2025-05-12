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

const CreateExam = () => {
    return (
        <DashboardLayout
            pageTitle="Create an exam"
        >
             <Card className="p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <BackButton title="Exams"/>

                    <div className="flex gap-2 flex-row">
                        <Button variant="destructive" className="cursor-pointer">
                            <Trash2/>
                            <p> Delete Exam</p>
                        </Button>
                        <Button className="cursor-pointer">Edit Exam</Button>
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
                            <Label htmlFor="FullName" className="mb-2">Full Name</Label>
                            <Input type="text" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">Acronym</Label>
                            <Input type="text" id="email" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="mb-2">Sub Category</Label>
                            <Select>
                                <SelectTrigger className="w-full h-10">
                                    Exam Type
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
                            <Label htmlFor="email" className="mb-2">Sub Category</Label>
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
                        <div className="mb-4">
                            <Label htmlFor="FullName" className="mb-2">No. Of Subjects to be written at a time</Label>
                            <Input type="number" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="FullName" className="mb-2">No. Of questions
                            </Label>
                            <Input type="number" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="FullName" className="mb-2">Max No of Subjects
                            </Label>
                            <Input type="number" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="FullName" className="mb-2">Min No. Of Subjects</Label>
                            <Input type="number" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="FullName" className="mb-2">Score Multiplier</Label>
                            <Input type="number" id="fullName" placeholder="Enter Category email" className="h-12" />
                        </div>
                        
                    </main>
                    <Separator className="my-5"/>
                    <div>
                        <h1 className="text-xl">Status</h1>
                        <div className="flex flex-row gap-5 items-center">
                            <p className="text-sm">Active</p>
                            <Switch/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    )
}

export default CreateExam;