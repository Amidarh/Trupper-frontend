import { Card, CardContent } from "@/components/ui/card"
import { SubjectsByExamsTable } from "../components/tables/subjectTable";
import { useRouter } from "next/navigation";
import { BackButton } from "@/core/commons/navigation/backButton";

export const SubjectsByExams = () => {
    const router = useRouter()
    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                <div>
                    <BackButton title="Back"/>
                </div>

                <SubjectsByExamsTable/>
            </CardContent>
        </Card>
    )
}