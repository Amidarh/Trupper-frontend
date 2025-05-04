"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";

export const SubjectsByExamsTable = () => {
    const router = useRouter()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead className="w-[200px] truncate text-ellipsis">Name</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right" className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>

                </TableRow>
            </TableBody>
            <TableBody>
                {/* Add your table rows here */}
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>Maths</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>Maths</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>Maths</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}