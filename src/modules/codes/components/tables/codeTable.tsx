"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useRouter } from "next/navigation";

export const CodeTable = () => {
    const router = useRouter()
    return (
        <Table className="w-full rounded-sm">
            <TableHeader className="bg-muted rounded-sm">
                <TableRow>
                    <TableHead >Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sub Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right" className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow
                    className="cursor-pointer"
                > 
                    <TableCell>WI384D3</TableCell>
                    <TableCell>Authentication</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Test 2</TableCell>
                    <TableCell>
                        {getStatusBadge('used')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button variant="destructive" className="cursor-pointer">Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    className="cursor-pointer"
                > 
                    <TableCell>WI384D3</TableCell>
                    <TableCell>Authentication</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Test 2</TableCell>
                    <TableCell>
                        {getStatusBadge('active')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button variant="destructive" className="cursor-pointer">Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    className="cursor-pointer"
                > 
                    <TableCell>WI384D3</TableCell>
                    <TableCell>Authentication</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Test 2</TableCell>
                    <TableCell>
                        {getStatusBadge('used')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button variant="destructive" className="cursor-pointer">Delete</Button>
                    </TableCell>
                </TableRow>
                <TableRow
                    className="cursor-pointer"
                >
                    <TableCell>WI384D3</TableCell>
                    <TableCell>Authentication</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Test 2</TableCell>
                    <TableCell>
                        {getStatusBadge('used')}
                    </TableCell>
                    <TableCell className="flex justify-end items-end">
                        <Button variant="destructive" className="cursor-pointer">Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}