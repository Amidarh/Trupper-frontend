'use client';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import moment from 'moment';
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
import { useExamModeResultService } from '@/modules/user-results/services';
import { isTimeActive } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
// import { ExamType } from '@/types/exam.types';

export const ExamResultTable = () => {
  const router = useRouter();
  const { data, isLoading, error } = useExamModeResultService();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead className='w-[100px]'>Exam Name</TableHead>
          <TableHead>Exam Start Date</TableHead>
          <TableHead>Exam End Date</TableHead>
          <TableHead>Total Participants</TableHead>
          {/* <TableHead>No Of Questions</TableHead> */}
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
          <>
            <TableRow className='cursor-pointer'>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
            </TableRow>
            <TableRow className='cursor-pointer'>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
            </TableRow>
            <TableRow className='cursor-pointer'>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-[20px]' />
              </TableCell>
            </TableRow>
          </>
        ) : (
          data?.map((result) => (
            <TableRow
              onClick={() => router.push(`/user-results/${result.id}`)}
              className='cursor-pointer'
            >
              <TableCell>{result.exam.acronym}</TableCell>
              <TableCell>
                {moment(result.startedAt).format('MMMM D, YYYY, h:mm A')}
              </TableCell>
              <TableCell>
                {moment(result.finishedAt).format('MMMM D, YYYY, h:mm A')}
              </TableCell>
              <TableCell>{result.resultList.length}</TableCell>
              {/* <TableCell>{exam.noOfQuestions} Question</TableCell> */}
              <TableCell>
                {getStatusBadge(
                  isTimeActive({
                    validFrom: result.startedAt,
                    validTill: result?.finishedAt,
                  })
                    ? 'active'
                    : 'finished'
                )}
              </TableCell>
              <TableCell className='flex justify-end items-end'>
                <Button className='cursor-pointer'>
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
