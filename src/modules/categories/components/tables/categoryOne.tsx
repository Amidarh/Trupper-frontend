"use client"

import * as React from "react"

import { EllipsisVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getStatusBadge } from "@/core/commons/components/badge/badge";


export const CategoryOneTable = () => {
    const router = useRouter();
    return (
        <div>
            {/* <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <Select>
                        <SelectTrigger>
                            Filter By
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Full Name</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex flex-row gap-2 items-center">
                        <Button variant="outline" className="cursor-pointer h-10">Export Data</Button>
                        <Button className="cursor-pointer">
                            <Plus className="h-4 w-4" />
                            <p>Add New User</p>
                        </Button>
                    </div>

                </div>
            </CardHeader> */}
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sub Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>created by</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead align="right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="cursor-pointer">
                        <TableCell onClick={() => router.push('/categories/1')}>O level</TableCell>
                        <TableCell onClick={() => router.push('/categories/1')}>Note</TableCell>
                        <TableCell onClick={() => router.push('/categories/1')}>{getStatusBadge("active")}</TableCell>
                        <TableCell>Me</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div><EllipsisVertical/></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem className="cursor-pointer">Open</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer">
                        <TableCell onClick={() => router.push('/categories/1')}>O level</TableCell>
                        <TableCell onClick={() => router.push('/categories/1')}>Note</TableCell>
                        <TableCell onClick={() => router.push('/categories/1')}>{getStatusBadge("inactive")}</TableCell>
                        <TableCell onClick={() => router.push('/categories/1')}>Me</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div><EllipsisVertical/></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem className="cursor-pointer">Open</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer">
                        <TableCell>O level</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>{getStatusBadge("active")}</TableCell>
                        <TableCell>Me</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div><EllipsisVertical/></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem className="cursor-pointer">Open</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer">
                        <TableCell>O level</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>{getStatusBadge("active")}</TableCell>
                        <TableCell>Me</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div><EllipsisVertical/></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem className="cursor-pointer">Open</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer">
                        <TableCell>O level</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>{getStatusBadge("inactive")}</TableCell>
                        <TableCell>Me</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div><EllipsisVertical/></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}