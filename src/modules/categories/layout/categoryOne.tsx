"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryOneTable } from "../components/tables/categoryOne"
import { useRouter } from "next/navigation"

export const CategoryOne = () => {
    const router = useRouter();
    return (
        <Card className="px-4">
            <CardHeader className="p-0 flex flex-row items-centre justify-between">
                <div></div>
                <Button onClick={() => router.push("/categories/new")} className="w-fit cursor-pointer">Create New Category</Button>
            </CardHeader>
            <CategoryOneTable/>
        </Card>
    )
}