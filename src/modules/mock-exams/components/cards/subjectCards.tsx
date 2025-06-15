import { Card } from '@/components/ui/card';

export const SubjectCard = () => {
  return (
    <Card className='p-2 gap-4 flex-row cursor-pointer items-center text-ellipsis truncate'>
      <div className='size-4 min-w-4 h-4 border rounded-full' />
      <div>
        <h1>Art</h1>
        <div className='flex gap-1 truncate flex-row'>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
          <p className='text-[13px] text-gray-500'>Maths,</p>
        </div>
      </div>
    </Card>
  );
};
