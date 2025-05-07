"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Link, SquareArrowUpRight, SquareArrowOutUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const NotificationsTable = () => {
    const router = useRouter()
    return (
        <Card className="gap-0">
            <CardHeader className="flex flex-row justify-between items-center">
                <h1 className="font-bold">Notifications</h1>
                <Button variant="ghost">
                    <SquareArrowOutUpRight scale={16}/>
                    <p>See All</p>
                </Button>
            </CardHeader>
            <CardContent className="mt-0">
                <main>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <div className="flex gap-2 items-center">
                            <h1 className="font-bold">This is a test</h1>
                            <Badge variant="secondary" className="text-green-700 bg-green-300">New</Badge>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <div className="flex gap-2 items-center">
                            <h1 className="font-bold">This is a test</h1>
                            <Badge variant="secondary" className="text-green-700 bg-green-300">New</Badge>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Yesterday</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <div className="flex gap-2 items-center">
                            <h1 className="font-bold">This is a test</h1>
                            <Badge variant="secondary" className="text-green-700 bg-green-300">New</Badge>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Yesterday</p>
                    </div>
                    <div className="mt-1">
                        <Separator className="mb-2"/>
                        <div className="flex gap-2 items-center">
                            <h1 className="font-bold">This is a test</h1>
                            <Badge variant="secondary" className="text-green-700 bg-green-300">New</Badge>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-[13px] truncate text-ellipse">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa quod, dicta sapiente, dolorem nisi atque nesciunt neque quaerat praesentium totam odio vel laborum architecto, rem ex. Eos, neque? Iste?</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Yesterday</p>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}