"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";
import { useQuestionService } from "../../services";

export const QuestionTable = () => {
    const router = useRouter()
    const { data, isLoading } = useQuestionService()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead className="truncate text-ellipsis">Question Type</TableHead>
                    <TableHead>Subject</TableHead>
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
                {data?.map(question => (
                    <TableRow
                        onClick={() => router.push(`/questions/${question.id}`)}
                        className="cursor-pointer"
                    > 
                        <TableCell>{question.questionType}</TableCell>
                        <TableCell>{question.subject.name}</TableCell>
                        <TableCell>
                            {getStatusBadge('active')}
                        </TableCell>
                        <TableCell className="flex justify-end items-end">
                            <Button className="cursor-pointer"
                                onClick={() => router.push(`/questions/${question.id}`)}
                            >Edit</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}