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
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { getStatusBadge } from "@/core/commons/components/badge/badge";
import moment from "moment";
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
import { useAdminService } from "../../services";

export const AdminTable = () => {
    const router = useRouter();
    const { data, isLoading } = useAdminService()
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
                        <Button className="cursor-pointer"
                            onClick={() => router.push("/sub-admins/new")}
                        >
                            <Plus className="h-4 w-4" />
                            <p>Add New Sub Admin</p>
                        </Button>
                    </div>

                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>email</TableHead>
                            <TableHead>verification</TableHead>
                            <TableHead>Date Joined</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead align="right" className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map(admin => (
                            <TableRow onClick={() => router.push(`/sub-admins/${admin.id}`)} className="cursor-pointer">
                                <TableCell>{admin.firstName} {admin.lastName}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{getStatusBadge(admin.isVerified ? "verified" : "not verified")}</TableCell>
                                <TableCell>{moment(admin.createdAt).format("MMMM D, YYYY")}</TableCell>
                                <TableCell>{moment(admin.lastLogin).format('MMMM D, YYYY, h:mm A')}</TableCell>
                                <TableCell>
                                    {getStatusBadge(admin.isBlocked ? "blocked" : "active")}
                                </TableCell>
                                <TableCell
                                    className="flex justify-end"
                                >
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
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}