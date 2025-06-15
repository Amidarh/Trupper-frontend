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
import { useNewsletterService } from '../../services';
import moment from 'moment';

export const NewsletterTable = () => {
  const router = useRouter();
  const { data } = useNewsletterService();
  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead className='w-[200px] truncate text-ellipsis'>
            Topic
          </TableHead>
          <TableHead className='w-[200px] text-center' align='center'>
            Category
          </TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Date Sent</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align='right' className='text-right'>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((newsletter) => (
          <TableRow
            onClick={() => router.push(`/newsletters/${newsletter.id}`)}
            className='cursor-pointer'
            key={newsletter.id}
          >
            <TableCell className='truncate text-ellipse w-[200px]'>
              {newsletter.title}{' '}
            </TableCell>
            <TableCell align='center'>
              {newsletter.category ? newsletter.category.name : 'Nil'}
            </TableCell>
            <TableCell>{newsletter.sentBy.email}</TableCell>
            <TableCell>
              {moment(newsletter.createdAt).format('MMMM D, YYYY, h:mm A')}
            </TableCell>
            <TableCell>{newsletter.userType}</TableCell>
            <TableCell>{getStatusBadge(newsletter.status)}</TableCell>
            <TableCell className='flex justify-end items-end'>
              <Button className='cursor-pointer'>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
