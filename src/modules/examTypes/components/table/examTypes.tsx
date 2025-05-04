"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";

export const ExamTypesTable = () => {
    const router = useRouter()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Exams</TableHead>
                    <TableHead>No Of Exams</TableHead>
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
                    onClick={() => router.push("/exam-type/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>O Level</TableCell>
                    <TableCell>Waec, Neco, JAMB ...</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/exam-type/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>O Level</TableCell>
                    <TableCell>Waec, Neco, JAMB ...</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/exam-type/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>O Level</TableCell>
                    <TableCell>Waec, Neco, JAMB ...</TableCell>
                    <TableCell>5</TableCell>
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