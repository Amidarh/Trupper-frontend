import { Card, CardContent } from "@/components/ui/card"
import { SubjectsByExamsTable } from "../components/tables/subjectTable";
import { useRouter } from "next/navigation";
import { BackButton } from "@/core/commons/navigation/backButton";
import { useParams } from "next/navigation";
import { useSubjectService } from "../services";
import { useEffect } from "react";

export const SubjectsByExams = () => {
    const router = useRouter()
    const { id } = useParams<{ id:string }>();
    const { getSubjectByExam, subjectList } = useSubjectService()

    useEffect(() => {
        if(id){
            getSubjectByExam(id)
        }
    },[id])

    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                <div>
                    <BackButton title="Back"/>
                </div>

                <SubjectsByExamsTable data={subjectList}/>
            </CardContent>
        </Card>
    )
}