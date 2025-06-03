"use client"

import { Button } from "@/components/ui/button"
import { 
    Card,
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
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useSubjectService } from "@/modules/subjects/services"
import { useExamService } from "@/modules/exam/services"
import { useState } from "react"
import { ExamType } from "@/types/exam.types"

const CreateSubject = () => {
    const {
        form: { 
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
            setValue
         },
        createSubject
    } = useSubjectService()
    const { data: exams, isLoading } = useExamService()
    const [ isActive, setIsActive ] = useState(false);
    const [ selectedExam, setSelectedExam ] = useState<ExamType | undefined>(undefined)

    return (
        <DashboardLayout
            pageTitle="Create Subject"
            subHeading="Create subject for exams"
        >
            <Card>
                <form className="p-4" onSubmit={handleSubmit(createSubject)}>
                <CardHeader 
                    className="flex flex-row p-0 justify-between items-center"
                >
                    <BackButton title="Subjects"/>

                    <div className="flex flex-row gap-2 items-center">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Subject"}
                        </Button>
                    </div>
                </CardHeader>

                    <Separator className="my-5"/>

                        <main 
                            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                        >
                            <div className="mb-4">
                                <Label htmlFor="name" className="mb-2">Subject Name</Label>
                                <Input type="text" id="name" placeholder="Enter Subject Name" className="h-12"
                                    { ...register('name') }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">Exam</Label>
                                 <Select
                                    onValueChange={(value) => {
                                        setSelectedExam(exams?.find(cat => cat.id === value));
                                        setValue("exam", value, { shouldValidate: true });
                                    }}
                                    value={isLoading ? "Loading...." : selectedExam?.id || ""}
                                >
                                    <SelectTrigger className="w-full h-12">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {exams?.map((exam) => (
                                                <SelectItem key={exam.id} value={exam.id}>
                                                    {exam.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.exam && (
                                    <p className="text-red-500 text-sm">{errors.exam.message}</p>
                                )}
                            </div>
                        </main>
                        <div className="max-lg:mt-5">
                            <h1 className="text-xl">Status</h1>
                            <div className="flex flex-row gap-4 mt-2 items-center">
                                <p className="">Active</p>
                                 <Switch
                                    checked={isActive}
                                    onCheckedChange={(checked) => {
                                        setIsActive(checked);
                                        setValue("status", checked, { shouldValidate: true });
                                    }}
                                />
                                </div>
                                {errors.status && (
                                    <p className="text-red-500 text-sm">{errors.status.message}</p>
                                )}
                        </div>
                </form>

            </Card>
        </DashboardLayout>
    )
};

export default CreateSubject