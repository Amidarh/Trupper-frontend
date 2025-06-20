'use client';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
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
// import { ExamType } from '@/types/exam.types';

export const ExamResultTable = () => {

  const router = useRouter();
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
          <TableRow
            onClick={() => router.push(`/user-results/2334`)}
            className='cursor-pointer'
          >
            <TableCell>Waec</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>200</TableCell>
            {/* <TableCell>{exam.noOfQuestions} Question</TableCell> */}
            <TableCell>
              {getStatusBadge("running")}
            </TableCell>
            <TableCell className='flex justify-end items-end'>
              <Button className='cursor-pointer'>
                <Eye/>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow
            onClick={() => router.push(`/user-results/2334`)}
            className='cursor-pointer'
          >
            <TableCell>Waec</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>200</TableCell>
            {/* <TableCell>{exam.noOfQuestions} Question</TableCell> */}
            <TableCell>
              {getStatusBadge("running")}
            </TableCell>
            <TableCell className='flex justify-end items-end'>
              <Button className='cursor-pointer'>
                <Eye/>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow
            onClick={() => router.push(`/user-results/2334`)}
            className='cursor-pointer'
          >
            <TableCell>Waec</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>March 20, 2025</TableCell>
            <TableCell>200</TableCell>
            {/* <TableCell>{exam.noOfQuestions} Question</TableCell> */}
            <TableCell>
              {getStatusBadge("running")}
            </TableCell>
            <TableCell className='flex justify-end items-end'>
              <Button className='cursor-pointer'>
                <Eye/>
              </Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
};
