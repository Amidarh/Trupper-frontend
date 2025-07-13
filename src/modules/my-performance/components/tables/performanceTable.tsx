'use client';

// import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useRouter } from 'next/navigation';
import { ResultType } from '@/types/result.types';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import { getStatusBadge } from '@/core/commons/components/badge/badge';

export const PerformanceTable = ({
  data,
  loading
}: {
  data: ResultType[] | undefined;
  loading: boolean
}) => {
  const router = useRouter();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead className='w-[100px]'>Exam</TableHead>
          <TableHead>Subject(s)</TableHead>
          <TableHead>Total Questions</TableHead>
          <TableHead>Attempted</TableHead>
          <TableHead>Failed</TableHead>
          <TableHead>Passed</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Date</TableHead>
          <TableHead align='right' className='text-center'>
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { loading ? 
          <TableRow
            className='cursor-pointer h-12'
          >
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell>
              <Skeleton className='h-10'/>
            </TableCell>
            <TableCell align='center'>
              <Skeleton className='h-10'/>
            </TableCell>
          </TableRow>
        : data?.map((result) => (
          <TableRow
            key={result._id}
            onClick={() => router.push(`/my-performance/${result._id}`)}
            className='cursor-pointer h-12'
          >
            <TableCell>{result.exam.acronym}</TableCell>
            <TableCell>{result.subject}</TableCell>
            <TableCell>{result.totalQuestions}</TableCell>
            <TableCell>{result.attempted}</TableCell>
            <TableCell>{result.failed}</TableCell>
            <TableCell>{result.passed}</TableCell>
            <TableCell>{result.score}%</TableCell>
            <TableCell>
              {moment(result.createdAt).format('MMMM D, YYYY')}
            </TableCell>
            <TableCell align='center'>
              {getStatusBadge(result.finished ? 'finished' : 'writing')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
