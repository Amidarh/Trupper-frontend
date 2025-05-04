"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";

export const NotificationsTable = () => {
    const router = useRouter()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead className="w-[200px] truncate text-ellipsis">Topic</TableHead>
                    <TableHead className="w-[200px] text-center" align="center">Category</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right" className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Add your table rows here */}
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell className="truncate text-ellipse w-[200px]">Your First Notification thsidisidsid sids doid sdio </TableCell>
                    <TableCell align="center">LLC</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('draft')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell className="truncate text-ellipse w-[200px]">Your First Notification thsidisidsid sids doid sdio </TableCell>
                    <TableCell align="center">LLC</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('sent')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    onClick={() => router.push("/subjects/edit/1")}
                    className="cursor-pointer"
                > 
                    <TableCell className="truncate text-ellipse w-[200px]">Your First Notification thsidisidsid sids doid sdio </TableCell>
                    <TableCell align="center">LLC</TableCell>
                    <TableCell>wisdomwokedev@gmail.com</TableCell>
                    <TableCell>
                        {getStatusBadge('draft')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button className="cursor-pointer">Edit</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}