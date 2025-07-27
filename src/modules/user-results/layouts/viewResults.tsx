'use client';

import { useState, useMemo } from 'react';
import { Download, FileText, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BackButton } from '@/core/commons/navigation/backButton';
import { ExamModeResultType } from '@/types';

const GradeBadge = ({ score }: { score: number }) => {
  const getGradeInfo = (score: number) => {
    if (score >= 90)
      return { grade: 'A', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { grade: 'B', color: 'bg-blue-100 text-blue-800' };
    if (score >= 70)
      return { grade: 'C', color: 'bg-yellow-100 text-yellow-800' };
    if (score >= 60)
      return { grade: 'D', color: 'bg-orange-100 text-orange-800' };
    return { grade: 'F', color: 'bg-red-100 text-red-800' };
  };

  const { grade, color } = getGradeInfo(score);
  return (
    <Badge variant='secondary' className={`${color} font-medium`}>
      {score}%
    </Badge>
  );
};

const PositionBadge = ({ position }: { position: number }) => {
  const getPositionStyle = (pos: number) => {
    if (pos === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (pos === 2) return 'bg-gray-100 text-gray-800 border-gray-300';
    if (pos === 3) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  const getPositionIcon = (pos: number) => {
    if (pos <= 3) return <Trophy className='w-3 h-3 mr-1' />;
    return null;
  };

  return (
    <Badge
      variant='outline'
      className={`${getPositionStyle(position)} font-medium`}
    >
      {getPositionIcon(position)}
      {position}
    </Badge>
  );
};

const LoadingSkeleton = () => (
  <div className='space-y-4'>
    <div className='grid grid-cols-4 gap-4'>
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className='p-4'>
            <Skeleton className='h-4 w-16 mb-2' />
            <Skeleton className='h-8 w-20' />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className='space-y-2'>
      <Skeleton className='h-10 w-full' />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className='h-16 w-full' />
      ))}
    </div>
  </div>
);

const EmptyState = () => (
  <Card className='text-center py-12'>
    <CardContent>
      <Users className='w-16 h-16 mx-auto text-gray-400 mb-4' />
      <h3 className='text-lg font-medium text-gray-900 mb-2'>
        No results found
      </h3>
      <p className='text-gray-500'>
        No results found for this exam. Please select a different exam or check
        back later.
      </p>
    </CardContent>
  </Card>
);

export function ViewResultContent({
  examModeResult,
}: {
  examModeResult: ExamModeResultType | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  // Get resultList from examModeResult
  const resultList = Array.isArray(examModeResult?.resultList)
    ? examModeResult.resultList
    : [];

  // Sort resultList by score descending for ranking
  const sortedResults = useMemo(() => {
    return [...resultList]
      .map((item, idx) => ({
        ...item,
        // Add position (rank) based on sorted order
        position: idx + 1,
      }))
      .sort((a, b) => b.score - a.score);
  }, [resultList]);

  // Add position after sorting
  const rankedResults = useMemo(() => {
    let lastScore: number | null = null;
    let lastRank = 0;
    let sameRankCount = 0;
    return sortedResults.map((item, idx) => {
      if (item.score === lastScore) {
        sameRankCount++;
        return { ...item, position: lastRank };
      } else {
        lastScore = item.score;
        lastRank = idx + 1;
        sameRankCount = 1;
        return { ...item, position: lastRank };
      }
    });
  }, [sortedResults]);

  // Pagination
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return rankedResults.slice(startIndex, startIndex + itemsPerPage);
  }, [rankedResults, currentPage]);

  const totalPages = Math.ceil(rankedResults.length / itemsPerPage);

  const handleExport = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    alert(`Exporting results as ${format.toUpperCase()}...`);
  };

  // Helper to get user full name
  const getUserName = (user: any) => {
    if (!user) return '';
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  };

  // Helper to get user id
  const getUserId = (user: any) => {
    if (!user) return '';
    return user.id || user._id || '';
  };

  // Helper to get user class (subCategory name)
  const getUserClass = (user: any) => {
    if (!user) return '';
    return user.subCategory?.name || '';
  };

  // Helper to get subject code from subject id
  // (Assume you have a subject map if needed, but here we just show subject id)
  // If you have subject details, you can map id to code/name

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <BackButton title='Results' />
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={() => handleExport('csv')}
            variant='outline'
            size='sm'
          >
            <FileText className='w-4 h-4 mr-2' />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExport('pdf')}
            variant='outline'
            size='sm'
          >
            <Download className='w-4 h-4 mr-2' />
            Export PDF
          </Button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : rankedResults.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Statistics Cards */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='px-4'>
                <div className='text-sm font-medium text-gray-500'>
                  Total Students
                </div>
                <div className='text-2xl font-bold'>
                  {examModeResult?.stats?.totalStudents ?? 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='px-4'>
                <div className='text-sm font-medium text-gray-500'>
                  Class Average
                </div>
                <div className='text-2xl font-bold text-blue-600'>
                  {examModeResult?.stats?.averageSchool?.toFixed(1) ?? '0.0'}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='px-4'>
                <div className='text-sm font-medium text-gray-500'>
                  Highest Score
                </div>
                <div className='text-2xl font-bold text-green-600'>
                  {examModeResult?.stats?.highestScore?.toFixed(1) ?? '0.0'}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='px-4'>
                <div className='text-sm font-medium text-gray-500'>
                  Lowest Score
                </div>
                <div className='text-2xl font-bold text-red-600'>
                  {examModeResult?.stats?.lowestScore?.toFixed(1) ?? '0.0'}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>
                {examModeResult?.exam?.acronym} Examination Results
                <span className='text-sm font-normal text-gray-600 ml-2'>
                  ({examModeResult?.stats?.totalStudents} students)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-12'>Rank</TableHead>
                      <TableHead className='min-w-48'>Student</TableHead>
                      <TableHead className='min-w-32'>Class</TableHead>
                      {/* If you want to show per-subject scores, you can add columns here */}
                      {/* <TableHead className='text-center min-w-24'>Subject</TableHead> */}
                      <TableHead className='text-center'>
                        Attempted Questions
                      </TableHead>
                      <TableHead className='text-center'>
                        Correct Questions
                      </TableHead>
                      <TableHead className='text-center'>
                        Wrong Questions
                      </TableHead>
                      <TableHead className='text-center'>Score</TableHead>
                      <TableHead className='text-center'>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedResults.map((result, idx) => (
                      <TableRow key={result.id || idx}>
                        <TableCell>
                          <PositionBadge position={result.position} />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>
                              {getUserName(result.user)}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {getUserId(result.user)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>
                            {getUserClass(result.user)}
                          </Badge>
                        </TableCell>
                        {/* If you want to show per-subject scores, you can add here */}
                        {/* <TableCell className='text-center'>
                          {result.subject ? result.subject : '-'}
                        </TableCell> */}
                        <TableCell className='text-center font-medium'>
                          {result.attempted}
                        </TableCell>
                        <TableCell className='text-center font-medium'>
                          {result.passed}
                        </TableCell>
                        <TableCell className='text-center font-medium'>
                          {result.failed}
                        </TableCell>
                        <TableCell className='text-center font-medium'>
                          {result.score}
                        </TableCell>
                        <TableCell className='text-center'>
                          <Badge
                            variant='secondary'
                            className='bg-blue-100 text-blue-800 font-medium'
                          >
                            {typeof result.score === 'number'
                              ? result.score.toFixed(1)
                              : '0.0'}
                            %
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex items-center justify-between mt-6'>
                  <div className='text-sm text-gray-500'>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, rankedResults.length)}{' '}
                    of {rankedResults.length} results
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setCurrentPage(i + 1)}
                        className='w-10'
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
