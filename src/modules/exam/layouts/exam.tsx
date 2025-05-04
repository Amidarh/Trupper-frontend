import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamsTable } from "../components/tables/main";
import { useRouter } from "next/navigation";

export const Exams = () => {
    const router = useRouter()
    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div></div>
                    <Button variant="outline"
                        onClick={() => router.push("/exams/create")}
                        className="cursor-pointer"
                    >Add Exam</Button>
                </div>

                <ExamsTable/>
            </CardContent>
        </Card>
    )
}