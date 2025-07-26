'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { codeType } from '../../types';
import { Copy } from 'lucide-react';
import moment from 'moment';
import { toast } from 'sonner';
import DeleteCodeModal from '../modals/deleteModal';
import { useCodeService } from '../../services';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

export const CodeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: usersPerPage,
  };

  const { data, isLoading, error, mutate } = useCodeService(queryParams);
  // const paginatedUsers = data && Array.isArray(data.users) ? data.users : [];
  const totalPages =
    data && typeof data.totalPages === 'number' ? data.totalPages : 1;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  return (
    <div>
      <Table className='w-full rounded-sm'>
        <TableHeader className='bg-muted rounded-sm'>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sub Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-center'>Generated</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  <TableCell>
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className='h-9' />
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 items-end">
                    <Skeleton className='h-9' />
                  </TableCell>
                </TableRow>
              ))
            : Array.isArray(data?.codes) && data.codes.length > 0 ? (
                data.codes.map((code) => (
                  <TableRow
                    key={code.code}
                    className='cursor-pointer'
                    // onClick={() => router.push(`/codes/${code.code}`)}
                  >
                    <TableCell>{code.code}</TableCell>
                    <TableCell>Authentication</TableCell>
                    <TableCell>{code.category.name}</TableCell>
                    <TableCell>{code.subCategory.name}</TableCell>
                    <TableCell>{getStatusBadge(code.status)}</TableCell>
                    <TableCell className='text-center'>
                      {moment(code.createdAt).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell className='flex justify-end gap-2 items-end'>
                      <DeleteCodeModal id={code.id} code={code.code} />
                      <Button
                        className='cursor-pointer bg-green-700 text-white'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(code.code);
                        }}
                      >
                        <Copy className='h-4 w-4' />
                        <p className='text-sm'>Copy</p>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No codes found.
                  </TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
