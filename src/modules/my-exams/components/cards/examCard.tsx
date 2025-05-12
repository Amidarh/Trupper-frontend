import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ExamCard = () => {
    return (
        <Card className="p-3 gap-0 w-full max-w-[290px] min-h-[220px]">
        <CardHeader className="flex flex-row justify-between items-center w-full px-0">
            <h1 className="text-[14px]">LLC</h1>
            <EllipsisVertical scale={10}/>
        </CardHeader>
        <CardContent className="p-0 mt-2 flex justify-between flex-col h-full">
            {/* <div> */}
                <div className="flex-col gap-2">
                <Separator/>
                    <div className="mt-3  flex justify-between flex-row">
                        <p className="font-bold text-sm">Category</p>
                        <p className="text-sm text-gray-500">Science</p>
                    </div>
                    <div className="flex justify-between flex-row">
                        <p className="font-bold text-sm">Creation Date</p>
                        <p className="text-sm text-right text-gray-500">Thursday  Apr 24 2025</p>
                    </div>
                    <div className="flex justify-between flex-row gap-2">
                        <p className="font-bold text-sm">Subjects</p>
                        <div className="flex gap-1 flex-wrap justify-end items-end text-gray-500">
                            <p className="text-sm">English,</p>
                            <p className="text-sm">English,</p>
                            <p className="text-sm">English,</p>
                            <p className="text-sm">English,</p>
                            <p className="text-sm">Mathematics,</p>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            <div className="mt-3">
                <Button className="w-full h-10">Start</Button>
            </div>
        </CardContent>
    </Card>
    )
}