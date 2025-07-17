'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useRouter } from 'next/navigation';
import { useQuestionService } from '../../services';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

export const QuestionTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: usersPerPage,
  };
  const { data, isLoading } = useQuestionService(queryParams);
  const totalPages =
    data && typeof data.totalPages === 'number' ? data.totalPages : 1;
  return (
    <div>
      <Table className='w-full rounded-sm'>
        <TableHeader className='bg-muted rounded-sm'>
          <TableRow>
            <TableHead className='truncate text-ellipsis'>
              Question Type
            </TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align='right' className='text-right'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow></TableRow>
        </TableBody>
        <TableBody>
          {/* Add your table rows here */}
          {data?.questions?.length === 0 ? (
            <TableRow>
              {isLoading ? (
                <Skeleton className='h-12 w-full' />
              ) : (
                'No questions found'
              )}
            </TableRow>
          ) : (
            data?.questions?.map((question) => (
              <TableRow
                onClick={() => router.push(`/questions/${question._id}`)}
                className='cursor-pointer'
              >
                <TableCell>{question.questionType}</TableCell>
                <TableCell>{question.subject.name}</TableCell>
                <TableCell>{getStatusBadge('active')}</TableCell>
                <TableCell className='flex justify-end items-end'>
                  <Button
                    className='cursor-pointer'
                    onClick={() => router.push(`/questions/${question._id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
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
