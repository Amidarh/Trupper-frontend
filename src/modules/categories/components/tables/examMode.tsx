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
import { useExamModeService } from '../../services/examModeService';
import { EnableExamModeModal } from '../modal/enableExamMode';
import moment from 'moment';
import DeleteExamModeModeButton from '../modal/deleteExamModal';

export const ExamModeTable = () => {
  const { data } = useExamModeService();
  return (
    <section>
      <Table className='w-full rounded-sm'>
        <TableHeader className='bg-muted rounded-sm'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Exam</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created On</TableHead>
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
          {data?.map((mode) => (
            <TableRow key={mode?.id} className='cursor-pointer'>
              <TableCell>{mode?.name}</TableCell>
              <TableCell>{mode?.exam?.name}</TableCell>
              <TableCell>{mode?.createdBy?.email}</TableCell>
              <TableCell>
                {moment(mode?.createdAt).format('MMMM D, YYYY')}
              </TableCell>
              <TableCell>{mode?.exam?.noOfQuestions}</TableCell>
              <TableCell>
                {getStatusBadge(mode?.status ? 'active' : 'inactive')}
              </TableCell>
              <TableCell className='flex justify-end items-center gap-2'>
                <EnableExamModeModal
                  id={mode?.id}
                  validFrom={mode?.validFrom}
                  validTill={mode?.validTill}
                  status={mode?.status}
                  examId={mode?.exam?.id}
                />
                <DeleteExamModeModeButton id={mode.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
