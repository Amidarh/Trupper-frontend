import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useExamService } from '@/modules/exams/services';
import { Button } from '@/components/ui/button';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { Separator } from '@/components/ui/separator';

export function ExamTable() {
  const router = useRouter();
  const { data } = useExamService();
  return (
    <Card className='w-full'>
      <CardHeader className='flex px-2 flex-row items-center justify-between pb-0 space-y-0 pl-2 py-0'>
        <h1 className='text-2xl'>Exams</h1>
        <Link href={'/exams'}>
          <SquareArrowOutUpRight size={18} className='cursor-pointer' />
        </Link>
      </CardHeader>
      <Separator />
      <CardContent className='px-2 pt-0'>
        <Table className='px-2'>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='md:flex item-center text-center pt-2 hidden'>
                Full Name
              </TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead align='right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.slice(0, 4).map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className='font-medium'>{exam.acronym}</TableCell>
                <TableCell className='text-ellipsis truncate md:flex hidden'>
                  {exam.name}
                </TableCell>
                <TableCell>
                  {getStatusBadge(exam.status ? 'active' : 'inactive')}
                </TableCell>
                <TableCell>
                  <button
                    className='text-blue-500 hover:text-blue-700 cursor-pointer'
                    onClick={() => router.push(`/exams/${exam.id}`)}
                  >
                    view
                  </button>
                </TableCell>
                {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {data && data?.length <= 0 && (
        <div className='flex items-center justify-center w-full flex-col'>
          <p>You don&apos;t have any exam</p>
          <Button
            className='mt-10'
            onClick={() => router.push('/exams/create')}
          >
            Create an Exam
          </Button>
        </div>
      )}
    </Card>
  );
}
