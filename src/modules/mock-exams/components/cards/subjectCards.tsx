import { Card } from '@/components/ui/card';
import { SubjectType } from '@/types/subject.types';
import { ExamCategoryType } from '@/types/examCategory.types';
import { cn } from '@/lib/utils';

export const SubjectCard = ({ data,name, subjects, action, selected }: { data: ExamCategoryType , name: string, subjects: SubjectType[], action: (data: ExamCategoryType) => void, selected: string }) => {
  return (
    <Card className={cn('p-2 gap-4 flex-row cursor-pointer items-center text-ellipsis truncate', data.id === selected && 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700')}
      onClick={() => action(data)}
    >
      <div className={cn('size-4 min-w-4 h-4 border rounded-full', data.id === selected && 'bg-gray-900 dark:bg-white')} />
      <div>
        <h1>{name}</h1>
        <div className='flex gap-1 truncate flex-row'>
          {subjects.map((subject, index) => (
            <p key={index} className='text-[13px] text-gray-500 truncate'>
              {subject.name}
              {index < subjects.length - 1 ? ',' : ''}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};
