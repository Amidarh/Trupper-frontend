"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";
import { SubjectType } from "@/types/subject.types";

export const SubjectsByExamsTable = ({ data } : { data:SubjectType[] | null }) => {
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
                {/* Add your table rows here */}
                {data?.map(subject => (
                    <TableRow
                        onClick={() => router.push(`/subjects/edit/${subject.id}`)}
                        className="cursor-pointer"
                    > 
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>wisdomwokedev@gmail.com</TableCell>
                        <TableCell>
                            {getStatusBadge(subject.status ? 'active' : 'inactive')}
                        </TableCell>
                        <TableCell className="flex justify-end items-end">
                            <Button className="cursor-pointer">Edit</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}