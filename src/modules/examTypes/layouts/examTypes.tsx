import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamTypesTable } from "../components/table/examTypes";
import { useRouter } from "next/navigation";

export const ExamTypes = () => {
    const router = useRouter()
    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div></div>
                    <Button variant="outline"
                        onClick={() => router.push("/exam-type/create")}
                        className="cursor-pointer"
                    >Add Exam Type</Button>
                </div>

                <ExamTypesTable/>
            </CardContent>
        </Card>
    )
}