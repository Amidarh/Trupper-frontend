import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader } from '@/components/ui/card';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useCategoryService } from '@/modules/categories/services/categoryServices';

export function UserCategoryTable() {
  const router = useRouter();
  const { data } = useCategoryService();

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pl-2'>
        <h1 className='text-2xl font-semibold'>User Categories</h1>
        <Link href={'/categories'}>
          <SquareArrowOutUpRight size={18} className='cursor-pointer' />
        </Link>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>No Users</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align='right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>100</TableCell>
              <TableCell>
                {getStatusBadge(category.status ? 'active' : 'inactive')}
              </TableCell>
              <TableCell>
                <button
                  className='text-blue-500 hover:text-blue-700 cursor-pointer'
                  onClick={() => router.push(`/categories/${category.id}`)}
                >
                  view
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
