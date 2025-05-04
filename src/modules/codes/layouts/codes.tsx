import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeTable } from "../components/tables/codeTable";


export const Codes = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <h1>Authentication Code</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Generate Code</Button>
                    <Button>Generate Bulk Code</Button>
                </div>
            </CardHeader>
            <CardContent>
                <CodeTable/>
            </CardContent>
        </Card>
    )
};