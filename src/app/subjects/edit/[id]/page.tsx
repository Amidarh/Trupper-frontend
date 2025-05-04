"use client"

import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import DashboardLayout from "@/core/commons/layout/dashboardLayout"
import { BackButton } from "@/core/commons/navigation/backButton"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";

const ViewSubject = () => {
    return (
        <DashboardLayout
            pageTitle="Edit Subject"
            subHeading="Create subject for exams"
        >
            <Card>
                <CardHeader 
                    className="flex flex-row justify-between items-center"
                >
                    <BackButton title="Subjects"/>

                    <div className="flex flex-row gap-2 items-center">
                        <Button>Add Subject</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Separator className="my-5"/>

                        <main 
                            className="grid sm:grid-cols-2 grid-cols-1 gap-5"
                        >
                            <div className="mb-4">
                                <Label htmlFor="email" className="mb-2">Subject Name</Label>
                                <Input type="email" id="email" placeholder="Enter Subject Name" className="h-12" />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">Exam</Label>
                                <Select>
                                    <SelectTrigger className="w-full h-20" >
                                        Exam Duration
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectScrollUpButton /> */}
                                        <SelectGroup>
                                        <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                        <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                        <SelectItem value="Test Data">Test Data Tes Data</SelectItem>                                                    
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </main>
                        <div>
                            <h1 className="text-xl">Status</h1>
                            <div className="flex flex-row gap-4 mt-2 items-center">
                                <p className="">Active</p>
                                <Switch/>
                            </div>
                        </div>
                </CardContent>

            </Card>
        </DashboardLayout>
    )
};

export default ViewSubject