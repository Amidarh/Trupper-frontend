import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-separator';
import { SubjectCard } from '../components/cards/subjectCards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const MockExams = () => {
  return (
    <Card className='p-2 md:p-4'>
      <Tabs defaultValue='o level'>
        <TabsList className='overflow-x-scroll gap-1 overflow-auto'>
          <TabsTrigger value='o level'>O level</TabsTrigger>
        </TabsList>
        <Separator className='w-full' />
        <TabsContent value='o level' className='border-t pt-4'>
          <h1 className='text-lg'>Exams</h1>
          <div className='flex flex-row gap-2'>
            <div className='w-[90px] h-[90px] border rounded-sm cursor-pointer' />
            <div className='w-[90px] h-[90px] border rounded-sm cursor-pointer' />
            <div className='w-[90px] h-[90px] border rounded-sm cursor-pointer' />
          </div>
          <h1 className='text-lg my-3'>Exam Category</h1>
          <div className='flex flex-col gap-2'>
            <SubjectCard />
            <SubjectCard />
            <SubjectCard />
          </div>
          <div>
            <h1 className='text-lg mt-3 mb-1'>Subjects</h1>
            <p className='text-gray-600 text-sm'>
              Selected 0 of 4 subjects (min of 4)
            </p>
          </div>
          <div className='mt-3 flex flex-row gap-2'>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
            <Badge className='cursor-pointer h-8'>Mathematics</Badge>
          </div>
          <div className='flex justify-end mt-5'>
            <Button>Create Card</Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
