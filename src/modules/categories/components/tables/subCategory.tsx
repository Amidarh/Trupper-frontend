'use client';

import * as React from 'react';

import { EllipsisVertical, ArrowUpRightSquare, Trash2 } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useSubCategoryService } from '../../services/subCategoryServices';
import { SubCategoryTypes } from '@/types/categories.types';
import moment from 'moment';

export const SubCategoryTable = ({
  subCategories,
}: {
  subCategories: SubCategoryTypes[] | undefined;
}) => {
  const router = useRouter();
  const { deleteSubCategory } = useSubCategoryService();
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
        <TableHeader className='bg-muted'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>created by</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead align='right' className='text-right'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategories?.map((subCategory) => (
            <TableRow className='cursor-pointer' key={subCategory.id}>
              <TableCell
                onClick={() => router.push(`/categories/sub/${subCategory.id}`)}
              >
                {subCategory.name}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/categories/sub/${subCategory.id}`)}
              >
                {subCategory.userCategory.name}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/categories/sub/${subCategory.id}`)}
              >
                {getStatusBadge(
                  subCategory.status === true ? 'active' : 'inactive'
                )}
              </TableCell>
              <TableCell>Me</TableCell>
              <TableCell>
                {moment(subCategory.createdAt).format('MMMM D, YYYY')}
              </TableCell>
              <TableCell align='right' className='text-right flex justify-end'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div>
                      <EllipsisVertical />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-fit'>
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() =>
                        router.push(`/categories/sub/${subCategory.id}`)
                      }
                    >
                      <ArrowUpRightSquare />
                      <p>Open</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer bg-red-800'
                      onClick={() => deleteSubCategory(subCategory.id)}
                    >
                      <Trash2 />
                      <p>Delete Category</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
