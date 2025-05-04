"use client"

import * as React from "react"

import { Plus, EllipsisVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export const UserTable = () => {
    const router = useRouter();
    return (
        <Card>
            <CardHeader>
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
            </CardHeader>
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date Joined</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead align="right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow onClick={() => router.push('/users/1')} className="cursor-pointer">
                        <TableCell>Wisdom woke</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>HLC</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>10 April 2025 : 20:24</TableCell>
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
                    <TableRow onClick={() => router.push('/users/1')} className="cursor-pointer">
                        <TableCell>Wisdom woke</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>HLC</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>10 April 2025 : 20:24</TableCell>
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
                    <TableRow onClick={() => router.push('/users/1')} className="cursor-pointer">
                        <TableCell>Wisdom woke</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>HLC</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>10 April 2025 : 20:24</TableCell>
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
                    <TableRow onClick={() => router.push('/users/1')} className="cursor-pointer">
                        <TableCell>Wisdom woke</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>HLC</TableCell>
                        <TableCell>10 April 2025</TableCell>
                        <TableCell>10 April 2025 : 20:24</TableCell>
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
                </TableBody>
            </Table>
        </Card>
    )
}