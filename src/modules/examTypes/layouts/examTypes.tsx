import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamTypesTable } from "../components/table/examTypes";
import { useRouter } from "next/navigation";
import { useExamTypeService } from "../services";

export const ExamTypes = () => {
    const router = useRouter()
    const { data } = useExamTypeService()
    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div></div>
                    <Button variant="outline"
                        onClick={() => router.push("/exam-types/create")}
                        className="cursor-pointer"
                    >Add Exam Type</Button>
                </div>

                <ExamTypesTable data={data}/>
            </CardContent>
        </Card>
    )
}