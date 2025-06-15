import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const CategoryOneCard = () => {
  return (
    <Card className='w-full max-w-[300px] p-0 gap-0'>
      <CardHeader className='p-3 flex items-center justify-between'>
        <p>Category One</p>
      </CardHeader>
      <Separator />
      <CardContent className='p-3'>
        <div className='flex flex-row items-center justify-between gap-2 w-full'>
          <p className='font-bold'>Created</p>
          <p>Mon 12 April, 2024</p>
        </div>
      </CardContent>
      <CardFooter className='pb-5'>
        <Button className='w-full'>View</Button>
      </CardFooter>
    </Card>
  );
};
