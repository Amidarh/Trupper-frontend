import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuestionTable } from "../components/tables/questionsTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export const Questions = () => {
    const router = useRouter()
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex gap-2 flex-col">
                    <Label>Filters</Label>
                    <Input className="h-8"/>
                </div>
                <Button className="cursor-pointer"
                    onClick={() =>  router.push("/questions/create")}
                >Add new Question</Button>
            </CardHeader>
            <CardContent>
                <QuestionTable/>
            </CardContent>
        </Card>
    )
}