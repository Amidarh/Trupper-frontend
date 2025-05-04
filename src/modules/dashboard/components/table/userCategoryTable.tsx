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

export function UserCategoryTable() {
    const getStatusBadge = (status: string) => {
        const baseClass = "px-2 py-1 rounded text-sm font-medium";
        switch (status.toLowerCase()) {
            case "active":
                return <span className={`${baseClass} bg-green-100 text-green-800`}>Active</span>;
            case "inactive":
                return <span className={`${baseClass} bg-gray-100 text-red-500`}>Inactive</span>;
            case "pending":
                return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Pending</span>;
            default:
                return <span className={`${baseClass} bg-red-100 text-red-800`}>Unknown</span>;
        }
    };

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
                                <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
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