"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const NotificationsTable = () => {
    const router = useRouter()
    return (
        <Card className="gap-0">
            <CardHeader className="flex flex-row justify-between items-center">
                <h1 className="font-bold">Notifications</h1>
                <Button variant="ghost">
                    <Link scale={16}/>
                    <p>See All</p>
                </Button>
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