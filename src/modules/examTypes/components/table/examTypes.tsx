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
import { ExamTypes } from '@/types/examTypes.types';
import moment from 'moment';

export const ExamTypesTable = ({ data }: { data: ExamTypes[] | undefined }) => {
  const router = useRouter();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
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
        {data?.map((examtype) => (
          <TableRow
            onClick={() => router.push(`/exam-types/${examtype.id}`)}
            className='cursor-pointer'
          >
            <TableCell>{examtype.name}</TableCell>
            <TableCell>
              {getStatusBadge(examtype.status ? 'active' : 'inactive')}
            </TableCell>
            <TableCell>
              {moment(examtype.createdAt).format('YYYY-MM-DD')}
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
