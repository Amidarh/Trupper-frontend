'use client';

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

export const ViewResultTable = () => {

  const router = useRouter();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead>User (student)</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Exam End Date</TableHead>
          <TableHead>Total Participants</TableHead>
          <TableHead>Total School</TableHead>
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
          </TableRow>
      </TableBody>
    </Table>
  );
};
