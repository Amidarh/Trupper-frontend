"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export const TopPerformersTable = () => {
    const router = useRouter()
    return (
        <Card className="gap-0">
            <CardHeader className="flex flex-row justify-between items-center mb-2.5">
                <h1 className="font-bold">Top Performers</h1>
                <div></div>
            </CardHeader>
            <CardContent className="mt-0">
                <main>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <h1 className="font-bold">This is a test</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <h1 className="font-bold">This is a test</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <h1 className="font-bold">This is a test</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <h1 className="font-bold">This is a test</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}