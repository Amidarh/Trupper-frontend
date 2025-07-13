import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconType } from 'react-icons';

export const StatsCard = ({
  title,
  stat,
  Icon,
}: {
  title: string;
  stat: number | undefined | string;
  Icon: IconType;
}) => {
  return (
    <Card className='w-full p-0 gap-0 cursor-pointer bg-[#909dad] dark:bg-gray-700'>
      <CardHeader className='p-3 flex items-center justify-between'>
        <p>{title}</p>
        <Icon className='h-4 w-4 text-gray-500' />
      </CardHeader>
      <CardContent className='p-3'>
        <h1 className='text-5xl'>{stat?.toLocaleString()}</h1>
      </CardContent>
    </Card>
  );
};
