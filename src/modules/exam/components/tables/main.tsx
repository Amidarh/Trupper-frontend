"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";

export const ExamsTable = () => {
    const router = useRouter()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Exam Duration</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>No Of Questions</TableHead>
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
                    onClick={() => router.push("/exams/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>JAMB</TableCell>
                    <TableCell>Join Administration Matriculation Board</TableCell>
                    <TableCell>60 Minutes</TableCell>
                    <TableCell>O'Level</TableCell>
                    <TableCell>60 Question</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/exams/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>JAMB</TableCell>
                    <TableCell>Join Administration Matriculation Board</TableCell>
                    <TableCell>60 Minutes</TableCell>
                    <TableCell>O'Level</TableCell>
                    <TableCell>60 Question</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/exams/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>JAMB</TableCell>
                    <TableCell>Join Administration Matriculation Board</TableCell>
                    <TableCell>60 Minutes</TableCell>
                    <TableCell>O'Level</TableCell>
                    <TableCell>60 Question</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/exams/1")}
                    className="cursor-pointer"
                > 
                    <TableCell>JAMB</TableCell>
                    <TableCell>Join Administration Matriculation Board</TableCell>
                    <TableCell>60 Minutes</TableCell>
                    <TableCell>O'Level</TableCell>
                    <TableCell>60 Question</TableCell>
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