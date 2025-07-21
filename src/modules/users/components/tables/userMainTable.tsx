'use client';

import {
  // Plus,
  EllipsisVertical,
} from 'lucide-react';
import { getStatusBadge } from '@/core/commons/components/badge/badge';
import { useUserService } from '../../services/user';
import { useEffect, useState } from 'react';
import moment from 'moment';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { handleExport } from '@/utils/exports/users';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAltStore } from '@/lib/zustand/userStore';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

export const UserTable = () => {
  const router = useRouter();
  // --- Filter and Pagination State ---
  const [filterType, setFilterType] = useState<'name' | 'email' | 'status'>(
    'name'
  );
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Backend expects: page, limit, email, name, status, blocked, etc.
  // Compose query params for backend
  const queryParams: Record<string, any> = {
    page: currentPage,
    limit: usersPerPage,
  };
  if (filterType === 'name' && filterValue) {
    queryParams.name = filterValue;
  }
  if (filterType === 'email' && filterValue) {
    queryParams.email = filterValue;
  }
  if (filterType === 'status' && filterValue) {
    // status filter: 'active', 'inactive', 'blocked'
    if (filterValue === 'blocked') {
      queryParams.blocked = true;
    } else if (filterValue === 'active') {
      queryParams.active = true;
    } else if (filterValue === 'inactive') {
      queryParams.active = false;
    }
  }

  // --- Fetch users with filters and pagination ---
  // useUserService returns { data, isLoading, error, ... } but not refetch
  const { data, isLoading, error, mutate } = useUserService(queryParams);
  // data: { users, total, page, limit, totalPages }

  const organization = useAltStore((state) => state.organization);

  const handleExportCodes = async () => {
    // Fix: data may be undefined or not have users property
    if (data && Array.isArray(data.users) && organization) {
      await handleExport('pdf', data.users, organization);
    }
  };

  // For status filter, show dropdown, for others show input
  const renderFilterInput = () => {
    if (filterType === 'status') {
      return (
        <Select
          value={filterValue}
          onValueChange={(val) => {
            setFilterValue(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className='w-32'>Status</SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='inactive'>Inactive</SelectItem>
            <SelectItem value='blocked'>Blocked</SelectItem>
          </SelectContent>
        </Select>
      );
    }
    return (
      <Input
        placeholder={
          filterType === 'name' ? 'Search by name' : 'Search by email'
        }
        value={filterValue}
        onChange={(e) => {
          setFilterValue(e.target.value);
          setCurrentPage(1);
        }}
        className='w-48'
      />
    );
  };

  // Refetch when filter changes
  // Fix: useUserService does not return refetch, so remove this effect
  // If you want to refetch, you should implement it in useUserService or use SWR/mutate, etc.

  // Prepare paginated users and totalPages from data
  const paginatedUsers = data && Array.isArray(data.users) ? data.users : [];
  const totalPages =
    data && typeof data.totalPages === 'number' ? data.totalPages : 1;

  // Debounce mutate when queryParams changes
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(queryParams);
      mutate();
      console.log(data?.users);
    }, 1000); // 10000s debounce

    return () => {
      clearTimeout(handler);
    };
  }, [queryParams]);

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-row justify-between max-lg:flex-col max-lg:gap-2 lg:items-center'>
          <div className='flex flex-row gap-2 items-center'>
            <Select
              value={filterType}
              onValueChange={(val) => {
                setFilterType(val as 'name' | 'email' | 'status');
                setFilterValue('');
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className='w-32'>Filter By</SelectTrigger>
              <SelectContent>
                <SelectItem value='name'>Full Name</SelectItem>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='status'>Status</SelectItem>
              </SelectContent>
            </Select>
            {renderFilterInput()}
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Button
              variant='outline'
              className='cursor-pointer h-10'
              onClick={handleExportCodes}
              disabled={isLoading}
            >
              Export Data
            </Button>
            {/* <Button className="cursor-pointer">
                <Plus className="h-4 w-4" />
                <p>Add New User</p>
            </Button> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>verified</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align='right' className='text-right'>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user: any) => (
                <TableRow
                  key={user.queryId || user.id}
                  onClick={() => router.push(`/users/${user.id}`)}
                  className='cursor-pointer'
                >
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {getStatusBadge(
                      user.isVerified ? 'verified' : 'not verified'
                    )}
                  </TableCell>
                  {/* <TableCell>{user.status}</TableCell> */}
                  <TableCell>{user.category?.name}</TableCell>
                  <TableCell>
                    {user.createdAt
                      ? moment(user.createdAt).format('MMMM D, YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin
                      ? moment(user.lastLogin).format('MMMM D, YYYY, h:mm A')
                      : ''}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.isBlocked ? 'blocked' : 'active')}
                  </TableCell>
                  <TableCell align='right' className='flex justify-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <EllipsisVertical />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuItem className='cursor-pointer'>
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className='text-center'>
                  {isLoading ? 'Loading...' : 'No users found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-4'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
