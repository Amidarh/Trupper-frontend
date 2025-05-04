import { NewsletterTable } from "../components/tables/newsletter";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Newsletter = () => {
    const router = useRouter()
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <h1>All Newsletter</h1>
                <Button 
                    onClick={() => router.push('/newsletters/create')}
                    className="cursor-pointer">Create Newsletter</Button>
            </CardHeader>
            <CardContent>
                <NewsletterTable/>
            </CardContent>
        </Card>
    )
}