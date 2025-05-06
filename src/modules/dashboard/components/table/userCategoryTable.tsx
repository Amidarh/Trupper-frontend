import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader } from "@/components/ui/card";
import { UserCategoryData } from "@/constants/data";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStatusBadge } from "@/core/commons/components/badge/badge";

export function UserCategoryTable() {
    const router = useRouter()

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pl-2">
                <h1 className="text-2xl font-semibold">User Categories</h1>
                <Link href={'/categories'}>
                    <SquareArrowOutUpRight size={18} className="cursor-pointer"/>
                </Link>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>No Users</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead align="right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {UserCategoryData.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.noUsers}</TableCell>
                            <TableCell>{getStatusBadge(category.status)}</TableCell>
                            <TableCell>
                                <button className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                    onClick={() => router.push("/categories/1")}
                                >
                                    view
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}