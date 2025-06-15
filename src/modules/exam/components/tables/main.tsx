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
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useRouter } from 'next/navigation';
import { ExamType } from '@/types/exam.types';

export const ExamsTable = ({ data }: { data: ExamType[] | undefined }) => {
  const router = useRouter();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead className='w-[100px]'>Name</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Exam Duration</TableHead>
          <TableHead>Exam Type</TableHead>
          <TableHead>No Of Questions</TableHead>
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
        {data?.map((exam) => (
          <TableRow
            onClick={() => router.push(`/exams/${exam.id}`)}
            className='cursor-pointer'
            key={exam.id}
          >
            <TableCell>{exam.acronym}</TableCell>
            <TableCell>{exam.name}</TableCell>
            <TableCell>{exam.duration} Minutes</TableCell>
            <TableCell>O'Level</TableCell>
            <TableCell>{exam.noOfQuestions} Question</TableCell>
            <TableCell>
              {getStatusBadge(exam.status ? 'active' : 'inactive')}
            </TableCell>
            <TableCell className='flex justify-end items-end'>
              <Button className='cursor-pointer'>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
