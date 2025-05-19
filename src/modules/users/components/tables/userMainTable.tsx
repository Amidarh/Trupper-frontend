"use client"

import * as React from "react"

import { Plus, EllipsisVertical } from "lucide-react";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import { useUserService } from "../../services/user";
import moment from 'moment'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    const { data } = useUserService()
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
            <CardContent>
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>verified</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date Joined</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead align="right" className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((user) => (
                            <TableRow key={user.queryId} onClick={() => router.push(`/users/${user.id}`)} className="cursor-pointer">
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{getStatusBadge(user.isVerified ? "verified" : "not verified")}</TableCell>
                            {/* <TableCell>{user.status}</TableCell> */}
                            <TableCell>HLC</TableCell>
                            <TableCell>{moment(user.createdAt).format("MMMM D, YYYY")}</TableCell>
                            <TableCell>{moment(user.lastLogin).format('MMMM D, YYYY, h:mm A')}</TableCell>
                            <TableCell>{getStatusBadge(user.isBlocked ? "blocked" : "active")}</TableCell>
                            <TableCell align="right" className="flex justify-end">
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
                        ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}