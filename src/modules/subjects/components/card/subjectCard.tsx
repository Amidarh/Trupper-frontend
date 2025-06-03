import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SubjectCard = ({exam, id} : { exam: string, id:string }) => {
    const router = useRouter()
    return (
        <Card className="p-2 gap-0 w-full max-w-[280px] flex flex-col justify-between">
            <div>
                <CardHeader className="p-0">
                    <h1 className="text-[18px] font-bold">{exam}</h1>
                </CardHeader>
                <Separator/>
                <CardContent 
                className="p-0 mt-1.5"
                >
                    <p>View subjects under {exam}</p>
                </CardContent>
            </div>
            <CardFooter className="p-0 mt-2">
                <Button className="w-full cursor-pointer"
                    onClick={() => router.push(`/subjects/${id}`)}
                >View</Button>
            </CardFooter>
        </Card>
    )
}