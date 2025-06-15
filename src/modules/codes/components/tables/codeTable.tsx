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
import { codeType } from '../../types';
import { Copy } from 'lucide-react';
import moment from 'moment';
import { toast } from 'sonner';
import DeleteCodeModal from '../modals/deleteModal';

export const CodeTable = ({ codes }: { codes: codeType[] | undefined }) => {
  const router = useRouter();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  return (
    <Table className='w-full rounded-sm'>
      <TableHeader className='bg-muted rounded-sm'>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sub Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-center'>Generated</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {codes?.map((code) => (
          <TableRow
            key={code.code}
            className='cursor-pointer'
            // onClick={() => router.push(`/codes/${code.code}`)}
          >
            <TableCell>{code.code}</TableCell>
            <TableCell>Authentication</TableCell>
            <TableCell>{code.category.name}</TableCell>
            <TableCell>{code.subCategory.name}</TableCell>
            <TableCell>{getStatusBadge(code.status)}</TableCell>
            <TableCell className='text-center'>
              {moment(code.createdAt).format('YYYY-MM-DD')}
            </TableCell>
            <TableCell className='flex justify-end gap-2 items-end'>
              <DeleteCodeModal id={code.id} code={code.code} />
              <Button
                className='cursor-pointer bg-green-700 text-white'
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(code.code);
                }}
              >
                <Copy className='h-4 w-4' />
                <p className='text-sm'>Copy</p>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
