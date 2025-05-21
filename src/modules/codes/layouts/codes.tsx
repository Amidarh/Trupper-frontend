"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeTable } from "../components/tables/codeTable";
import { GenerateCodeModal } from "../components/modals/generateCode";
import { useCodeService } from "../services";


export const Codes = () => {
    const { data, isLoading } = useCodeService()
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <h1>Authentication Code</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Export Codes</Button>
                    <GenerateCodeModal/>
                </div>
            </CardHeader>
            <CardContent>
                <CodeTable codes={data}/>
            </CardContent>
        </Card>
    )
};