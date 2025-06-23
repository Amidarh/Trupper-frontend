import { EllipsisVertical } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import DeleteExamCardButton from '../modal/delete';
export const ExamCardOptionsButton = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <Popover>
      <PopoverTrigger className='cursor-pointer'>
        <EllipsisVertical scale={10} />
      </PopoverTrigger>
      <PopoverContent className='w-40 p-1'>
        <div className='flex flex-col gap-2'>
          <DeleteExamCardButton id={id} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
