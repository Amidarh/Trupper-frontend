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

export const PerformanceTable = () => {
  const router = useRouter();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead className='w-[100px]'>Exam</TableHead>
          <TableHead>Subject(s)</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow></TableRow>
      </TableBody>
      <TableBody>
        {/* Add your table rows here */}
        <TableRow
          onClick={() => router.push('/exams/1')}
          className='cursor-pointer'
        >
          <TableCell>JAMB</TableCell>
          <TableCell>
            Mathematics, English, Authentic, Authentic, Authentic
          </TableCell>
          <TableCell>Thu Apr 24 2025</TableCell>
          <TableCell>50%</TableCell>
        </TableRow>
      </TableBody>
      <TableBody>
        {/* Add your table rows here */}
        <TableRow
          onClick={() => router.push('/exams/1')}
          className='cursor-pointer'
        >
          <TableCell>JAMB</TableCell>
          <TableCell>
            Mathematics, English, Authentic, Authentic, Authentic
          </TableCell>
          <TableCell>Thu Apr 24 2025</TableCell>
          <TableCell>50%</TableCell>
        </TableRow>
      </TableBody>
      <TableBody>
        {/* Add your table rows here */}
        <TableRow
          onClick={() => router.push('/exams/1')}
          className='cursor-pointer'
        >
          <TableCell>JAMB</TableCell>
          <TableCell>
            Mathematics, English, Authentic, Authentic, Authentic
          </TableCell>
          <TableCell>Thu Apr 24 2025</TableCell>
          <TableCell>50%</TableCell>
        </TableRow>
      </TableBody>
      <TableBody>
        {/* Add your table rows here */}
        <TableRow
          onClick={() => router.push('/exams/1')}
          className='cursor-pointer'
        >
          <TableCell>JAMB</TableCell>
          <TableCell>
            Mathematics, English, Authentic, Authentic, Authentic
          </TableCell>
          <TableCell>Thu Apr 24 2025</TableCell>
          <TableCell>50%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
