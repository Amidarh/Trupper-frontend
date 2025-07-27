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

export const QuestionTable = ({
  filters,
  isLoading,
}: {
  filters: Record<string, any>;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: usersPerPage,
  };
  const { data } = useQuestionService({ ...queryParams, ...filters });
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
            <TableHead>Exam</TableHead>
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
          {isLoading ? (
            // Show skeleton rows while loading
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className='h-4 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-14' />
                </TableCell>
                <TableCell className='flex justify-end items-end'>
                  <Skeleton className='h-8 w-16' />
                </TableCell>
              </TableRow>
            ))
          ) : data?.questions?.length === 0 || !data?.questions ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No questions found
              </TableCell>
            </TableRow>
          ) : (
            data?.questions?.map((question) => (
              <TableRow
                key={question._id}
                onClick={() => router.push(`/questions/${question._id}`)}
                className='cursor-pointer'
              >
                <TableCell>{question.questionType}</TableCell>
                <TableCell>{question.exam.acronym}</TableCell>
                <TableCell>{question.subject.name}</TableCell>
                <TableCell>{getStatusBadge('active')}</TableCell>
                <TableCell className='flex justify-end items-end'>
                  <Button
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/questions/${question._id}`);
                    }}
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
