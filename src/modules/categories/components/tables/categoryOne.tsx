'use client';

import * as React from 'react';

import { EllipsisVertical, Trash2, ArrowUpRightSquare } from 'lucide-react';
import moment from 'moment';

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
import { CategoryTypes } from '@/types/categories.types';
import { useCategoryService } from '../../services/categoryServices';

export const CategoryOneTable = ({
  categories,
}: {
  categories: CategoryTypes[] | undefined;
}) => {
  const router = useRouter();
  const { deleteCategory } = useCategoryService();

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
            <TableHead>Sub Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>created by</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead align='right' className='text-right'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow className='cursor-pointer' key={category.id}>
              <TableCell
                onClick={() => router.push(`/categories/${category.id}`)}
              >
                {category.name}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/categories/${category.id}`)}
              >
                Note
              </TableCell>
              <TableCell
                onClick={() => router.push(`/categories/${category.id}`)}
              >
                {getStatusBadge(
                  category.status === true ? 'active' : 'inactive'
                )}
              </TableCell>
              <TableCell>Me</TableCell>
              <TableCell>
                {moment(category.createdAt).format('MMMM D, YYYY')}
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
                      onClick={() => router.push(`/categories/${category.id}`)}
                    >
                      <ArrowUpRightSquare />
                      <p>Open</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='bg-destructive cursor-pointer hover:bg-destructive/90'
                      onClick={() => deleteCategory(category.id)}
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
