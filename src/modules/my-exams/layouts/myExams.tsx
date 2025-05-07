import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { MainCards } from "./mainCards/mainCards";

export const MyExams = () => {
    return (
        <Card className="px-3">
            <Tabs defaultValue="my-exam-cards">
                <TabsList>
                    <TabsTrigger value="my-exam-cards">My Cards</TabsTrigger>
                    <TabsTrigger value="shared-cards">Shared cards</TabsTrigger>
                </TabsList>
                <Separator/>
                <TabsContent value="my-exam-cards">
                    <MainCards/>
                </TabsContent>
                <TabsContent value="shared-cards">Shared Cards</TabsContent>
            </Tabs>
        </Card>
    )
};