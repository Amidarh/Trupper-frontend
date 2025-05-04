import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SubjectCard } from "../components/card/subjectCard"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export const Subject = () => {
    const router = useRouter()
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full">
                <div>Subjects by exams</div>
                <Button className="cursor-pointer"
                    onClick={() => router.push("/subjects/create")}
                >
                    <Plus/>
                    <p>Add Subject</p>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-row gap-2">
                <SubjectCard exam="JAMB"/>
                <SubjectCard exam="JAMB"/>
                <SubjectCard exam="JAMB"/>
            </CardContent>
        </Card>
    )
}