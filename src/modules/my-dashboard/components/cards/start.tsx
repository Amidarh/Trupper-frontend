/* app/components/StartExamCard.tsx */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useAltStore } from '@/lib/zustand/userStore';
import image from '@/../public/assets/new.jpg';

export const StartExamCard = () => {
  const user = useAltStore((state) => state.user);
  const router = useRouter();

  const handleStartExam = () => router.push('/mock-exams');
  const handleViewNotes = () => router.push('/');

  return (
    <Card className='relative h-60 w-full overflow-hidden rounded-xl border-0'>
      {/* background image */}
      <Image
        src={image}
        alt='Student preparing for an exam'
        fill
        sizes='(max-width:768px) 100vw, 480px'
        className='object-cover object-right'
        quality={90}
        priority
      />

      {/* dark overlay so text is always readable */}
      <div className='absolute inset-0 bg-black/20 backdrop-blur-sm' />

      {/* content overlay */}
      <CardContent className='relative z-10 flex h-full flex-col justify-center gap-4 p-6 text-white'>
        <CardHeader className='p-0 text-2xl font-semibold'>
          {`Welcome${user?.firstName ? `, ${user.firstName}` : ''}`}
        </CardHeader>

        <CardDescription className='max-w-md text-white'>
          Ready to test your knowledge or review your notes? Pick an option
          below to get started.
        </CardDescription>

        <div className='mt-3 flex gap-4'>
          {/* <Button size="sm" className='text-black bg-white' onClick={handleStartExam}>
            Start exam
          </Button> */}
          <Button
            size='sm'
            className='text-white'
            variant='glass'
            onClick={handleStartExam}
          >
            Start Exam
          </Button>
          {/* <Button size="sm" className='text-white' variant="glass" onClick={handleViewNotes}>
            View notes
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};
